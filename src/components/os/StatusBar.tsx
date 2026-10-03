import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';
import { useOS } from '../../context/OSContext';

interface StatusBarProps {
  variant?: 'light' | 'dark';
}

export const StatusBar: React.FC<StatusBarProps> = ({ variant = 'dark' }) => {
  const { openNotificationCenter } = useOS();
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${hours}:${formattedMinutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const textColor = variant === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'var(--text-primary)';

  return (
    <header
      role="banner"
      aria-label="System status bar"
      style={{
        width: '100%',
        padding: '0.5rem 1.25rem 0.25rem 1.25rem',
        paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: textColor,
        fontSize: '0.82rem',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        zIndex: 50,
        userSelect: 'none',
      }}
    >
      {/* Dynamic Time - tap to pull down Notification Center */}
      <button
        type="button"
        onClick={openNotificationCenter}
        aria-label="Open Notification Center"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'inherit',
          cursor: 'pointer',
          padding: '2px 6px',
          borderRadius: '8px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>{time}</span>
      </button>

      {/* Clean center space */}
      <div style={{ flex: 1 }} />

      {/* Right System Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <Signal size={13} strokeWidth={2.2} />
        <Wifi size={13} strokeWidth={2.2} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <BatteryMedium size={15} strokeWidth={2} />
        </div>
      </div>
    </header>
  );
};
