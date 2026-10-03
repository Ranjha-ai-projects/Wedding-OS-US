import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { AppShell } from './AppShell';
import { useOS } from '../../context/OSContext';
import { weddingConfig, type PhotoItem } from '../../config/weddingConfig';
import { getMergedPhotos } from '../../utils/assetLoader';

export const PhotosApp: React.FC = () => {
  const { performanceProfile } = useOS();
  const isSafe = performanceProfile === 'safe';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Combine user-defined photos with any image dropped into public/assets/gallery/
  const allPhotos = getMergedPhotos(weddingConfig.photos);

  const dynamicCategories = Array.from(new Set(['All', ...weddingConfig.photoCategories, ...allPhotos.map((p) => p.category)]));
  const categories = dynamicCategories;

  const filteredPhotos = selectedCategory === 'All'
    ? allPhotos
    : allPhotos.filter((p) => p.category === selectedCategory);

  const handleNextStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (storyIndex !== null && allPhotos.length > 0) {
      setStoryIndex((storyIndex + 1) % allPhotos.length);
    }
  };

  const handlePrevStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (storyIndex !== null && allPhotos.length > 0) {
      setStoryIndex((storyIndex - 1 + allPhotos.length) % allPhotos.length);
    }
  };

  const coupleSubtitle = `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`;

  return (
    <AppShell title="Photos" subtitle={coupleSubtitle}>
      <div style={{ padding: '0.75rem 1.25rem 3rem 1.25rem' }}>
        {/* Large "Memory" Card */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setStoryIndex(0)}
          style={{
            position: 'relative',
            width: '100%',
            height: '190px',
            borderRadius: '26px',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
          }}
        >
          <img
            src={allPhotos[0]?.url || weddingConfig.heroPhoto}
            alt="Memory story cover"
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
              background: 'linear-gradient(to top, rgba(18, 16, 13, 0.9) 0%, rgba(18, 16, 13, 0.2) 60%, rgba(18, 16, 13, 0.5) 100%)',
            }}
          />

          {/* Memory Tag & Play Pill */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.7rem',
              color: 'var(--color-champagne-gold)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={12} />
            <span>Featured Memory</span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  color: 'var(--color-warm-ivory)',
                  margin: '0 0 2px 0',
                  lineHeight: 1.1,
                }}
              >
                {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName}
              </p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-secondary-cream)' }}>
                4 Years Together · Tap to Play Story
              </p>
            </div>

            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--color-champagne-gold)',
                color: '#171613',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(198, 165, 107, 0.4)',
              }}
            >
              <Play size={18} fill="#171613" style={{ marginLeft: '2px' }} />
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
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
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
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
                {cat}
              </button>
            );
          })}
        </div>

        {/* Photo Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}
        >
          {filteredPhotos.map((photo, pIdx) => {
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: pIdx * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActivePhoto(photo)}
                style={{
                  position: 'relative',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  aspectRatio: pIdx % 3 === 0 ? '3/4' : '1/1',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: '#201b15',
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
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
                    background: 'linear-gradient(to top, rgba(18, 16, 13, 0.8) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-warm-ivory)',
                      lineHeight: 1.2,
                    }}
                  >
                    {photo.title}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-champagne-gold)' }}>
                    {photo.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Single Photo Detail Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 100,
              backgroundColor: '#171613',
              backdropFilter: isSafe ? 'none' : 'blur(20px)',
              WebkitBackdropFilter: isSafe ? 'none' : 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
            }}
            onClick={() => setActivePhoto(null)}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo"
              style={{
                position: 'absolute',
                top: 'calc(max(1rem, env(safe-area-inset-top)) + 10px)',
                right: '1rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '420px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
                background: '#171613',
              }}
            >
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                style={{
                  width: '100%',
                  maxHeight: '60vh',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ padding: '1.25rem 1.4rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    color: 'var(--color-warm-ivory)',
                    margin: '0 0 4px 0',
                  }}
                >
                  {activePhoto.title}
                </p>
                {activePhoto.caption && (
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-secondary-cream)', lineHeight: 1.4 }}>
                    {activePhoto.caption}
                  </p>
                )}
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    fontSize: '0.72rem',
                    color: 'var(--color-champagne-gold)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {activePhoto.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Photo Story / Slideshow Modal */}
      <AnimatePresence>
        {storyIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 110,
              backgroundColor: '#171613',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            {/* Story Top Progress Bars */}
            <div
              style={{
                position: 'absolute',
                top: 'max(0.75rem, env(safe-area-inset-top))',
                left: '12px',
                right: '12px',
                display: 'flex',
                gap: '4px',
                zIndex: 20,
              }}
            >
              {allPhotos.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '3px',
                    borderRadius: '2px',
                    background: i <= storyIndex ? 'var(--color-champagne-gold)' : 'rgba(255, 255, 255, 0.25)',
                    transition: 'background 0.3s ease',
                  }}
                />
              ))}
            </div>

            {/* Story Header */}
            <div
              style={{
                position: 'absolute',
                top: 'calc(max(0.75rem, env(safe-area-inset-top)) + 14px)',
                left: '16px',
                right: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 20,
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-warm-ivory)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {weddingConfig.couple.brideName} &amp; {weddingConfig.couple.groomName}
                </p>
                <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--color-champagne-gold)' }}>
                  {storyIndex + 1} of {allPhotos.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStoryIndex(null)}
                aria-label="Close slideshow"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Story Active Image */}
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={allPhotos[storyIndex].url}
                alt={allPhotos[storyIndex].title}
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
                  background: 'linear-gradient(to top, rgba(18, 16, 13, 0.8) 0%, transparent 40%, rgba(18, 16, 13, 0.4) 100%)',
                }}
              />

              {/* Tap left / right navigation triggers */}
              <div
                onClick={handlePrevStory}
                style={{
                  position: 'absolute',
                  top: '60px',
                  bottom: '100px',
                  left: 0,
                  width: '35%',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              />
              <div
                onClick={handleNextStory}
                style={{
                  position: 'absolute',
                  top: '60px',
                  bottom: '100px',
                  right: 0,
                  width: '65%',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              />

              {/* Bottom Caption */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'calc(max(1.5rem, env(safe-area-inset-bottom)) + 20px)',
                  left: '20px',
                  right: '20px',
                  zIndex: 20,
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--color-warm-ivory)',
                    margin: '0 0 6px 0',
                  }}
                >
                  {allPhotos[storyIndex].title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-secondary-cream)', fontStyle: 'italic' }}>
                  {allPhotos[storyIndex].caption}
                </p>

                {/* Arrow hint controls */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={handlePrevStory}
                    aria-label="Previous story photo"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStory}
                    aria-label="Next story photo"
                    style={{ color: 'var(--color-champagne-gold)' }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
};
