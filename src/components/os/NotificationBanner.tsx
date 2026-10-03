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
              background: 'rgba(248, 243, 234, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-gold)',
              borderRadius: '22px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Avatar Icon */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--sage)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F8F3EA',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(138, 148, 122, 0.25)',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              {activeNotification.avatarText || <Heart size={18} fill="#F8F3EA" />}
            </div>

            {/* Text Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {activeNotification.sender}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {activeNotification.time}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.35,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: 500,
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
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
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
