import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { weddingConfig, type SongTrack } from '../config/weddingConfig';
import { getActiveSoundtrack } from '../utils/assetLoader';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: SongTrack;
  currentTime: number;
  duration: number;
  playlist: SongTrack[];
  togglePlay: () => void;
  playTrack: (track: SongTrack) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (percentage: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Play ONLY the songs placed in the songs folder!
  const playlist = getActiveSoundtrack(weddingConfig.soundtrack);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(180);

  const currentTrack = playlist[currentTrackIndex] || playlist[0] || {
    id: 'fallback-track',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    label: 'Our first-date song',
    duration: '2:57',
  };

  // HTML5 Audio element reference for real audio files
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio synth state for fallback warm acoustic ambient romantic melody
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Play acoustic warm guitar / Rhodes chord sequence (fallback synth)
  const startSynth = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Romantic chord progressions in D major: D - F#m - G - A
      const scaleNotes = [
        [293.66, 369.99, 440.00, 587.33], // D major
        [369.99, 440.00, 554.37, 739.99], // F# minor
        [392.00, 493.88, 587.33, 783.99], // G major
        [440.00, 554.37, 659.25, 880.00], // A major
        [246.94, 293.66, 369.99, 493.88], // B minor
        [392.00, 493.88, 587.33, 783.99], // G major
        [293.66, 369.99, 440.00, 587.33], // D major
        [440.00, 554.37, 659.25, 880.00], // A major
      ];

      let chordIdx = 0;
      let noteIdx = 0;

      const playNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const noteCtx = audioCtxRef.current;
        const currentChord = scaleNotes[chordIdx % scaleNotes.length];
        const freq = currentChord[noteIdx % currentChord.length];

        const osc = noteCtx.createOscillator();
        const noteGain = noteCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteCtx.currentTime);

        noteGain.gain.setValueAtTime(0.001, noteCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.06, noteCtx.currentTime + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteCtx.currentTime + 1.2);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(noteCtx.currentTime);
        osc.stop(noteCtx.currentTime + 1.25);

        noteIdx++;
        if (noteIdx % 4 === 0) {
          chordIdx++;
        }
      };

      synthTimerRef.current = window.setInterval(playNote, 320);
    } catch (e) {
      console.warn('AudioContext not allowed yet', e);
    }
  };

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.2);
      } catch {
        // ignore
      }
    }
  };

  // Synchronize playback between HTMLAudioElement and Synthesizer fallback
  useEffect(() => {
    const hasAudioFile = Boolean(currentTrack.audioUrl);

    if (hasAudioFile) {
      stopSynth();

      if (!audioElementRef.current) {
        audioElementRef.current = new Audio();
      }

      const audio = audioElementRef.current;
      const targetSrc = currentTrack.audioUrl || '';
      if (!audio.src.includes(targetSrc)) {
        audio.src = targetSrc;
      }

      const handleLoadedMetadata = () => {
        if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
          setTrackDuration(Math.floor(audio.duration));
        }
      };

      const handleTimeUpdate = () => {
        setCurrentTime(Math.floor(audio.currentTime));
      };

      const handleEnded = () => {
        nextTrack();
      };

      const handleError = () => {
        console.warn('Audio file error, falling back to ambient acoustic melody');
        if (isPlaying) {
          startSynth();
        }
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      if (isPlaying) {
        audio.play().catch(() => {
          // Autoplay policy or format error: fallback to synth
          startSynth();
        });
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.pause();
      };
    } else {
      // No audio file specified -> use acoustic synth
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }

      let timer: number;
      if (isPlaying) {
        startSynth();
        timer = window.setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= trackDuration) {
              nextTrack();
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      } else {
        stopSynth();
      }

      return () => {
        clearInterval(timer);
        stopSynth();
      };
    }
  }, [isPlaying, currentTrackIndex, currentTrack.audioUrl]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const playTrack = (track: SongTrack) => {
    const idx = playlist.findIndex((s) => s.id === track.id);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  const seek = (percentage: number) => {
    const target = Math.floor((percentage / 100) * trackDuration);
    setCurrentTime(target);
    if (audioElementRef.current && currentTrack.audioUrl) {
      audioElementRef.current.currentTime = target;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTime,
        duration: trackDuration,
        playlist,
        togglePlay,
        playTrack,
        nextTrack,
        prevTrack,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
