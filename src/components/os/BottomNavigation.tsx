import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';

export const BottomNavigation: React.FC = () => {
  const { activeApp, closeApp, openApp, screenState } = useOS();
  const { isPlaying, currentTrack, togglePlay } = useAudio();

  // Don't show bottom controls on intro screen
  if (screenState === 'intro') return null;

  return (
    <footer
      role="contentinfo"
      aria-label="System navigation dock"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 90,
        pointerEvents: 'none',
        paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Persistent Mini Music Player Bar (visible on Home Screen or when playing across apps) */}
      <AnimatePresence>
        {isPlaying && activeApp !== 'music' && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              pointerEvents: 'auto',
              marginBottom: '10px',
              width: 'calc(100% - 32px)',
              maxWidth: '380px',
            }}
          >
            <div
              onClick={() => openApp('music')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                background: 'rgba(242, 234, 223, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--border-gold)',
                borderRadius: '18px',
                boxShadow: 'var(--shadow-card)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'rgba(248, 243, 234, 0.9)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--sage)',
                    flexShrink: 0,
                  }}
                >
                  <Music size={15} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {currentTrack.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.68rem',
                      color: 'var(--gold)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {currentTrack.artist} · {currentTrack.label}
                  </p>
                </div>
              </div>

              {/* Play / Pause button */}
              <button
                type="button"
                aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '8px',
                  flexShrink: 0,
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(30, 26, 23, 0.2)',
                  cursor: 'pointer',
                }}
              >
                {isPlaying ? <Pause size={14} fill="var(--bg-primary)" /> : <Play size={14} fill="var(--bg-primary)" style={{ marginLeft: '1px' }} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Home Pill Bar */}
      <div
        style={{
          pointerEvents: 'auto',
          padding: '8px 24px',
          cursor: activeApp ? 'pointer' : 'default',
        }}
        onClick={() => {
          if (activeApp) {
            closeApp();
          }
        }}
        aria-label={activeApp ? 'Return to Home screen' : 'System navigation bar'}
      >
        <motion.div
          whileTap={{ scale: 0.92 }}
          style={{
            width: '134px',
            height: '5px',
            borderRadius: '999px',
            backgroundColor: activeApp ? 'rgba(30, 26, 23, 0.45)' : 'rgba(30, 26, 23, 0.28)',
            boxShadow: '0 1px 3px rgba(66, 48, 25, 0.08)',
            transition: 'background-color 0.2s ease',
          }}
        />
      </div>
    </footer>
  );
};
