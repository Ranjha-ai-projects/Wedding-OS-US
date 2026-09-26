import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Download, ExternalLink } from 'lucide-react';
import { AppShell } from './AppShell';
import { weddingConfig, type WeddingEvent } from '../../config/weddingConfig';

export const EventsApp: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const { couple, events } = weddingConfig;
  const weddingDateObj = new Date(couple.weddingDate);
  const year = isNaN(weddingDateObj.getFullYear()) ? 2026 : weddingDateObj.getFullYear();
  const month = isNaN(weddingDateObj.getMonth()) ? 9 : weddingDateObj.getMonth();
  const weddingDayNumber = isNaN(weddingDateObj.getDate()) ? 25 : weddingDateObj.getDate();
  const monthName = weddingDateObj.toLocaleString('en-US', { month: 'long' });

  const primaryEvent = events[0] || {
    venue: 'The Glasshouse',
    address: '660 12th Avenue',
    city: `${couple.locationCity}, ${couple.locationState}`,
    time: '4:00 PM',
  };

  // Generate .ics calendar download
  const handleDownloadICS = () => {
    const summary = `${couple.brideName} & ${couple.groomName} Wedding`;
    const description = `Celebrating the marriage of ${couple.brideName} & ${couple.groomName} at ${primaryEvent.venue}, ${primaryEvent.city}.`;
    const location = `${primaryEvent.venue}, ${primaryEvent.address}, ${primaryEvent.city}`;
    const fileSlug = `${couple.brideName}-and-${couple.groomName}-Wedding`.replace(/[^a-zA-Z0-9-]/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//Couple OS//${couple.brideName} and ${couple.groomName} Wedding//EN`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${fileSlug.toLowerCase()}@couple-os.wedlio`,
      'DTSTART:20261025T200000Z',
      'DTEND:20261026T040000Z',
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileSlug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  // Google Calendar Link
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${couple.brideName} & ${couple.groomName} Wedding`
  )}&details=${encodeURIComponent(
    `Celebrating the wedding of ${couple.brideName} & ${couple.groomName} at ${primaryEvent.venue}, ${primaryEvent.city}. Ceremony starts at ${primaryEvent.time}.`
  )}&location=${encodeURIComponent(`${primaryEvent.venue}, ${primaryEvent.address}, ${primaryEvent.city}`)}`;

  // Dynamic calendar days for wedding month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOffset = new Date(year, month, 1).getDay();

  const calendarGrid = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarGrid.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day);
  }

  return (
    <AppShell title="Events" subtitle={`${couple.brideName} & ${couple.groomName}`}>
      <div style={{ padding: '0.8rem 1.25rem 3.5rem 1.25rem' }}>
        {/* Subheading */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: 'var(--color-warm-ivory)',
              margin: '0 0 2px 0',
            }}
          >
            Let’s make it unforgettable.
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {couple.displayDate}
          </p>
        </div>

        {/* Dynamic Mini Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '1.2rem 1.2rem 1.4rem 1.2rem',
            borderRadius: '24px',
            background: 'rgba(26, 23, 19, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: 'var(--color-warm-ivory)',
              }}
            >
              {monthName} {year}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                color: 'var(--color-champagne-gold)',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {couple.locationCity}, {couple.locationState}
            </span>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '6px' }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((wd, i) => (
              <span key={i} style={{ fontSize: '0.68rem', color: 'var(--color-soft-gray)', fontWeight: 600 }}>
                {wd}
              </span>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
            {calendarGrid.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} style={{ height: '30px' }} />;
              }

              const isWeddingDay = day === weddingDayNumber;

              return (
                <div
                  key={`day-${day}`}
                  style={{
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {isWeddingDay ? (
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c6a56b 0%, #a88752 100%)',
                        color: '#171613',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 14px rgba(198, 165, 107, 0.6)',
                      }}
                    >
                      25
                    </motion.div>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: 'rgba(255, 255, 255, 0.75)',
                      }}
                    >
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add to Calendar Actions Bar */}
          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <button
              type="button"
              onClick={handleDownloadICS}
              className="btn-luxury btn-luxury-glass"
              style={{
                flex: 1,
                fontSize: '0.74rem',
                letterSpacing: '0.04em',
                padding: '0.65rem 0.5rem',
                minHeight: '40px',
                borderRadius: '14px',
              }}
            >
              <Download size={14} color="var(--color-champagne-gold)" />
              <span>{downloaded ? 'Saved! ✓' : 'Apple / iCal'}</span>
            </button>

            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-luxury-glass"
              style={{
                flex: 1,
                fontSize: '0.74rem',
                letterSpacing: '0.04em',
                padding: '0.65rem 0.5rem',
                minHeight: '40px',
                borderRadius: '14px',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={14} color="var(--color-champagne-gold)" />
              <span>Google Cal</span>
            </a>
          </div>
        </motion.div>

        {/* Detailed Event Cards Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {weddingConfig.events.map((evt: WeddingEvent, index: number) => {
            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  borderRadius: '24px',
                  background: 'rgba(26, 23, 19, 0.72)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
                }}
              >
                {/* Event Image */}
                <div style={{ position: 'relative', height: '140px', width: '100%' }}>
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(26, 23, 19, 0.95) 0%, transparent 60%)',
                    }}
                  />

                  {/* Time Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '14px',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      background: 'rgba(18, 16, 13, 0.75)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(198, 165, 107, 0.4)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--color-champagne-gold)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {evt.time} {evt.endTime && `– ${evt.endTime}`}
                  </div>
                </div>

                {/* Event Details */}
                <div style={{ padding: '1.1rem 1.25rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--color-warm-ivory)',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {evt.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-champagne-gold)', fontSize: '0.82rem', marginBottom: '8px' }}>
                    <MapPin size={14} />
                    <span style={{ fontWeight: 600 }}>{evt.venue}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                    <span style={{ color: 'var(--color-soft-gray)' }}>{evt.city}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.45,
                      margin: '0 0 1rem 0',
                    }}
                  >
                    {evt.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={evt.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury btn-luxury-glass"
                      style={{
                        padding: '0.55rem 1rem',
                        fontSize: '0.75rem',
                        letterSpacing: '0.06em',
                        borderRadius: '14px',
                        textDecoration: 'none',
                        minHeight: '38px',
                      }}
                    >
                      <MapPin size={14} color="var(--color-champagne-gold)" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
