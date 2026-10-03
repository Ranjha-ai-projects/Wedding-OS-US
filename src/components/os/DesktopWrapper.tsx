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
            <Sparkles size={14} color="var(--gold)" />
            <span>Couple OS · Wedlio</span>
          </div>

          <h1 className="desktop-names">
            {weddingConfig.couple.brideName}
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>&amp;</span>
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
              borderRadius: '24px',
              background: 'rgba(248, 243, 234, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-card)',
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600 }}>
              <Smartphone size={16} />
              <span>Mobile-First Experience</span>
            </div>

            <p className="desktop-note" style={{ margin: 0, color: 'var(--text-secondary)' }}>
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
                  padding: '7px 14px',
                  borderRadius: '12px',
                  background: isPlaying ? 'var(--gold)' : 'rgba(242, 234, 223, 0.95)',
                  color: isPlaying ? 'var(--bg-primary)' : 'var(--text-primary)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  border: '1px solid var(--border-gold)',
                  boxShadow: 'var(--shadow-subtle)',
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
                    padding: '7px 14px',
                    borderRadius: '12px',
                    background: 'rgba(242, 234, 223, 0.95)',
                    color: 'var(--text-primary)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    border: '1px solid var(--border-gold)',
                    boxShadow: 'var(--shadow-subtle)',
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

      {/* Centered Phone Canvas */}
      <main className="phone-canvas" id="couple-os-container">
        {children}
      </main>
    </div>
  );
};
