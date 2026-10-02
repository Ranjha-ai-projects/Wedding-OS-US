import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { weddingConfig } from '../config/weddingConfig';

export type ScreenState = 'intro' | 'lock' | 'home';

export type AppId = 
  | 'invite'
  | 'story'
  | 'photos'
  | 'events'
  | 'places'
  | 'music'
  | 'attire'
  | 'rsvp';

export interface RSVPData {
  attending: boolean | null;
  plusOne: boolean;
  plusOneName?: string;
  dietary: string;
  songRequest: string;
  completed: boolean;
}

export type NotificationStatus = 'PENDING' | 'ELIGIBLE' | 'QUEUED' | 'DISPLAYED' | 'READ' | 'DISMISSED' | 'CANCELLED';

export interface SystemNotification {
  id: string;
  sender: string;
  avatarText?: string;
  title?: string;
  text: string;
  time: string;
  actionApp?: AppId;
  priority: number; // 1: high (user feedback), 2: rsvp, 3: story, 4: discovery
  status: NotificationStatus;
  sessionKey: string;
}

interface OSContextType {
  screenState: ScreenState;
  activeApp: AppId | null;
  activeNotification: SystemNotification | null;
  notificationHistory: SystemNotification[];
  isNotificationCenterOpen: boolean;
  badges: Record<string, number>;
  rsvpData: RSVPData;
  openedAppsCount: number;
  livePillExpanded: boolean;
  
  // Actions
  acceptInvite: () => void;
  declineInvite: () => void;
  unlockPhone: () => void;
  lockPhone: () => void;
  openApp: (appId: AppId) => void;
  closeApp: () => void;
  dismissNotification: () => void;
  openNotificationCenter: () => void;
  closeNotificationCenter: () => void;
  toggleLivePillExpanded: () => void;
  updateRSVP: (data: Partial<RSVPData>) => void;
  resetRSVP: () => void;
  replayIntro: () => void;
  hasSeenIntro: boolean;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const RSVP_STORAGE_KEY = 'couple_os_rsvp_sarah';
const SEEN_INTRO_KEY = 'couple_os_seen_intro';

// Session Storage keys for idempotent notification guards
const SESSION_WELCOME_KEY = 'coupleOS.notification.welcome.shown';
export const SESSION_MESSAGE_INTRO_KEY = 'coupleOS.notification.messageIntro.shown';
const SESSION_RSVP_REMINDER_KEY = 'coupleOS.notification.rsvpReminder.shown';

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(() => {
    return localStorage.getItem(SEEN_INTRO_KEY) === 'true';
  });

  const [screenState, setScreenState] = useState<ScreenState>(() => {
    return localStorage.getItem(SEEN_INTRO_KEY) === 'true' ? 'lock' : 'intro';
  });

  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [livePillExpanded, setLivePillExpanded] = useState(false);

  // App badges: story unread, rsvp unread
  const [badges, setBadges] = useState<Record<string, number>>(() => {
    const storySeen = sessionStorage.getItem('coupleOS.badge.story.cleared') === 'true';
    const rsvpDone = localStorage.getItem(RSVP_STORAGE_KEY) ? JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY)!).completed : false;
    return {
      story: storySeen ? 0 : 1,
      rsvp: rsvpDone ? 0 : 1,
    };
  });

  // Track unique opened apps for engagement milestone
  const [openedApps, setOpenedApps] = useState<Set<AppId>>(new Set());

  // RSVP persistent state
  const [rsvpData, setRsvpData] = useState<RSVPData>(() => {
    try {
      const saved = localStorage.getItem(RSVP_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      attending: null,
      plusOne: true,
      plusOneName: '',
      dietary: '',
      songRequest: '',
      completed: false,
    };
  });

  // Notification Queue & Active Banner
  const [activeNotification, setActiveNotification] = useState<SystemNotification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<SystemNotification[]>([]);
  const [notificationHistory, setNotificationHistory] = useState<SystemNotification[]>(() => {
    // Initial system history for Notification Center
    return [
      {
        id: 'cal-event',
        sender: 'Calendar',
        avatarText: '📅',
        title: 'Wedding Day',
        text: `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} Wedding · ${weddingConfig.couple.shortDate}`,
        time: weddingConfig.couple.shortDate,
        actionApp: 'events',
        priority: 4,
        status: 'READ',
        sessionKey: 'coupleOS.notification.cal.history',
      },
      {
        id: 'music-intro',
        sender: 'Soundtrack',
        avatarText: '♪',
        title: 'New Track',
        text: `${weddingConfig.couple.brideName} added “${weddingConfig.soundtrack[0]?.title || 'Until I Found You'}” to Our Soundtrack`,
        time: 'Yesterday',
        actionApp: 'music',
        priority: 4,
        status: 'READ',
        sessionKey: 'coupleOS.notification.music.history',
      },
    ];
  });

  // Cooldown tracker: timestamp when last unsolicited notification was closed
  const lastBannerDismissedAt = useRef<number>(0);
  const activeAppRef = useRef<AppId | null>(activeApp);
  activeAppRef.current = activeApp;

  // Persist RSVP data
  useEffect(() => {
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvpData));
    if (rsvpData.completed) {
      setBadges((prev) => ({ ...prev, rsvp: 0 }));
    }
  }, [rsvpData]);

  // Enqueue notification with priority & deduplication
  const enqueueNotification = useCallback((notification: Omit<SystemNotification, 'status'>) => {
    // Guard: already shown in this browser session?
    if (sessionStorage.getItem(notification.sessionKey) === 'true') {
      return;
    }

    setNotificationQueue((prev) => {
      // Check if already in queue or currently active
      if (prev.some((n) => n.id === notification.id) || activeNotification?.id === notification.id) {
        return prev;
      }

      const newNotif: SystemNotification = { ...notification, status: 'QUEUED' };
      // Sort by priority (1 is highest)
      const updated = [...prev, newNotif].sort((a, b) => a.priority - b.priority);
      return updated;
    });
  }, [activeNotification]);

  // Queue consumer with cooldown & app-context suppression
  useEffect(() => {
    if (activeNotification) return;
    if (notificationQueue.length === 0) return;

    const nextNotification = notificationQueue[0];

    // Suppress notification if user is currently inside destination app
    if (activeAppRef.current && activeAppRef.current === nextNotification.actionApp) {
      // Discard or mark as read without showing banner
      setNotificationQueue((prev) => prev.slice(1));
      sessionStorage.setItem(nextNotification.sessionKey, 'true');
      return;
    }

    // Check 6s cooldown between unsolicited notifications
    const now = Date.now();
    const timeSinceLast = now - lastBannerDismissedAt.current;
    const cooldownNeeded = 6000;

    const showNext = () => {
      setNotificationQueue((prev) => prev.slice(1));
      setActiveNotification({ ...nextNotification, status: 'DISPLAYED' });
      // Immediately mark as shown in sessionStorage to prevent any remount duplicates
      sessionStorage.setItem(nextNotification.sessionKey, 'true');

      // Also append to Notification Center history
      setNotificationHistory((prev) => {
        if (prev.some((h) => h.id === nextNotification.id)) return prev;
        return [nextNotification, ...prev];
      });
    };

    if (timeSinceLast >= cooldownNeeded) {
      showNext();
    } else {
      const waitTimer = setTimeout(showNext, cooldownNeeded - timeSinceLast);
      return () => clearTimeout(waitTimer);
    }
  }, [activeNotification, notificationQueue]);

  // Auto-dismiss active notification after 5 seconds
  useEffect(() => {
    if (!activeNotification) return;

    const autoDismiss = setTimeout(() => {
      dismissNotification();
    }, 5500);

    return () => clearTimeout(autoDismiss);
  }, [activeNotification]);

  // Trigger 1: Welcome notification on unlock completed (once per session)
  const handleUnlockCompleted = useCallback(() => {
    if (sessionStorage.getItem(SESSION_WELCOME_KEY) !== 'true') {
      enqueueNotification({
        id: 'welcome-notification',
        sender: `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}`,
        avatarText: '♡',
        title: 'Couple OS',
        text: `${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName} shared their wedding with you`,
        time: 'now',
        actionApp: 'invite',
        priority: 1,
        sessionKey: SESSION_WELCOME_KEY,
      });
    }
  }, [enqueueNotification]);

  // Trigger 2: Engagement milestone (RSVP reminder after 2 apps opened)
  useEffect(() => {
    if (screenState !== 'home') return;
    if (rsvpData.completed) return;
    if (sessionStorage.getItem(SESSION_RSVP_REMINDER_KEY) === 'true') return;

    // Trigger ONLY if user has opened at least 2 meaningful apps
    if (openedApps.size >= 2) {
      enqueueNotification({
        id: 'rsvp-reminder',
        sender: weddingConfig.couple.groomName,
        avatarText: weddingConfig.couple.groomName.charAt(0),
        title: 'RSVP Reminder',
        text: `Hey ${weddingConfig.guest.name}, don’t forget to RSVP! Can’t wait to celebrate 🥂`,
        time: 'now',
        actionApp: 'rsvp',
        priority: 2,
        sessionKey: SESSION_RSVP_REMINDER_KEY,
      });
    }
  }, [openedApps.size, screenState, rsvpData.completed, enqueueNotification]);

  // If user opens RSVP, cancel any queued or future RSVP reminders
  useEffect(() => {
    if (activeApp === 'rsvp' || rsvpData.completed) {
      sessionStorage.setItem(SESSION_RSVP_REMINDER_KEY, 'true');
      setNotificationQueue((prev) => prev.filter((n) => n.id !== 'rsvp-reminder'));
      if (activeNotification?.id === 'rsvp-reminder') {
        setActiveNotification(null);
      }
    }
  }, [activeApp, rsvpData.completed, activeNotification]);

  const acceptInvite = () => {
    localStorage.setItem(SEEN_INTRO_KEY, 'true');
    setHasSeenIntro(true);
    setScreenState('lock');
  };

  const declineInvite = () => {
    alert(`${weddingConfig.couple.brideName} & ${weddingConfig.couple.groomName}: "We will miss you! But you can still explore our story whenever you wish."`);
    setScreenState('lock');
  };

  const lastAppNavTime = useRef<number>(0);

  const unlockPhone = useCallback(() => {
    setScreenState('home');
    handleUnlockCompleted();
  }, [handleUnlockCompleted]);

  const lockPhone = useCallback(() => {
    setActiveApp(null);
    setIsNotificationCenterOpen(false);
    setScreenState('lock');
  }, []);

  const openApp = useCallback((appId: AppId) => {
    const now = Date.now();
    if (activeAppRef.current === appId && now - lastAppNavTime.current < 450) {
      return;
    }
    lastAppNavTime.current = now;

    setActiveApp(appId);
    setOpenedApps((prev) => new Set(prev).add(appId));

    // Clear Story badge once opened and persist for session
    if (appId === 'story') {
      setBadges((prev) => ({ ...prev, story: 0 }));
      sessionStorage.setItem('coupleOS.badge.story.cleared', 'true');
    }

    // Dismiss active banner if it pointed to this app
    if (activeNotification?.actionApp === appId) {
      dismissNotification();
    }
    setIsNotificationCenterOpen(false);
  }, [activeNotification]);

  const closeApp = useCallback(() => {
    const now = Date.now();
    if (activeAppRef.current === null && now - lastAppNavTime.current < 350) {
      return;
    }
    lastAppNavTime.current = now;
    setActiveApp(null);
  }, []);

  const dismissNotification = () => {
    lastBannerDismissedAt.current = Date.now();
    setActiveNotification(null);
  };

  const openNotificationCenter = () => {
    setIsNotificationCenterOpen(true);
  };

  const closeNotificationCenter = () => {
    setIsNotificationCenterOpen(false);
  };

  const toggleLivePillExpanded = () => {
    setLivePillExpanded((prev) => !prev);
  };

  const updateRSVP = (data: Partial<RSVPData>) => {
    if (data.completed) {
      sessionStorage.setItem('coupleOS.rsvpPill.active', 'true');
    }
    setRsvpData((prev) => ({ ...prev, ...data }));
  };

  const resetRSVP = () => {
    sessionStorage.removeItem('coupleOS.rsvpPill.active');
    setRsvpData({
      attending: null,
      plusOne: true,
      plusOneName: '',
      dietary: '',
      songRequest: '',
      completed: false,
    });
    localStorage.removeItem(RSVP_STORAGE_KEY);
    setBadges((prev) => ({ ...prev, rsvp: 1 }));
    sessionStorage.removeItem(SESSION_RSVP_REMINDER_KEY);
  };

  const replayIntro = () => {
    setActiveApp(null);
    setIsNotificationCenterOpen(false);
    setScreenState('intro');
  };

  return (
    <OSContext.Provider
      value={{
        screenState,
        activeApp,
        activeNotification,
        notificationHistory,
        isNotificationCenterOpen,
        badges,
        rsvpData,
        openedAppsCount: openedApps.size,
        livePillExpanded,
        acceptInvite,
        declineInvite,
        unlockPhone,
        lockPhone,
        openApp,
        closeApp,
        dismissNotification,
        openNotificationCenter,
        closeNotificationCenter,
        toggleLivePillExpanded,
        updateRSVP,
        resetRSVP,
        replayIntro,
        hasSeenIntro,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
