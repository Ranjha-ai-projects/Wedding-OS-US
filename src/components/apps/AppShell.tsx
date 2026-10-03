import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { StatusBar } from '../os/StatusBar';
import { useOS } from '../../context/OSContext';

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  bgColor?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  title,
  subtitle,
  children,
  headerRight,
  bgColor = '#F8F3EA',
}) => {
  const { closeApp, performanceProfile } = useOS();
  const isSafe = performanceProfile === 'safe';

  return (
    <motion.div
      initial={isSafe ? { y: 8, opacity: 1 } : { y: '100%' }}
      animate={{ y: 0, opacity: 1 }}
      exit={isSafe ? { y: 8, opacity: 1 } : { y: '100%' }}
      transition={
        isSafe
          ? { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
          : { type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }
      }
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.25 }}
      onDragEnd={(_, info) => {
        // Swipe from left to right gesture to go back (native iOS feel)
        if (info.offset.x > 80 && info.velocity.x > 150) {
          closeApp();
        }
      }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 25,
        backgroundColor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    >
      {/* Phone Status Bar (Dark text on warm ivory surface) */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <StatusBar variant="dark" />
      </div>

      {/* App Header Bar (Warm Stationery Glass) */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1.25rem 0.65rem 1.25rem',
          borderBottom: '1px solid rgba(184, 146, 83, 0.20)',
          background: isSafe ? 'rgba(242, 234, 223, 0.98)' : 'rgba(248, 243, 234, 0.88)',
          backdropFilter: isSafe ? 'none' : 'blur(16px)',
          WebkitBackdropFilter: isSafe ? 'none' : 'blur(16px)',
          boxShadow: '0 2px 10px rgba(66, 48, 25, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={closeApp}
            aria-label="Back to Couple OS Home"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(248, 243, 234, 0.8)',
              border: '1px solid rgba(184, 146, 83, 0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <ArrowLeft size={18} />
          </motion.button>

          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.1,
                fontWeight: 500,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div>
          {headerRight || (
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={closeApp}
              aria-label="Close app"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(248, 243, 234, 0.8)',
                border: '1px solid rgba(184, 146, 83, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Main App Content Viewport */}
      <div
        className="custom-scroll"
        style={{
          flex: 1,
          position: 'relative',
          overflowY: 'auto',
          paddingBottom: 'max(4.5rem, calc(env(safe-area-inset-bottom) + 3.5rem))',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
