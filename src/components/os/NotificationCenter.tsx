import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Bell, Heart, Music, Calendar } from 'lucide-react';
import { useOS, type AppId } from '../../context/OSContext';
import { weddingConfig } from '../../config/weddingConfig';

export const NotificationCenter: React.FC = () => {
  const { isNotificationCenterOpen, closeNotificationCenter, notificationHistory, openApp } = useOS();

  // Wedding countdown
  const weddingDate = new Date(weddingConfig.couple.weddingDate);
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const countdownNumber = isNaN(diffDays) ? 32 : (diffDays > 0 ? diffDays : 32);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`;

  const getNotificationIcon = (app?: AppId) => {
    switch (app) {
      case 'music': return <Music size={14} color="var(--color-champagne-gold)" />;
      case 'events': return <Calendar size={14} color="var(--color-champagne-gold)" />;
      default: return <Heart size={14} color="var(--color-champagne-gold)" />;
    }
  };

  return (
    <AnimatePresence>
      {isNotificationCenterOpen && (
        <motion.div
          initial={{ y: '-100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.8 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 150,
            backgroundColor: 'rgba(18, 16, 13, 0.94)',
            backdropFilter: 'blur(30px) saturate(130%)',
            WebkitBackdropFilter: 'blur(30px) saturate(130%)',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            color: 'var(--color-warm-ivory)',
          }}
          drag="y"
          dragConstraints={{ top: -200, bottom: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.y < -60) {
              closeNotificationCenter();
            }
          }}
        >
          {/* Header */}
          <div style={{ padding: '0 1.5rem 1rem 1.5rem', textAlign: 'center' }}>
            <p
              style={{
                margin: '0 0 2px 0',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-champagne-gold)',
                fontWeight: 600,
              }}
            >
              {dateStr}
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                margin: '0 0 4px 0',
                lineHeight: 1,
                color: 'var(--color-warm-ivory)',
                fontWeight: 400,
              }}
            >
              {countdownNumber}
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-soft-gray)',
                fontWeight: 600,
              }}
            >
              DAYS TO GO
            </p>
          </div>

          {/* Section Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={13} color="var(--color-champagne-gold)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Notifications
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-soft-gray)' }}>
              {notificationHistory.length} total
            </span>
          </div>

          {/* Notifications List */}
          <div
            className="custom-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {notificationHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-soft-gray)' }}>
                <p style={{ fontSize: '0.85rem' }}>No new notifications</p>
              </div>
            ) : (
              notificationHistory.map((item) => (
                <motion.div
                  key={item.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (item.actionApp) {
                      openApp(item.actionApp);
                    }
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '20px',
                    background: 'rgba(26, 23, 19, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(198, 165, 107, 0.15)',
                      border: '1px solid rgba(198, 165, 107, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {getNotificationIcon(item.actionApp)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-champagne-gold)' }}>
                        {item.sender}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--color-soft-gray)' }}>
                        {item.time}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.35 }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Close Swipe Hint */}
          <div
            onClick={closeNotificationCenter}
            style={{
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronUp size={20} color="var(--color-champagne-gold)" />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-soft-gray)' }}>
              Swipe up to close
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
