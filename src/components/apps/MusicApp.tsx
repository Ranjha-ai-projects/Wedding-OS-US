import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Disc3, Volume2, Music, Sparkles } from 'lucide-react';
import { AppShell } from './AppShell';
import { weddingConfig, type SongTrack } from '../../config/weddingConfig';
import { useAudio } from '../../context/AudioContext';

export const MusicApp: React.FC = () => {
  const { isPlaying, currentTrack, currentTime, duration, playlist, togglePlay, playTrack, nextTrack, prevTrack, seek } = useAudio();

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining < 10 ? `0${remaining}` : remaining}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    seek(percentage);
  };

  const coupleTitle = `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`;

  return (
    <AppShell title="Our Soundtrack" subtitle={coupleTitle}>
      <div style={{ padding: '0.8rem 1.25rem 3.5rem 1.25rem' }}>
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: 'var(--color-warm-ivory)',
              margin: '0 0 2px 0',
            }}
          >
            The Songs of Us
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Melodies through our years together
          </p>
        </div>

        {/* Hero Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '1.6rem 1.4rem',
            borderRadius: '28px',
            background: 'linear-gradient(145deg, rgba(34, 30, 24, 0.85) 0%, rgba(20, 18, 14, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(198, 165, 107, 0.35)',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.45)',
            marginBottom: '1.75rem',
            textAlign: 'center',
          }}
        >
          {/* Animated Vinyl Disc */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                rotate: {
                  repeat: Infinity,
                  duration: 12,
                  ease: 'linear',
                },
              }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #29251F 20%, #171613 50%, #29251F 70%, #12100d 100%)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(198, 165, 107, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(198, 165, 107, 0.4)',
                position: 'relative',
              }}
            >
              {/* Vinyl grooves */}
              <div
                style={{
                  position: 'absolute',
                  inset: '16px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '30px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              />

              {/* Center label */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c6a56b 0%, #8c6d37 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#171613',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Disc3 size={20} />
              </div>
            </motion.div>
          </div>

          {/* Song Info */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '12px',
              background: 'rgba(198, 165, 107, 0.15)',
              border: '1px solid rgba(198, 165, 107, 0.3)',
              fontSize: '0.68rem',
              color: 'var(--color-champagne-gold)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={11} />
            <span>{currentTrack.label}</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              color: 'var(--color-warm-ivory)',
              margin: '0 0 2px 0',
              fontWeight: 500,
            }}
          >
            {currentTrack.title}
          </h3>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-soft-gray)',
              margin: '0 0 1.25rem 0',
            }}
          >
            {currentTrack.artist}
          </p>

          {/* Interactive Progress Bar */}
          <div
            onClick={handleProgressBarClick}
            style={{
              width: '100%',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: '4px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '4px',
                borderRadius: '2px',
                background: 'rgba(255, 255, 255, 0.15)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  borderRadius: '2px',
                  background: 'linear-gradient(90deg, #c6a56b 0%, #e6c88f 100%)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: '-4px',
                    top: '-3px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 0 6px rgba(0, 0, 0, 0.5)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Time indicators */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              color: 'var(--color-soft-gray)',
              marginBottom: '1.25rem',
            }}
          >
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Player Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={prevTrack}
              aria-label="Previous track"
              style={{ color: 'var(--color-warm-ivory)', padding: '6px' }}
            >
              <SkipBack size={22} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e6c88f 0%, #c6a56b 100%)',
                color: '#171613',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(198, 165, 107, 0.4)',
              }}
            >
              {isPlaying ? (
                <Pause size={24} fill="#171613" />
              ) : (
                <Play size={24} fill="#171613" style={{ marginLeft: '2px' }} />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={nextTrack}
              aria-label="Next track"
              style={{ color: 'var(--color-warm-ivory)', padding: '6px' }}
            >
              <SkipForward size={22} />
            </motion.button>
          </div>
        </motion.div>

        {/* Playlist Tracks List */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.85rem' }}>
            <Volume2 size={15} color="var(--color-champagne-gold)" />
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-soft-gray)',
                margin: 0,
                fontWeight: 600,
              }}
            >
              Soundtrack Playlist ({playlist.length})
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {playlist.map((track: SongTrack, idx: number) => {
              const isSelected = track.id === currentTrack.id;

              return (
                <motion.div
                  key={track.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => playTrack(track)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(198, 165, 107, 0.16)' : 'rgba(26, 23, 19, 0.6)',
                    border: isSelected ? '1px solid rgba(198, 165, 107, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isSelected ? 'var(--color-champagne-gold)' : 'rgba(255, 255, 255, 0.08)',
                        color: isSelected ? '#171613' : 'var(--color-warm-ivory)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && isPlaying ? <Music size={15} /> : idx + 1}
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          margin: '0 0 2px 0',
                          fontSize: '0.86rem',
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {track.title}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.72rem',
                          color: 'var(--color-soft-gray)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {track.artist} · <span style={{ color: 'var(--color-secondary-cream)' }}>{track.label}</span>
                      </p>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--color-soft-gray)', marginLeft: '8px' }}>
                    {track.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
