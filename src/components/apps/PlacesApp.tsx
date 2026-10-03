import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Building, Plane, GlassWater, Clock } from 'lucide-react';
import { AppShell } from './AppShell';
import { weddingConfig, type PlaceItem } from '../../config/weddingConfig';

export const PlacesApp: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const filters = ['All', 'Ceremony', 'Reception', 'Hotel', 'Airport'];

  const filteredPlaces = activeFilter === 'All'
    ? weddingConfig.places
    : weddingConfig.places.filter((p) => p.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Ceremony': return <MapPin size={14} color="var(--sage)" />;
      case 'Reception': return <GlassWater size={14} color="var(--sage)" />;
      case 'Hotel': return <Building size={14} color="var(--sage)" />;
      case 'Airport': return <Plane size={14} color="var(--sage)" />;
      default: return <MapPin size={14} color="var(--sage)" />;
    }
  };

  return (
    <AppShell title="Places" subtitle="Venues & City Guide">
      <div style={{ padding: '0.8rem 1.25rem 3.5rem 1.25rem' }}>
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--text-primary)',
              margin: '0 0 4px 0',
              fontWeight: 400,
            }}
          >
            The City That Brought Us Together
          </p>
          <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>
            New York, NY · October 2026
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="custom-scroll"
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '1.25rem',
          }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: isActive ? 'var(--sage)' : 'var(--bg-secondary)',
                  color: isActive ? 'var(--bg-primary)' : 'var(--text-primary)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  border: isActive ? '1px solid var(--sage)' : '1px solid var(--border-gold)',
                  boxShadow: isActive ? '0 4px 12px rgba(138, 148, 122, 0.3)' : 'var(--shadow-soft)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Place Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredPlaces.map((place: PlaceItem, index: number) => {
            return (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                style={{
                  borderRadius: '24px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-gold)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{ position: 'relative', height: '145px', width: '100%' }}>
                  <img
                    src={place.imageUrl}
                    alt={place.name}
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
                      background: 'linear-gradient(to top, rgba(242, 234, 223, 0.95) 0%, transparent 60%)',
                    }}
                  />

                  {/* Category Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '14px',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      background: 'rgba(248, 243, 234, 0.92)',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--olive)',
                    }}
                  >
                    {getCategoryIcon(place.category)}
                    <span>{place.category}</span>
                  </div>
                </div>

                <div style={{ padding: '1rem 1.25rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--text-primary)',
                      margin: '0 0 2px 0',
                    }}
                  >
                    {place.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--gold)',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {place.tagline}
                  </p>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {place.address}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                    <Clock size={13} color="var(--gold)" />
                    <span>{place.distanceInfo}</span>
                  </div>

                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury"
                    style={{
                      display: 'inline-flex',
                      padding: '0.55rem 1.2rem',
                      fontSize: '0.76rem',
                      letterSpacing: '0.06em',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      minHeight: '38px',
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      boxShadow: 'var(--shadow-soft)',
                    }}
                  >
                    <Navigation size={14} color="var(--sage)" />
                    <span>Directions in Maps</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
