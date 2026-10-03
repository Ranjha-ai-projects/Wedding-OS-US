import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, children }) => {
  const { performanceProfile } = useOS();
  const isSafe = performanceProfile === 'safe';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 130,
              backgroundColor: isSafe ? 'rgba(30, 26, 23, 0.45)' : 'rgba(30, 26, 23, 0.35)',
              backdropFilter: isSafe ? 'none' : 'blur(8px)',
              WebkitBackdropFilter: isSafe ? 'none' : 'blur(8px)',
            }}
          />

          {/* Sheet Surface */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.8 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 70) {
                onClose();
              }
            }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 140,
              backgroundColor: isSafe ? 'var(--bg-primary)' : 'rgba(248, 243, 234, 0.97)',
              backdropFilter: isSafe ? 'none' : 'blur(20px)',
              WebkitBackdropFilter: isSafe ? 'none' : 'blur(20px)',
              borderTop: '1px solid var(--border-gold)',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
              boxShadow: '0 -10px 40px rgba(66, 48, 25, 0.15)',
              color: 'var(--text-primary)',
            }}
          >
            {/* Drag Handle Bar */}
            <div
              style={{
                width: '100%',
                padding: '12px 0 8px 0',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'grab',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(184, 146, 83, 0.4)',
                }}
              />
            </div>

            {/* Title (if present) */}
            {title && (
              <div
                style={{
                  padding: '4px 1.5rem 12px 1.5rem',
                  borderBottom: '1px solid rgba(184, 146, 83, 0.25)',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {title}
                </h3>
              </div>
            )}

            {/* Content Container */}
            <div
              className="custom-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.25rem 1.5rem',
              }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
