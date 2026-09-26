import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { AppShell } from './AppShell';
import { weddingConfig } from '../../config/weddingConfig';
import { useOS } from '../../context/OSContext';

export const InviteApp: React.FC = () => {
  const { openApp } = useOS();

  const coupleSubtitle = `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`;

  return (
    <AppShell title="Formal Invitation" subtitle={coupleSubtitle}>
      <div
        style={{
          padding: '1.25rem 1.25rem 2rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Luxury Invitation Card Surface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: 'var(--color-warm-ivory)',
            color: 'var(--color-ink-black)',
            borderRadius: '28px',
            padding: '2.5rem 1.75rem 2.25rem 1.75rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(198, 165, 107, 0.4)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Delicate Gold Inner Frame Border */}
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              border: '1px solid rgba(198, 165, 107, 0.35)',
              borderRadius: '20px',
              pointerEvents: 'none',
            }}
          />

          {/* Delicate Botanical Monogram */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid var(--color-champagne-gold)',
              marginBottom: '1.5rem',
              color: 'var(--color-deep-champagne)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontStyle: 'italic' }}>
              E&amp;J
            </span>
          </div>

          {/* Formal Invite Line */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-espresso)',
              marginBottom: '1.75rem',
              fontWeight: 500,
            }}
          >
            Together with their families
          </p>

          {/* Dominant Couple Names */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 8vw, 3.4rem)',
              lineHeight: 0.95,
              fontWeight: 400,
              color: 'var(--color-ink-black)',
              margin: '0',
            }}
          >
            {weddingConfig.couple.brideName}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontStyle: 'italic',
              color: 'var(--color-champagne-gold)',
              margin: '0.35rem 0',
            }}
          >
            &amp;
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 8vw, 3.4rem)',
              lineHeight: 0.95,
              fontWeight: 400,
              color: 'var(--color-ink-black)',
              margin: '0 0 1.75rem 0',
            }}
          >
            {weddingConfig.couple.groomName}
          </h1>

          {/* Invitation Copy */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: 'var(--color-espresso)',
              lineHeight: 1.5,
              maxWidth: '240px',
              margin: '0 auto 1.75rem auto',
            }}
          >
            invite you to celebrate their wedding and the beginning of their new chapter
          </p>

          {/* Date & Location with refined divider */}
          <div
            style={{
              padding: '1.2rem 0',
              borderTop: '1px solid rgba(198, 165, 107, 0.3)',
              borderBottom: '1px solid rgba(198, 165, 107, 0.3)',
              marginBottom: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: 'var(--color-ink-black)',
                margin: '0 0 0.3rem 0',
                fontWeight: 500,
              }}
            >
              {weddingConfig.couple.displayDate}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-deep-champagne)',
                margin: 0,
                fontWeight: 600,
              }}
            >
              {weddingConfig.couple.locationCity}, {weddingConfig.couple.locationState}
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => openApp('rsvp')}
              className="btn-luxury"
              style={{
                backgroundColor: 'var(--color-ink-black)',
                color: 'var(--color-warm-ivory)',
                boxShadow: '0 4px 15px rgba(23, 22, 19, 0.25)',
              }}
            >
              <CheckCircle2 size={16} color="var(--color-champagne-gold)" />
              <span>RSVP to Wedding</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => openApp('events')}
              className="btn-luxury"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-espresso)',
                border: '1px solid rgba(41, 37, 31, 0.25)',
              }}
            >
              <Calendar size={16} />
              <span>View Events Schedule</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Small Note */}
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '0.75rem',
            color: 'var(--color-soft-gray)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Ceremony · Cocktails · Dinner · Dancing
        </p>
      </div>
    </AppShell>
  );
};
