export interface TimelineMarker {
  id: string;
  time: number;
  label: string;
  type: 'bookmark' | 'clip' | 'note' | 'tag' | 'evaluation';
}

export class TimelineController {
  private markers: TimelineMarker[] = [];

  constructor(private video?: HTMLVideoElement) {}

  attach(video: HTMLVideoElement) {
    this.video = video;
  }

  seek(time: number) {
    if (!this.video) return false;
    this.video.currentTime = Math.max(0, Math.min(time, this.video.duration || time));
    return true;
  }

  frameForward(frameRate = 60) {
    if (!this.video) return false;
    return this.seek(this.video.currentTime + 1 / frameRate);
  }

  frameBackward(frameRate = 60) {
    if (!this.video) return false;
    return this.seek(this.video.currentTime - 1 / frameRate);
  }

  addMarker(marker: TimelineMarker) {
    this.markers.push(marker);
    this.markers.sort((a, b) => a.time - b.time);
  }

  removeMarker(id: string) {
    this.markers = this.markers.filter((marker) => marker.id !== id);
  }

  getMarkers() {
    return this.markers;
  }
}
