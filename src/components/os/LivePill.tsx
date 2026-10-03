import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, SkipForward, CheckCircle2, ChevronRight } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import { weddingConfig } from '../../config/weddingConfig';

export const LivePill: React.FC = () => {
  const { rsvpData, livePillExpanded, toggleLivePillExpanded, openApp } = useOS();
  const { isPlaying, currentTrack, togglePlay, nextTrack, currentTime, duration } = useAudio();

  // Temporary RSVP confirmation badge: only show for 6 seconds right after submitting RSVP
  const [showRsvpBadge, setShowRsvpBadge] = useState<boolean>(() => {
    return sessionStorage.getItem('coupleOS.rsvpPill.active') === 'true';
  });

  useEffect(() => {
    if (sessionStorage.getItem('coupleOS.rsvpPill.active') === 'true') {
      setShowRsvpBadge(true);
      const timer = setTimeout(() => {
        setShowRsvpBadge(false);
        sessionStorage.removeItem('coupleOS.rsvpPill.active');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [rsvpData.completed]);

  const isMusicActive = isPlaying;
  const isRSVPActive = showRsvpBadge && !isMusicActive;

  const handlePillClick = () => {
    if (showRsvpBadge) {
      setShowRsvpBadge(false);
      sessionStorage.removeItem('coupleOS.rsvpPill.active');
    }
    toggleLivePillExpanded();
  };

  // Format mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? `0${rem}` : rem}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {/* Dynamic Pill Button */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={handlePillClick}
        aria-label="Couple OS Live Activity"
        style={{
          height: '24px',
          minWidth: isMusicActive ? '150px' : isRSVPActive ? '120px' : '76px',
          padding: '2px 10px',
          borderRadius: '20px',
          backgroundColor: '#1E1A17',
          border: '1px solid rgba(184, 146, 83, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          color: '#F8F3EA',
          fontSize: '0.72rem',
          boxShadow: '0 2px 10px rgba(30, 26, 23, 0.25)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {isMusicActive ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden' }}>
              <Music size={11} color="var(--gold)" />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '90px',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  color: '#F8F3EA',
                }}
              >
                {currentTrack.title}
              </span>
            </div>

            {/* Subtle animated sound wave */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <motion.div
                animate={{ height: ['4px', '10px', '4px'] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                style={{ width: '2px', background: 'var(--gold)', borderRadius: '1px' }}
              />
              <motion.div
                animate={{ height: ['8px', '4px', '8px'] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
                style={{ width: '2px', background: 'var(--gold)', borderRadius: '1px' }}
              />
              <motion.div
                animate={{ height: ['5px', '11px', '5px'] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                style={{ width: '2px', background: 'var(--gold)', borderRadius: '1px' }}
              />
            </div>
          </>
        ) : isRSVPActive ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', margin: '0 auto' }}>
            <CheckCircle2 size={12} color="var(--sage)" />
            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#F8F3EA' }}>
              RSVP Confirmed
            </span>
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'rgba(184, 146, 83, 0.6)',
              }}
            />
          </div>
        )}
      </motion.button>

      {/* Expanded Live Activity Popup Modal */}
      <AnimatePresence>
        {livePillExpanded && (
          <>
            {/* Backdrop to close */}
            <div
              onClick={toggleLivePillExpanded}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 95,
                background: 'rgba(30, 26, 23, 0.25)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={{
                position: 'absolute',
                top: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '310px',
                padding: '14px 16px',
                borderRadius: '24px',
                background: 'rgba(248, 243, 234, 0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border-gold)',
                boxShadow: 'var(--shadow-card)',
                zIndex: 100,
                color: 'var(--text-primary)',
              }}
            >
              {isMusicActive || currentTrack ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Music size={13} color="var(--sage)" />
                      <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700 }}>
                        Now Playing
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLivePillExpanded();
                        openApp('music');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <span>Music App</span>
                      <ChevronRight size={12} color="var(--gold)" />
                    </button>
                  </div>

                  <p style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {currentTrack.title}
                  </p>
                  <p style={{ margin: '0 0 10px 0', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    {currentTrack.artist} · <span style={{ color: 'var(--olive)' }}>{currentTrack.label}</span>
                  </p>

                  {/* Scrubber bar */}
                  <div style={{ width: '100%', height: '3px', background: 'rgba(30, 26, 23, 0.12)', borderRadius: '2px', marginBottom: '6px' }}>
                    <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--gold)', borderRadius: '2px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Playback Controls */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={togglePlay}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--text-primary)',
                        color: 'var(--bg-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(30, 26, 23, 0.25)',
                        cursor: 'pointer',
                      }}
                    >
                      {isPlaying ? <Pause size={16} fill="var(--bg-primary)" /> : <Play size={16} fill="var(--bg-primary)" style={{ marginLeft: '1px' }} />}
                    </button>
                    <button
                      type="button"
                      onClick={nextTrack}
                      style={{
                        color: 'var(--text-primary)',
                        padding: '6px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <SkipForward size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Couple OS</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.72rem', color: 'var(--gold)' }}>
                    {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName} · {weddingConfig.couple.shortDate}
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
