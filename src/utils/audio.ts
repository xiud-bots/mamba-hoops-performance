// Synthesizer using Web Audio API for workout countdown & completion beeps
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playBeep(frequency: number = 880, duration: number = 0.12, type: OscillatorType = 'sine'): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Envelope
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('AudioContext beep failed:', e);
  }
}

export function playTimerDone(): void {
  playBeep(587.33, 0.15); // D5
  setTimeout(() => playBeep(880, 0.15), 150); // A5
  setTimeout(() => playBeep(1174.66, 0.35, 'triangle'), 300); // D6
}

export function playTick(): void {
  playBeep(440, 0.08);
}
