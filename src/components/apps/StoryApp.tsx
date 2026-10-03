import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { AppShell } from './AppShell';
import { weddingConfig, type StoryMoment } from '../../config/weddingConfig';
import { SESSION_MESSAGE_INTRO_KEY } from '../../context/OSContext';

export const StoryApp: React.FC = () => {
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_MESSAGE_INTRO_KEY) === 'true';
  });
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    // If already shown in this session, don't replay typing
    if (sessionStorage.getItem(SESSION_MESSAGE_INTRO_KEY) === 'true') {
      return;
    }

    // Immediately mark as triggered in session
    sessionStorage.setItem(SESSION_MESSAGE_INTRO_KEY, 'true');

    // Natural 850ms delay, show typing indicator, then reveal new message
    const typingTimer = setTimeout(() => {
      setIsTyping(true);

      const messageTimer = setTimeout(() => {
        setIsTyping(false);
        setHasNewMessage(true);
      }, 1100);

      return () => clearTimeout(messageTimer);
    }, 750);

    return () => clearTimeout(typingTimer);
  }, []);

  const coupleSubtitle = `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`;

  return (
    <AppShell title="Our Story" subtitle={coupleSubtitle}>
      <div style={{ padding: '1rem 1.25rem 3.5rem 1.25rem' }}>
        {/* Editorial Subheading */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              margin: '0 0 0.45rem 0',
              fontWeight: 400,
            }}
          >
            Some conversations change everything.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 0 0.25rem 0' }}>
            <span style={{ height: '1px', width: '28px', background: 'var(--border-gold)' }} />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.74rem',
                color: 'var(--gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                margin: 0,
                fontWeight: 600,
              }}
            >
              Four years told in words &amp; moments
            </p>
            <span style={{ height: '1px', width: '28px', background: 'var(--border-gold)' }} />
          </div>
        </div>

        {/* Live In-App Welcome Message from Joshua (Only once per session) */}
        <div style={{ marginBottom: '1.75rem' }}>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '18px',
                background: 'var(--surface-cream)',
                border: '1px solid var(--border-gold)',
                boxShadow: 'var(--shadow-soft)',
                width: 'fit-content',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                }}
              >
                J
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Joshua is typing…
              </span>
              <div style={{ display: 'flex', gap: '3px', marginLeft: '4px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', animation: 'softPulse 0.8s infinite' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', animation: 'softPulse 0.8s infinite 0.2s' }} />
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', animation: 'softPulse 0.8s infinite 0.4s' }} />
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {hasNewMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#E7DEC8',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    flexShrink: 0,
                  }}
                >
                  J
                </div>

                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: '18px 18px 18px 4px',
                    background: 'var(--surface-cream)',
                    border: '1px solid var(--border-gold)',
                    boxShadow: 'var(--shadow-soft)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold)' }}>
                      Joshua
                    </span>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                      just now
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                    Hey Sarah — glad you found our story 👀 Enjoy exploring!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Story Timeline Moments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {weddingConfig.storyMoments.map((moment: StoryMoment, index: number) => {
            return (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Timeline Date Pill Divider */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                  }}
                >
                  <div style={{ height: '1px', flex: 1, background: 'rgba(184, 146, 83, 0.25)' }} />
                  <div
                    style={{
                      padding: '4px 14px',
                      borderRadius: '16px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid rgba(184, 146, 83, 0.45)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {moment.date} · {moment.title}
                  </div>
                  <div style={{ height: '1px', flex: 1, background: 'rgba(184, 146, 83, 0.25)' }} />
                </div>

                {/* Couple OS Messaging Stream */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    padding: '0.5rem 0',
                  }}
                >
                  {moment.messages.map((msg, mIdx) => {
                    const isGroom = msg.sender === 'groom';

                    return (
                      <div
                        key={mIdx}
                        style={{
                          display: 'flex',
                          flexDirection: isGroom ? 'row' : 'row-reverse',
                          alignItems: 'flex-end',
                          gap: '8px',
                        }}
                      >
                        {/* Avatar */}
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: isGroom
                              ? '#E7DEC8'
                              : 'var(--sage)',
                            border: '1px solid rgba(184, 146, 83, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: isGroom ? 'var(--gold)' : '#F8F3EA',
                            flexShrink: 0,
                          }}
                        >
                          {isGroom ? 'J' : 'E'}
                        </div>

                        {/* Speech Bubble */}
                        <div
                          style={{
                            maxWidth: '78%',
                            padding: '10px 14px',
                            borderRadius: isGroom
                              ? '18px 18px 18px 4px'
                              : '18px 18px 4px 18px',
                            background: isGroom
                              ? 'rgba(255, 255, 255, 0.65)'
                              : 'var(--bg-secondary)',
                            border: '1px solid rgba(184, 146, 83, 0.24)',
                            boxShadow: 'var(--shadow-soft)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                            <span
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: 'var(--gold)',
                              }}
                            >
                              {isGroom ? weddingConfig.couple.groomName : weddingConfig.couple.brideName}
                            </span>
                            {msg.time && (
                              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                                {msg.time}
                              </span>
                            )}
                          </div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.88rem',
                              color: 'var(--text-primary)',
                              lineHeight: 1.35,
                            }}
                          >
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Editorial Photo for this memory */}
                {moment.photoUrl && (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    style={{
                      borderRadius: '22px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: '1px solid var(--border-gold)',
                      boxShadow: 'var(--shadow-card)',
                      background: 'var(--bg-secondary)',
                    }}
                  >
                    <img
                      src={moment.photoUrl}
                      alt={moment.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '210px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {moment.photoCaption && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '12px 14px',
                          background: 'linear-gradient(to top, rgba(30, 26, 23, 0.78) 0%, transparent 100%)',
                          fontSize: '0.78rem',
                          color: '#F8F3EA',
                          fontStyle: 'italic',
                        }}
                      >
                        {moment.photoCaption}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* Final Emotional Note */}
          <div
            style={{
              textAlign: 'center',
              padding: '2rem 1.25rem',
              borderRadius: '24px',
              background: 'var(--surface-cream)',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <Heart size={22} color="var(--gold)" style={{ margin: '0 auto 0.75rem auto' }} />
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--text-primary)',
                margin: '0 0 0.5rem 0',
              }}
            >
              “And now, October 25, 2026.”
            </p>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
              The best chapter begins with all of you by our side.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
