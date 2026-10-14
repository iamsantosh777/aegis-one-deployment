import { useRef, useState, useCallback, useEffect } from 'react';

export function useAudioAlert() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscillatorsRef = useRef<{ stop: () => void }[]>([]);
  const intervalRef = useRef<number | null>(null);

  const [activeSound, setActiveSound] = useState<'siren' | 'whistle' | 'morse' | 'metronome' | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const stopAll = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    activeOscillatorsRef.current.forEach((item) => {
      try {
        item.stop();
      } catch {
        // Ignored if already stopped
      }
    });
    activeOscillatorsRef.current = [];
    setActiveSound(null);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAll();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopAll]);

  // 1. High-Decibel Two-Tone Siren
  const startSiren = useCallback(() => {
    stopAll();
    const ctx = getAudioContext();
    setActiveSound('siren');

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    gain.gain.setValueAtTime(0.3, ctx.currentTime);

    // Modulate pitch between 750Hz and 1250Hz every 0.6s
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(750, now);

    let isHigh = false;
    intervalRef.current = window.setInterval(() => {
      if (!audioCtxRef.current) return;
      const t = audioCtxRef.current.currentTime;
      osc.frequency.linearRampToValueAtTime(isHigh ? 750 : 1250, t + 0.35);
      isHigh = !isHigh;
    }, 400);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    activeOscillatorsRef.current.push({
      stop: () => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
        } catch {}
      },
    });
  }, [getAudioContext, stopAll]);

  // 2. High-Frequency Rescue Whistle (2800 Hz shrill bursts)
  const startWhistle = useCallback(() => {
    stopAll();
    const ctx = getAudioContext();
    setActiveSound('whistle');

    const triggerBurst = () => {
      if (!audioCtxRef.current) return;
      const t = audioCtxRef.current.currentTime;
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2800, t);

      // Fast attack & decay whistle sound
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.05);
      gain.gain.linearRampToValueAtTime(0.01, t + 0.55);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start(t);
      osc.stop(t + 0.6);
    };

    triggerBurst();
    intervalRef.current = window.setInterval(triggerBurst, 750);
  }, [getAudioContext, stopAll]);

  // 3. SOS Morse Audio (··· --- ···)
  const startMorseSOS = useCallback(() => {
    stopAll();
    const ctx = getAudioContext();
    setActiveSound('morse');

    // Dot: 100ms, Dash: 300ms, Element gap: 100ms, Letter gap: 300ms, Word gap: 700ms
    const dot = 0.1;
    const dash = 0.3;
    const gap = 0.1;

    const playSequence = () => {
      if (!audioCtxRef.current) return;
      let t = audioCtxRef.current.currentTime + 0.05;

      const beep = (duration: number) => {
        const osc = audioCtxRef.current!.createOscillator();
        const gain = audioCtxRef.current!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.35, t + 0.01);
        gain.gain.setValueAtTime(0.35, t + duration - 0.01);
        gain.gain.linearRampToValueAtTime(0, t + duration);

        osc.connect(gain);
        gain.connect(audioCtxRef.current!.destination);
        osc.start(t);
        osc.stop(t + duration);
        t += duration + gap;
      };

      // S: 3 dots
      beep(dot);
      beep(dot);
      beep(dot);
      t += 0.2; // Letter gap

      // O: 3 dashes
      beep(dash);
      beep(dash);
      beep(dash);
      t += 0.2; // Letter gap

      // S: 3 dots
      beep(dot);
      beep(dot);
      beep(dot);
    };

    playSequence();
    intervalRef.current = window.setInterval(playSequence, 3200);
  }, [getAudioContext, stopAll]);

  // 4. CPR Metronome (110 BPM)
  const startCprMetronome = useCallback(() => {
    stopAll();
    const ctx = getAudioContext();
    setActiveSound('metronome');

    const clickIntervalMs = (60 / 110) * 1000; // ~545ms

    const playClick = () => {
      if (!audioCtxRef.current) return;
      const t = audioCtxRef.current.currentTime;
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    };

    playClick();
    intervalRef.current = window.setInterval(playClick, clickIntervalMs);
  }, [getAudioContext, stopAll]);

  return {
    activeSound,
    startSiren,
    startWhistle,
    startMorseSOS,
    startCprMetronome,
    stopAll,
  };
}
