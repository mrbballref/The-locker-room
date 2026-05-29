export type PlayerMode = 'idle' | 'loading' | 'playing' | 'paused' | 'stopped' | 'buffering' | 'error';

export interface PlayerState {
  mode: PlayerMode;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
  isRecording: boolean;
  isFullscreen: boolean;
  isTheaterMode: boolean;
  isPictureInPicture: boolean;
  selectedQuality: string;
  selectedLanguage: string;
  subtitlesEnabled: boolean;
}

export const defaultPlayerState: PlayerState = {
  mode: 'idle',
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false,
  playbackRate: 1,
  isRecording: false,
  isFullscreen: false,
  isTheaterMode: false,
  isPictureInPicture: false,
  selectedQuality: 'auto',
  selectedLanguage: 'en',
  subtitlesEnabled: false
};
