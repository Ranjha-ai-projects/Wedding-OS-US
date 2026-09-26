import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OSProvider, useOS } from './context/OSContext';
import { AudioProvider } from './context/AudioContext';
import { weddingConfig } from './config/weddingConfig';
import { DesktopWrapper } from './components/os/DesktopWrapper';
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
  const { screenState, activeApp } = useOS();

  useEffect(() => {
    document.title = `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} — Couple OS`;
  }, []);

  return (
    <DesktopWrapper>
      {/* Contextual Notification Drop */}
      <NotificationBanner />

      {/* Couple OS Notification Center */}
      <NotificationCenter />

      {/* Primary OS Screens */}
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {screenState === 'intro' && (
            <motion.div
              key="intro-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%' }}
            >
              <IntroScreen />
            </motion.div>
          )}

          {screenState === 'lock' && (
            <motion.div
              key="lock-screen"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -80, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%' }}
            >
              <LockScreen />
            </motion.div>
          )}

          {screenState === 'home' && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: 1,
                scale: activeApp ? 0.95 : 1,
                filter: activeApp ? 'blur(4px) brightness(0.7)' : 'blur(0px) brightness(1)',
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%' }}
            >
              <HomeScreen />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 8 Primary Applications Over Home Screen */}
        <AnimatePresence>
          {activeApp === 'invite' && <InviteApp key="app-invite" />}
          {activeApp === 'story' && <StoryApp key="app-story" />}
          {activeApp === 'photos' && <PhotosApp key="app-photos" />}
          {activeApp === 'events' && <EventsApp key="app-events" />}
          {activeApp === 'places' && <PlacesApp key="app-places" />}
          {activeApp === 'music' && <MusicApp key="app-music" />}
          {activeApp === 'attire' && <AttireApp key="app-attire" />}
          {activeApp === 'rsvp' && <RSVPApp key="app-rsvp" />}
        </AnimatePresence>
      </div>

      {/* System Home Indicator & Persistent Mini Audio Dock */}
      <BottomNavigation />
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
