export class AudioService {
  private static instance: AudioService;
  private audioContext: AudioContext | null = null;

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeAudioContext();
    }
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  async playPronunciation(text: string, lang: string = 'zh-CN'): Promise<void> {
    if ('speechSynthesis' in window) {
      return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => resolve();
        utterance.onerror = (error) => reject(error);

        const voices = speechSynthesis.getVoices();
        const chineseVoice = voices.find(voice => 
          voice.lang.includes('zh') || voice.lang.includes('chinese')
        );
        
        if (chineseVoice) {
          utterance.voice = chineseVoice;
        }

        speechSynthesis.speak(utterance);
      });
    } else {
      console.warn('Speech synthesis not supported');
      throw new Error('Speech synthesis not supported');
    }
  }

  generateBeepSound(frequency: number = 800, duration: number = 200): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  async preloadVoices(): Promise<void> {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        const loadVoices = () => {
          const voices = speechSynthesis.getVoices();
          if (voices.length > 0) {
            resolve();
          } else {
            setTimeout(loadVoices, 100);
          }
        };

        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = loadVoices;
        } else {
          loadVoices();
        }
      } else {
        resolve();
      }
    });
  }
}