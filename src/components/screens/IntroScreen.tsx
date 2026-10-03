import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { weddingConfig } from '../../config/weddingConfig';

export const IntroScreen: React.FC = () => {
  const { acceptInvite, declineInvite, performanceProfile } = useOS();
  const isSafe = performanceProfile === 'safe';
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      acceptInvite();
    }, 650);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#F8F3EA',
      }}
    >
      {/* Background with warm cinematic photography */}
      <motion.div
        animate={{
          scale: isSafe ? 1 : (isAccepting ? 1.05 : 1.12),
          opacity: isAccepting ? 0.9 : 0.8,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${weddingConfig.heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#F8F3EA',
          filter: isSafe ? 'none' : 'blur(12px)',
          transformOrigin: 'center center',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Luminous Warm Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(248, 243, 234, 0.35) 0%, rgba(248, 243, 234, 0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Share Invitation Card */}
      <motion.div
        initial={false}
        animate={{
          opacity: isAccepting ? 0 : 1,
          scale: isAccepting ? 0.94 : 1,
          y: isAccepting ? -20 : 0,
        }}
        transition={{
          duration: isAccepting ? 0.45 : 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: 'calc(100% - 44px)',
          maxWidth: '360px',
          padding: '2.4rem 1.8rem',
          borderRadius: '32px',
          background: isSafe ? 'rgba(242, 234, 223, 0.98)' : 'rgba(248, 243, 234, 0.94)',
          backdropFilter: isSafe ? 'none' : 'blur(24px) saturate(110%)',
          WebkitBackdropFilter: isSafe ? 'none' : 'blur(24px) saturate(110%)',
          border: '1px solid var(--border-gold)',
          boxShadow: 'var(--shadow-card)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Monogram Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(184, 146, 83, 0.12)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)',
            marginBottom: '1.25rem',
          }}
        >
          <Heart size={24} strokeWidth={1.5} fill="rgba(184, 146, 83, 0.2)" />
        </motion.div>

        {/* Couple Names */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.1rem',
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
            margin: '0 0 0.75rem 0',
          }}
        >
          {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName}
        </h1>

        {/* Subheading text */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            margin: '0 0 1.25rem 0',
            fontWeight: 400,
          }}
        >
          would like to share their private Couple OS with you.
        </p>

        {/* Wedding Date & City */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1rem',
            borderRadius: '20px',
            background: 'rgba(242, 234, 223, 0.85)',
            border: '1px solid var(--border-gold)',
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.74rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 700,
            }}
          >
            {weddingConfig.couple.shortDate}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>•</span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.74rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              fontWeight: 600,
            }}
          >
            {weddingConfig.couple.locationCity}
          </span>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleAccept}
            className="btn-luxury btn-luxury-charcoal"
            style={{
              width: '100%',
              fontSize: '0.88rem',
              letterSpacing: '0.06em',
              padding: '0.95rem 1.2rem',
              borderRadius: '18px',
            }}
          >
            Accept Invitation ♡
          </motion.button>

          <button
            type="button"
            onClick={declineInvite}
            style={{
              padding: '0.6rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Not Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};
