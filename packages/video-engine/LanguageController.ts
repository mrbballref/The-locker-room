export interface AudioLanguageTrack {
  id: string;
  label: string;
  languageCode: string;
  src?: string;
}

export class LanguageController {
  private tracks: AudioLanguageTrack[] = [];
  private selectedLanguageCode = 'en';

  constructor(initialTracks: AudioLanguageTrack[] = []) {
    this.tracks = initialTracks;
    const defaultTrack = initialTracks[0];
    if (defaultTrack) this.selectedLanguageCode = defaultTrack.languageCode;
  }

  setTracks(tracks: AudioLanguageTrack[]) {
    this.tracks = tracks;
    if (!tracks.some((track) => track.languageCode === this.selectedLanguageCode)) {
      this.selectedLanguageCode = tracks[0]?.languageCode ?? 'en';
    }
  }

  selectLanguage(languageCode: string) {
    const exists = this.tracks.some((track) => track.languageCode === languageCode);
    if (!exists) return false;
    this.selectedLanguageCode = languageCode;
    return true;
  }

  getSelectedLanguage() {
    return this.selectedLanguageCode;
  }

  getTracks() {
    return this.tracks;
  }
}
