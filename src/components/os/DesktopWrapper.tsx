import { Sparkles, Smartphone, Volume2, RotateCcw } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';

interface DesktopWrapperProps {
  children: React.ReactNode;
}

export const DesktopWrapper: React.FC<DesktopWrapperProps> = ({ children }) => {
  const { replayIntro, screenState } = useOS();
  const { isPlaying, togglePlay } = useAudio();

  return (
    <div className="app-viewport-wrapper">
      {/* Desktop Editorial Background & Supporting Typography */}
      <div className="desktop-backdrop" aria-hidden="true">
        {/* Left Editorial Branding */}
        <div className="desktop-backdrop-left">
          <div className="desktop-brand">
            <Sparkles size={14} color="var(--color-champagne-gold)" />
            <span>Couple OS · Wedlio</span>
          </div>

          <h1 className="desktop-names">
            {weddingConfig.couple.brideName}
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-champagne-gold)' }}>&amp;</span>
            <br />
            {weddingConfig.couple.groomName}
          </h1>

          <p className="desktop-date">
            {weddingConfig.couple.displayDate}
            <br />
            {weddingConfig.couple.locationCity}, {weddingConfig.couple.locationState}
          </p>

          <p className="desktop-tagline">
            “Your friends shared access to their private Couple OS.”
          </p>
        </div>

        {/* Right Info & Quick Action Panel */}
        <div className="desktop-backdrop-right">
          <div
            style={{
              padding: '1.4rem',
              borderRadius: '20px',
              background: 'rgba(26, 23, 19, 0.45)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-champagne-gold)', fontSize: '0.8rem', fontWeight: 600 }}>
              <Smartphone size={16} />
              <span>Mobile-First Experience</span>
            </div>

            <p className="desktop-note">
              Designed as an interactive mobile operating system. Interact with the phone to explore their invitation, stories, soundtrack, and RSVP.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', pointerEvents: 'auto' }}>
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  background: isPlaying ? 'var(--color-champagne-gold)' : 'rgba(255, 255, 255, 0.08)',
                  color: isPlaying ? '#171613' : 'var(--color-warm-ivory)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <Volume2 size={13} />
                <span>{isPlaying ? 'Music On' : 'Music Off'}</span>
              </button>

              {screenState !== 'intro' && (
                <button
                  type="button"
                  onClick={replayIntro}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--color-warm-ivory)',
                    fontSize: '0.72rem',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Replay Share</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Centered Phone Canvas (Real Viewport on Mobile, Centered Phone Frame on Desktop) */}
      <main className="phone-canvas" id="couple-os-container">
        {children}
      </main>
    </div>
  );
};
