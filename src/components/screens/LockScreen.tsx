import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronUp, Heart } from 'lucide-react';
import { StatusBar } from '../os/StatusBar';
import { useOS } from '../../context/OSContext';
import { weddingConfig } from '../../config/weddingConfig';

export const LockScreen: React.FC = () => {
  const { unlockPhone } = useOS();
  const [time, setTime] = useState('9:41');
  const [dateStr, setDateStr] = useState('Wednesday, September 23');

  // Motion value for upward swipe gesture
  const dragY = useMotionValue(0);
  const opacity = useTransform(dragY, [-180, 0], [0.2, 1]);
  const scale = useTransform(dragY, [-180, 0], [0.95, 1]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      setTime(`${h}:${m < 10 ? `0${m}` : m}`);

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      setDateStr(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Compute remaining days to wedding
  const weddingDate = new Date(weddingConfig.couple.weddingDate);
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const displayDays = isNaN(diffDays) ? 32 : (diffDays > 0 ? diffDays : 32);

  const isUnlocking = React.useRef(false);
  const handleUnlock = () => {
    if (isUnlocking.current) return;
    isUnlocking.current = true;
    unlockPhone();
  };

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y < -75 || info.velocity.y < -300) {
      handleUnlock();
    }
  };

  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: '#171613',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        y: dragY,
        opacity,
        scale,
      }}
      drag="y"
      dragConstraints={{ top: -250, bottom: 0 }}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
      onDragEnd={handleDragEnd}
    >
      {/* Background Couple Portrait */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${weddingConfig.lockPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          transform: 'scale(1.02)',
        }}
      />

      {/* Dark Warm Cinematic Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(18, 16, 13, 0.65) 0%,
            rgba(18, 16, 13, 0.25) 35%,
            rgba(18, 16, 13, 0.45) 65%,
            rgba(18, 16, 13, 0.92) 100%
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Top Status Bar & Clock */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <StatusBar variant="light" />

        <div
          style={{
            textAlign: 'center',
            paddingTop: '1.2rem',
            paddingBottom: '0.5rem',
          }}
        >
          <p
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: 'var(--color-secondary-cream)',
              letterSpacing: '0.04em',
              margin: '0 0 0.25rem 0',
              textTransform: 'uppercase',
            }}
          >
            {dateStr}
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4.8rem',
              fontWeight: 400,
              color: 'var(--color-warm-ivory)',
              lineHeight: 0.95,
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.02em',
            }}
          >
            {time}
          </h2>

          <div style={{ marginTop: '0.5rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--color-champagne-gold)',
                margin: '0 0 0.2rem 0',
                fontWeight: 400,
              }}
            >
              {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName}
            </h1>
            <p
              style={{
                fontSize: '0.82rem',
                color: 'rgba(255, 255, 255, 0.75)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {displayDays} days until we say “I do”
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Incoming Lock Screen Notification */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 18px',
          margin: 'auto 0 1.25rem 0',
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          onClick={handleUnlock}
          style={{
            cursor: 'pointer',
            padding: '14px 16px',
            borderRadius: '24px',
            background: 'rgba(26, 23, 19, 0.76)',
            backdropFilter: 'blur(20px) saturate(125%)',
            WebkitBackdropFilter: 'blur(20px) saturate(125%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c6a56b 0%, #8c6d37 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#171613',
              flexShrink: 0,
            }}
          >
            <Heart size={20} fill="#171613" />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--color-champagne-gold)',
                  letterSpacing: '0.04em',
                }}
              >
                Couple OS
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--color-soft-gray)' }}>
                now
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.84rem',
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName} shared their wedding with you
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Swipe up gesture indicator & Tap fallback */}
      <div
        onClick={handleUnlock}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 'max(1.2rem, env(safe-area-inset-bottom))',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--color-warm-ivory)',
            marginBottom: '10px',
          }}
        >
          <ChevronUp size={20} strokeWidth={2} style={{ opacity: 0.7 }} />
          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 500,
            }}
          >
            Swipe up to open
          </span>
        </motion.div>

        {/* Lock screen home bar */}
        <div
          style={{
            width: '134px',
            height: '5px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.4)',
          }}
        />
      </div>
    </motion.div>
  );
};
