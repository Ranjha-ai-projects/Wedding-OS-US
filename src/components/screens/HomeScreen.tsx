import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageCircleHeart,
  Image as ImageIcon,
  CalendarDays,
  MapPin,
  Music2,
  Sparkles,
  CheckCircle2,
  Lock,
  SunMedium,
  Bell,
} from 'lucide-react';
import { StatusBar } from '../os/StatusBar';
import { useOS, type AppId } from '../../context/OSContext';
import { useAudio } from '../../context/AudioContext';
import { weddingConfig } from '../../config/weddingConfig';

interface AppItem {
  id: AppId;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties }>;
}

const APPS: AppItem[] = [
  { id: 'invite', label: 'Invite', icon: Mail },
  { id: 'story', label: 'Story', icon: MessageCircleHeart },
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'places', label: 'Places', icon: MapPin },
  { id: 'music', label: 'Music', icon: Music2 },
  { id: 'attire', label: 'Attire', icon: Sparkles },
  { id: 'rsvp', label: 'RSVP', icon: CheckCircle2 },
];

export const HomeScreen: React.FC = () => {
  const { openApp, lockPhone, rsvpData, badges, openNotificationCenter, performanceProfile } = useOS();
  const isSafe = performanceProfile === 'safe';
  const { isPlaying } = useAudio();

  // Calculate remaining days
  const weddingDate = new Date(weddingConfig.couple.weddingDate);
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const countdownNumber = isNaN(diffDays) ? 32 : (diffDays > 0 ? diffDays : 32);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#171613',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Background Couple Photography with Dark Warm Editorial Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${weddingConfig.heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          transform: isSafe ? 'none' : 'scale(1.02)',
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
          pointerEvents: 'none',
        }}
      />

      {/* Status Bar */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <StatusBar variant="light" />
      </div>

      {/* Main Home Screen Scrollable Content */}
      <div
        className="custom-scroll"
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem 1.25rem 5.5rem 1.25rem',
        }}
      >
        {/* Top Header: Greeting, Couple Names, Date & Quick Toggles */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.4rem' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--color-champagne-gold)',
                letterSpacing: '0.04em',
                fontWeight: 600,
                margin: '0 0 2px 0',
                textTransform: 'uppercase',
              }}
            >
              {weddingConfig.guest.greeting}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.9rem',
                color: 'var(--color-warm-ivory)',
                margin: '0 0 4px 0',
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName}
            </h1>
            <p
              style={{
                fontSize: '0.74rem',
                letterSpacing: '0.18em',
                color: 'var(--color-soft-gray)',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              {weddingConfig.couple.shortDate} — {weddingConfig.couple.locationCity}
            </p>
          </div>

          {/* Quick Actions (Notifications & Lock) */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={openNotificationCenter}
              aria-label="Open Notification Center"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              <Bell size={15} />
            </button>

            <button
              type="button"
              onClick={lockPhone}
              aria-label="Lock Couple OS"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              <Lock size={15} />
            </button>
          </div>
        </div>

        {/* Delicate Weather Pill Easter Egg */}
        <div
          style={{
            alignSelf: 'flex-start',
            marginTop: '0.85rem',
            padding: '4px 10px',
            borderRadius: '16px',
            background: 'rgba(26, 23, 19, 0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.7rem',
            color: 'var(--color-secondary-cream)',
          }}
        >
          <SunMedium size={12} color="var(--color-champagne-gold)" />
          <span style={{ fontWeight: 500 }}>Oct 25 · 72°</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
          <span style={{ color: 'var(--color-champagne-gold)', fontStyle: 'italic' }}>100% chance of marriage</span>
        </div>

        {/* Large Glass Countdown Widget (State-aware for RSVP) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            marginTop: '1.25rem',
            marginBottom: '1.5rem',
            padding: '1.4rem 1.6rem',
            borderRadius: '26px',
            background: isSafe ? 'rgba(26, 23, 19, 0.88)' : 'rgba(26, 23, 19, 0.58)',
            backdropFilter: isSafe ? 'none' : 'blur(20px) saturate(125%)',
            WebkitBackdropFilter: isSafe ? 'none' : 'blur(20px) saturate(125%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle botanical line background illustration */}
          <svg
            style={{
              position: 'absolute',
              right: '-10px',
              bottom: '-25px',
              width: '140px',
              height: '140px',
              opacity: 0.08,
              pointerEvents: 'none',
            }}
            viewBox="0 0 100 100"
            fill="none"
            stroke="var(--color-champagne-gold)"
            strokeWidth="1.2"
          >
            <path d="M50 90 C 45 60, 20 40, 20 20 C 35 20, 48 35, 50 50 C 52 35, 65 20, 80 20 C 80 40, 55 60, 50 90 Z" />
            <path d="M50 90 L 50 15" />
            <path d="M50 45 Q 30 40, 25 30" />
            <path d="M50 60 Q 70 55, 75 45" />
          </svg>

          {/* Left: Large Bodoni Moda Countdown Number */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.8rem, 13vw, 4.8rem)',
                fontWeight: 400,
                color: 'var(--color-warm-ivory)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
              }}
            >
              {countdownNumber}
            </span>
          </div>

          {/* Right: State-Aware Statement */}
          <div style={{ textAlign: 'right', zIndex: 1 }}>
            {rsvpData.completed ? (
              <>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    color: '#A7AD98',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  ✓ YOU’RE COMING
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    color: 'var(--color-warm-ivory)',
                    lineHeight: 1.1,
                  }}
                >
                  Sarah, see you there ♡
                </span>
              </>
            ) : (
              <>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.22em',
                    color: 'var(--color-champagne-gold)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                >
                  DAYS UNTIL
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontStyle: 'italic',
                    color: 'var(--color-warm-ivory)',
                    lineHeight: 1,
                  }}
                >
                  “I do”
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* 8-Tile Couple OS App Grid (4 icons per row) */}
        <div style={{ marginTop: 'auto', marginBottom: '0.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px 12px',
              justifyItems: 'center',
            }}
          >
            {APPS.map((app, index) => {
              const Icon = app.icon;
              const isMusic = app.id === 'music';
              const isRSVP = app.id === 'rsvp';

              // Badges from context
              const unreadCount = app.id === 'story' ? (badges.story || 0) : app.id === 'rsvp' ? (badges.rsvp || 0) : 0;
              const showBadge = unreadCount > 0;
              const showRSVPCheckmark = isRSVP && rsvpData.completed;

              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => openApp(app.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '72px',
                  }}
                >
                  {/* Glass App Tile */}
                  <div
                    style={{
                      position: 'relative',
                      width: '62px',
                      height: '62px',
                      borderRadius: '18px',
                      background: 'rgba(26, 23, 19, 0.65)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isRSVP && !rsvpData.completed ? 'var(--color-champagne-gold)' : 'var(--color-warm-ivory)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={25} strokeWidth={1.4} />

                    {/* Animated waveform on music icon when playing */}
                    {isMusic && isPlaying && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        <motion.div
                          animate={{ height: ['3px', '8px', '3px'] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                          style={{ width: '2px', background: 'var(--color-champagne-gold)', borderRadius: '1px' }}
                        />
                        <motion.div
                          animate={{ height: ['6px', '3px', '6px'] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          style={{ width: '2px', background: 'var(--color-champagne-gold)', borderRadius: '1px' }}
                        />
                        <motion.div
                          animate={{ height: ['4px', '9px', '4px'] }}
                          transition={{ repeat: Infinity, duration: 0.7 }}
                          style={{ width: '2px', background: 'var(--color-champagne-gold)', borderRadius: '1px' }}
                        />
                      </div>
                    )}

                    {/* Contextual unread badge (1) */}
                    {showBadge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                          minWidth: '18px',
                          height: '18px',
                          padding: '0 5px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #c6a56b 0%, #a88752 100%)',
                          color: '#171613',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}

                    {/* Checkmark when RSVP completed */}
                    {showRSVPCheckmark && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-3px',
                          right: '-3px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#747B68',
                          color: '#ffffff',
                          fontSize: '0.65rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  {/* App Label */}
                  <span
                    style={{
                      marginTop: '7px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.9)',
                      letterSpacing: '0.01em',
                      textAlign: 'center',
                    }}
                  >
                    {app.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
