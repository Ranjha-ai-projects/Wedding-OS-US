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
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            borderRadius: '28px',
            padding: '2.5rem 1.75rem 2.25rem 1.75rem',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-gold)',
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
              border: '1px solid rgba(184, 146, 83, 0.28)',
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
              border: '1px solid var(--gold)',
              background: 'rgba(248, 243, 234, 0.65)',
              marginBottom: '1.5rem',
              color: 'var(--gold)',
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
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
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
              color: 'var(--text-primary)',
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
              color: 'var(--gold)',
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
              color: 'var(--text-primary)',
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
              color: 'var(--text-secondary)',
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
              borderTop: '1px solid rgba(184, 146, 83, 0.3)',
              borderBottom: '1px solid rgba(184, 146, 83, 0.3)',
              marginBottom: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: 'var(--text-primary)',
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
                color: 'var(--gold)',
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
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <CheckCircle2 size={16} color="var(--gold)" />
              <span>RSVP to Wedding</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => openApp('events')}
              className="btn-luxury"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid rgba(184, 146, 83, 0.35)',
              }}
            >
              <Calendar size={16} color="var(--sage)" />
              <span>View Events Schedule</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Small Note */}
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Ceremony · Cocktails · Dinner · Dancing
        </p>
      </div>
    </AppShell>
  );
};
