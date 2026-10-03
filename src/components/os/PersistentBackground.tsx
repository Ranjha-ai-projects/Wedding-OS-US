import React from 'react';
import { weddingConfig } from '../../config/weddingConfig';

interface PersistentBackgroundProps {
  isSafe: boolean;
}

/**
 * Persistent Background Layer for Couple OS
 * 
 * Stays permanently mounted at the base layer across all app navigation.
 * Uses warm photographic grading with soft champagne/cream tone.
 */
export const PersistentBackground: React.FC<PersistentBackgroundProps> = ({ isSafe }) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#F8F3EA',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Primary Wedding Photograph */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${weddingConfig.heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          transform: isSafe ? 'none' : 'scale(1.02)',
          transformOrigin: 'center center',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Luminous Warm Cream & Champagne Soft Fade Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(248, 243, 234, 0.42) 0%,
            rgba(248, 243, 234, 0.18) 30%,
            rgba(248, 243, 234, 0.50) 60%,
            rgba(248, 243, 234, 0.94) 100%
          )`,
        }}
      />
    </div>
  );
};
