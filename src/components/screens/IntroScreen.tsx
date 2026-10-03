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
        backgroundColor: '#171613',
      }}
    >
      {/* Background with stable cinematic blur */}
      <motion.div
        animate={{
          scale: isSafe ? 1 : (isAccepting ? 1.05 : 1.12),
          opacity: isAccepting ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${weddingConfig.heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#171613',
          filter: isSafe ? 'none' : 'blur(14px)',
          transformOrigin: 'center center',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Dark Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(18, 16, 13, 0.4) 0%, rgba(18, 16, 13, 0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Share Invitation Card: Rendered immediately on first paint */}
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
              background: isSafe ? 'rgba(26, 23, 19, 0.92)' : 'rgba(26, 23, 19, 0.78)',
              backdropFilter: isSafe ? 'none' : 'blur(28px) saturate(130%)',
              WebkitBackdropFilter: isSafe ? 'none' : 'blur(28px) saturate(130%)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(198, 165, 107, 0.12)',
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
                background: 'linear-gradient(135deg, rgba(198, 165, 107, 0.35) 0%, rgba(198, 165, 107, 0.08) 100%)',
                border: '1px solid rgba(198, 165, 107, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne-gold)',
                marginBottom: '1.25rem',
              }}
            >
              <Heart size={24} strokeWidth={1.5} fill="rgba(198, 165, 107, 0.2)" />
            </motion.div>

            {/* Couple Names */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.1rem',
                fontWeight: 400,
                color: 'var(--color-warm-ivory)',
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
                color: 'var(--color-soft-gray)',
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
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne-gold)',
                  fontWeight: 600,
                }}
              >
                {weddingConfig.couple.shortDate}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '0.7rem' }}>•</span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-warm-ivory)',
                  fontWeight: 500,
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
                className="btn-luxury btn-luxury-gold"
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
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-warm-ivory)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
              >
                Not Now
              </button>
            </div>
          </motion.div>
        </div>
      );
    };
