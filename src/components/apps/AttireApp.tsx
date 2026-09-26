import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { AppShell } from './AppShell';
import { weddingConfig, type AttirePalette, type AttireSection } from '../../config/weddingConfig';

export const AttireApp: React.FC = () => {
  const { attire } = weddingConfig;

  return (
    <AppShell title={attire.title} subtitle={attire.subtitle}>
      <div style={{ padding: '0.8rem 1.25rem 3.5rem 1.25rem' }}>
        {/* Dress Code Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            padding: '2rem 1.5rem',
            borderRadius: '28px',
            background: 'rgba(26, 23, 19, 0.78)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(198, 165, 107, 0.35)',
            boxShadow: '0 14px 40px rgba(0, 0, 0, 0.45)',
            marginBottom: '1.75rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'rgba(198, 165, 107, 0.15)',
              border: '1px solid rgba(198, 165, 107, 0.3)',
              fontSize: '0.72rem',
              color: 'var(--color-champagne-gold)',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={12} />
            <span>Dress Code</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.2rem',
              color: 'var(--color-warm-ivory)',
              lineHeight: 1.05,
              margin: '0 0 0.75rem 0',
              fontWeight: 400,
            }}
          >
            {attire.dressCode}
          </h2>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--color-secondary-cream)',
              lineHeight: 1.5,
              margin: '0 auto',
              maxWidth: '300px',
            }}
          >
            {attire.description}
          </p>
        </motion.div>

        {/* Color Palette Inspiration Swatches */}
        <div style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne-gold)',
              marginBottom: '0.85rem',
              fontWeight: 600,
            }}
          >
            Color Palette Inspiration
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {attire.palettes.map((palette: AttirePalette, idx: number) => {
              return (
                <motion.div
                  key={palette.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  style={{
                    padding: '12px',
                    borderRadius: '18px',
                    background: 'rgba(26, 23, 19, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* Swatch color pill */}
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: palette.hex,
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                      flexShrink: 0,
                    }}
                  />

                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--color-warm-ivory)',
                      }}
                    >
                      {palette.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.68rem',
                        color: 'var(--color-soft-gray)',
                      }}
                    >
                      {palette.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Editorial Fashion Guidelines by Category */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {attire.sections.map((sec: AttireSection, index: number) => {
            return (
              <motion.div
                key={sec.event}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                style={{
                  padding: '1.4rem',
                  borderRadius: '24px',
                  background: 'rgba(26, 23, 19, 0.7)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <div style={{ marginBottom: '10px' }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.45rem',
                      color: 'var(--color-warm-ivory)',
                      margin: '0 0 4px 0',
                      lineHeight: 1.2,
                    }}
                  >
                    {sec.event}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--color-champagne-gold)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {sec.code}
                  </p>
                </div>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--color-secondary-cream)',
                    lineHeight: 1.45,
                    marginBottom: '1rem',
                  }}
                >
                  {sec.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {sec.guidelines.map((g, gIdx) => (
                    <div key={gIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      <Check size={14} color="var(--color-champagne-gold)" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
