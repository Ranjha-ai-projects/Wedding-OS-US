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
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--text-primary)',
              margin: '0 0 4px 0',
              fontWeight: 400,
            }}
          >
            The Songs of Us
          </p>
          <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>
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
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-gold)',
            boxShadow: 'var(--shadow-card)',
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
                background: 'radial-gradient(circle, #2C2621 20%, #1E1A17 50%, #2C2621 70%, #151210 100%)',
                boxShadow: '0 10px 30px rgba(66, 48, 25, 0.25), 0 0 20px rgba(184, 146, 83, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(184, 146, 83, 0.45)',
                position: 'relative',
              }}
            >
              {/* Vinyl grooves */}
              <div
                style={{
                  position: 'absolute',
                  inset: '16px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '30px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              />

              {/* Center label */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F8F3EA',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
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
              background: 'rgba(248, 243, 234, 0.9)',
              border: '1px solid var(--border-gold)',
              fontSize: '0.68rem',
              color: 'var(--gold)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={11} color="var(--sage)" />
            <span>{currentTrack.label}</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              color: 'var(--text-primary)',
              margin: '0 0 2px 0',
              fontWeight: 500,
            }}
          >
            {currentTrack.title}
          </h3>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
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
                background: 'rgba(30, 26, 23, 0.12)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  borderRadius: '2px',
                  background: 'var(--gold)',
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
                    background: 'var(--text-primary)',
                    boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
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
              color: 'var(--text-muted)',
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
              style={{ color: 'var(--text-primary)', padding: '6px' }}
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
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(30, 26, 23, 0.25)',
              }}
            >
              {isPlaying ? (
                <Pause size={24} fill="var(--bg-primary)" />
              ) : (
                <Play size={24} fill="var(--bg-primary)" style={{ marginLeft: '2px' }} />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={nextTrack}
              aria-label="Next track"
              style={{ color: 'var(--text-primary)', padding: '6px' }}
            >
              <SkipForward size={22} />
            </motion.button>
          </div>
        </motion.div>

        {/* Playlist Tracks List */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.85rem' }}>
            <Volume2 size={15} color="var(--sage)" />
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
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
                    background: isSelected ? 'rgba(184, 146, 83, 0.16)' : 'var(--bg-secondary)',
                    border: isSelected ? '1px solid var(--gold)' : '1px solid var(--border-gold)',
                    boxShadow: 'var(--shadow-soft)',
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
                        background: isSelected ? 'var(--gold)' : '#E7DEC8',
                        color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
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
                          color: isSelected ? 'var(--gold)' : 'var(--text-primary)',
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
                          color: 'var(--text-secondary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {track.artist} · <span style={{ color: 'var(--olive)' }}>{track.label}</span>
                      </p>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
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
