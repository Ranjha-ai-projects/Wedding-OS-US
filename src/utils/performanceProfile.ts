/**
 * Couple OS Performance Profile Engine
 * 
 * Supports two rendering profiles:
 * - "full": High-fidelity mode with full glassmorphism, spring physics, and subtle scale depth.
 * - "safe": Compositor-safe mode for constrained mobile devices, WebKit under GPU pressure,
 *           or during screen recording. Simplifies full-screen transforms and large backdrop-filters
 *           while preserving identical typography, colors, photography, layout, and app transitions.
 */

export type PerformanceProfile = 'full' | 'safe';

const STORAGE_KEY = 'coupleOS.performanceProfile';

/**
 * Determine the initial performance profile without fragile user-agent sniffing.
 * Signals:
 * 1. Manual URL override (?performance=full or ?performance=safe)
 * 2. Session persistence (once SAFE is chosen, remain consistent during the visit)
 * 3. User reduced-motion preference
 * 4. Hardware concurrency / memory constraints where standardly exposed
 */
export function getInitialPerformanceProfile(): PerformanceProfile {
  if (typeof window === 'undefined') return 'full';

  // 1. Manual query parameter override for debugging/testing
  try {
    const params = new URLSearchParams(window.location.search);
    const override = params.get('performance');
    if (override === 'safe' || override === 'full') {
      try {
        sessionStorage.setItem(STORAGE_KEY, override);
      } catch {}
      return override;
    }
  } catch {
    // Non-fatal URL parsing fallback
  }

  // 2. Session persistence: Do not toggle back and forth once SAFE is established
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === 'safe' || saved === 'full') {
      return saved;
    }
  } catch {
    // Non-fatal storage fallback
  }

  // 3. Accessibility: Reduced motion preference
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'safe';
    }
  } catch {
    // Ignore media query error
  }

  // 4. Constrained hardware signals (where available and standard)
  try {
    const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
    // Constrained device memory (e.g. <= 4GB)
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) {
      return 'safe';
    }
    // Constrained CPU concurrency (<= 4 cores indicates battery-saver or lower-tier device)
    if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) {
      return 'safe';
    }
  } catch {
    // Non-fatal hardware check fallback
  }

  return 'full';
}

/**
 * Lightweight Transition Performance Drop Monitor
 * 
 * Measures frame smoothness during the first few major screen transitions
 * using requestAnimationFrame. If severe frame drops (e.g. frames taking >48ms)
 * occur repeatedly during a transition, gracefully switches to "safe" profile.
 * Does NOT run continuously to avoid consuming CPU/battery.
 */
class TransitionMonitor {
  private monitoredTransitions = 0;
  private readonly maxTransitionsToMonitor = 3;
  private isMonitoring = false;
  private onSwitchToSafe?: () => void;

  public init(callback: () => void): void {
    this.onSwitchToSafe = callback;
  }

  public startTransitionCheck(): void {
    if (typeof window === 'undefined') return;
    if (this.isMonitoring || this.monitoredTransitions >= this.maxTransitionsToMonitor) {
      return;
    }

    // If already in SAFE profile, no need to monitor further
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'safe') {
        return;
      }
    } catch {}

    this.isMonitoring = true;
    this.monitoredTransitions++;

    let lastTime = performance.now();
    let severeDropCount = 0;
    const startTime = performance.now();
    const duration = 480; // Monitor for 480ms during major transition

    const checkFrame = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // Over 48ms indicates severe hitching / frame dropping (below 20fps)
      if (delta > 48) {
        severeDropCount++;
      }

      if (now - startTime < duration) {
        requestAnimationFrame(checkFrame);
      } else {
        this.isMonitoring = false;
        // If 2 or more severe drops occurred during the transition, switch to SAFE
        if (severeDropCount >= 2) {
          try {
            sessionStorage.setItem(STORAGE_KEY, 'safe');
          } catch {}
          this.onSwitchToSafe?.();
        }
      }
    };

    requestAnimationFrame(checkFrame);
  }
}

export const transitionMonitor = new TransitionMonitor();
