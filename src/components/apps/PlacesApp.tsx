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
      case 'Ceremony': return <MapPin size={14} color="var(--color-champagne-gold)" />;
      case 'Reception': return <GlassWater size={14} color="var(--color-champagne-gold)" />;
      case 'Hotel': return <Building size={14} color="var(--color-champagne-gold)" />;
      case 'Airport': return <Plane size={14} color="var(--color-champagne-gold)" />;
      default: return <MapPin size={14} color="var(--color-champagne-gold)" />;
    }
  };

  return (
    <AppShell title="Places" subtitle="Venues & City Guide">
      <div style={{ padding: '0.8rem 1.25rem 3.5rem 1.25rem' }}>
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: 'var(--color-warm-ivory)',
              margin: '0 0 2px 0',
            }}
          >
            The City That Brought Us Together
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-champagne-gold)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
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
            marginBottom: '1rem',
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
                  background: isActive ? 'var(--color-champagne-gold)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#171613' : 'var(--color-warm-ivory)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  border: isActive ? '1px solid var(--color-champagne-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s ease',
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
                  background: 'rgba(26, 23, 19, 0.75)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
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
                      background: 'linear-gradient(to top, rgba(26, 23, 19, 0.95) 0%, transparent 60%)',
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
                      background: 'rgba(18, 16, 13, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(198, 165, 107, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--color-warm-ivory)',
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
                      color: 'var(--color-warm-ivory)',
                      margin: '0 0 2px 0',
                    }}
                  >
                    {place.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--color-champagne-gold)',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {place.tagline}
                  </p>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {place.address}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-soft-gray)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                    <Clock size={13} color="var(--color-champagne-gold)" />
                    <span>{place.distanceInfo}</span>
                  </div>

                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury btn-luxury-glass"
                    style={{
                      display: 'inline-flex',
                      padding: '0.55rem 1.2rem',
                      fontSize: '0.76rem',
                      letterSpacing: '0.06em',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      minHeight: '38px',
                    }}
                  >
                    <Navigation size={14} color="var(--color-champagne-gold)" />
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
