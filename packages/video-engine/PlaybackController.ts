export type PlaybackSpeed = -5 | -4.5 | -4 | -3.5 | -3 | -2.5 | -2 | -1.5 | -1 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5;

export class PlaybackController {
  constructor(private video: HTMLVideoElement) {}

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  stop() {
    this.video.pause();
    this.video.currentTime = 0;
  }

  rewind(seconds = 10) {
    this.video.currentTime = Math.max(0, this.video.currentTime - seconds);
  }

  fastForward(seconds = 10) {
    this.video.currentTime = Math.min(this.video.duration || Infinity, this.video.currentTime + seconds);
  }

  setSpeed(speed: PlaybackSpeed) {
    this.video.playbackRate = Math.abs(speed);
  }
}
