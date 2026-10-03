import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OSProvider, useOS } from './context/OSContext';
import { AudioProvider } from './context/AudioContext';
import { weddingConfig } from './config/weddingConfig';
import { DesktopWrapper } from './components/os/DesktopWrapper';
import { PersistentBackground } from './components/os/PersistentBackground';
import { NotificationBanner } from './components/os/NotificationBanner';
import { NotificationCenter } from './components/os/NotificationCenter';
import { BottomNavigation } from './components/os/BottomNavigation';
import { IntroScreen } from './components/screens/IntroScreen';
import { LockScreen } from './components/screens/LockScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { InviteApp } from './components/apps/InviteApp';
import { StoryApp } from './components/apps/StoryApp';
import { PhotosApp } from './components/apps/PhotosApp';
import { EventsApp } from './components/apps/EventsApp';
import { PlacesApp } from './components/apps/PlacesApp';
import { MusicApp } from './components/apps/MusicApp';
import { AttireApp } from './components/apps/AttireApp';
import { RSVPApp } from './components/apps/RSVPApp';
import './styles/global.css';

const MainOSContent: React.FC = () => {
  const { screenState, activeApp, performanceProfile } = useOS();
  const isSafe = performanceProfile === 'safe';

  useEffect(() => {
    document.title = `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} — Couple OS`;
  }, []);

  return (
    <DesktopWrapper>
      {/* Root Layer 1: Persistent Background (Never unmounts or recreates during app navigation) */}
      <PersistentBackground isSafe={isSafe} />

      {/* Root Layer 2: Screen Stage */}
      <div
        className="couple-os-stage"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          zIndex: 10,
        }}
      >
        {/* Layer 1: Home Screen (Persistent Foundation) */}
        <motion.div
          key="home-screen-layer"
          initial={false}
          animate={{
            scale: activeApp ? (isSafe ? 0.99 : 0.96) : 1,
          }}
          transition={{ duration: isSafe ? 0.28 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <HomeScreen />

          {/* GPU-accelerated backdrop dimmer */}
          <motion.div
            initial={false}
            animate={{ opacity: activeApp ? (isSafe ? 0.48 : 0.42) : 0 }}
            transition={{ duration: isSafe ? 0.25 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000000',
              pointerEvents: activeApp ? 'auto' : 'none',
              zIndex: 15,
            }}
          />
        </motion.div>

        {/* Layer 2: 8 Primary Applications Over Home Screen */}
        <AnimatePresence mode="sync">
          {activeApp && (
            <div
              key={`active-app-wrapper-${activeApp}`}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 25,
                transform: 'translateZ(0)',
              }}
            >
              {activeApp === 'invite' && <InviteApp />}
              {activeApp === 'story' && <StoryApp />}
              {activeApp === 'photos' && <PhotosApp />}
              {activeApp === 'events' && <EventsApp />}
              {activeApp === 'places' && <PlacesApp />}
              {activeApp === 'music' && <MusicApp />}
              {activeApp === 'attire' && <AttireApp />}
              {activeApp === 'rsvp' && <RSVPApp />}
            </div>
          )}
        </AnimatePresence>

        {/* Layer 3: Lock Screen (Top Cover Layer) */}
        <AnimatePresence>
          {screenState === 'lock' && (
            <motion.div
              key="lock-screen-overlay"
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: '-100%',
                opacity: isSafe ? 1 : 0,
                transition: { duration: isSafe ? 0.38 : 0.45, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 40,
                backgroundColor: '#171613',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              <LockScreen />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 4: Intro Screen (First-Run / Replay Overlay) */}
        <AnimatePresence>
          {screenState === 'intro' && (
            <motion.div
              key="intro-screen-overlay"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 50,
                backgroundColor: '#171613',
                transform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              <IntroScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Root Layer 3: System Overlay Layer */}
      <div
        className="system-overlay-layer"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 80,
        }}
      >
        {/* Contextual Notification Drop */}
        <NotificationBanner />

        {/* Couple OS Notification Center */}
        <NotificationCenter />

        {/* System Home Indicator & Persistent Mini Audio Dock */}
        <BottomNavigation />
      </div>
    </DesktopWrapper>
  );
};

export const App: React.FC = () => {
  return (
    <OSProvider>
      <AudioProvider>
        <MainOSContent />
      </AudioProvider>
    </OSProvider>
  );
};

export default App;
