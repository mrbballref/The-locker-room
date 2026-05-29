export interface SubtitleTrack {
  id: string;
  label: string;
  language: string;
  src: string;
  default?: boolean;
}

export class SubtitleController {
  private enabled = false;
  private selectedTrackId: string | null = null;
  private tracks: SubtitleTrack[] = [];

  constructor(initialTracks: SubtitleTrack[] = []) {
    this.setTracks(initialTracks);
  }

  setTracks(tracks: SubtitleTrack[]) {
    this.tracks = tracks;
    const defaultTrack = tracks.find((track) => track.default);
    if (defaultTrack) {
      this.selectedTrackId = defaultTrack.id;
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  selectTrack(trackId: string) {
    const exists = this.tracks.some((track) => track.id === trackId);
    if (!exists) return false;
    this.selectedTrackId = trackId;
    return true;
  }

  getState() {
    return {
      enabled: this.enabled,
      selectedTrackId: this.selectedTrackId,
      tracks: this.tracks
    };
  }
}
