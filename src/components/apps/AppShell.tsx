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
  bgColor = '#171613',
}) => {
  const { closeApp } = useOS();

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0.95 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0.95 }}
      transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
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
        zIndex: 60,
        backgroundColor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Phone Status Bar */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <StatusBar variant="light" />
      </div>

      {/* App Header Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1.25rem 0.65rem 1.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(23, 22, 19, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
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
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-warm-ivory)',
            }}
          >
            <ArrowLeft size={18} />
          </motion.button>

          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-warm-ivory)',
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
                  color: 'var(--color-champagne-gold)',
                  letterSpacing: '0.12em',
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
                background: 'rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
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
