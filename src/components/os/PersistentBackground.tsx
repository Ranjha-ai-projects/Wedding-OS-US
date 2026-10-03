import React from 'react';
import { weddingConfig } from '../../config/weddingConfig';

interface PersistentBackgroundProps {
  isSafe: boolean;
}

/**
 * Persistent Background Layer for Couple OS
 * 
 * Stays permanently mounted at the base layer across all app navigation.
 * Under "safe" profile: remains static with zero scale/parallax.
 * Under "full" profile: provides subtle depth.
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
        backgroundColor: '#171613',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Primary Wedding Photograph - Stays permanently mounted */}
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

      {/* Dark warm vignette and gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(18, 16, 13, 0.70) 0%,
            rgba(18, 16, 13, 0.38) 30%,
            rgba(18, 16, 13, 0.55) 60%,
            rgba(18, 16, 13, 0.94) 100%
          )`,
        }}
      />
    </div>
  );
};
