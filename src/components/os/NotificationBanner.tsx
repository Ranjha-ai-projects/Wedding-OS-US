import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const NotificationBanner: React.FC = () => {
  const { activeNotification, dismissNotification, openApp } = useOS();

  return (
    <AnimatePresence>
      {activeNotification && (
        <motion.div
          role="alert"
          aria-live="polite"
          initial={{ y: -80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          drag="y"
          dragConstraints={{ bottom: 0, top: -150 }}
          onDragEnd={(_, info) => {
            if (info.offset.y < -40) {
              dismissNotification();
            }
          }}
          style={{
            position: 'absolute',
            top: 'calc(max(0.6rem, env(safe-area-inset-top)) + 36px)',
            left: '12px',
            right: '12px',
            zIndex: 120,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (activeNotification.actionApp) {
              openApp(activeNotification.actionApp);
            }
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              background: 'rgba(26, 23, 19, 0.92)',
              backdropFilter: 'blur(25px) saturate(140%)',
              WebkitBackdropFilter: 'blur(25px) saturate(140%)',
              border: '1px solid rgba(198, 165, 107, 0.4)',
              borderRadius: '22px',
              boxShadow: '0 14px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(198, 165, 107, 0.15)',
            }}
          >
            {/* Avatar Icon */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c6a56b 0%, #8c6d37 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#171613',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(198, 165, 107, 0.3)',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              {activeNotification.avatarText || <Heart size={18} fill="#171613" />}
            </div>

            {/* Text Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--color-champagne-gold)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {activeNotification.sender}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-soft-gray)' }}>
                  {activeNotification.time}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: 1.35,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {activeNotification.text}
              </p>
            </div>

            {/* Close button */}
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={(e) => {
                e.stopPropagation();
                dismissNotification();
              }}
              style={{
                padding: '6px',
                color: 'var(--color-soft-gray)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
              }}
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
