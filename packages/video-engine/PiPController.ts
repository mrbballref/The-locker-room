export class PiPController {
  constructor(private video?: HTMLVideoElement) {}

  attach(video: HTMLVideoElement) {
    this.video = video;
  }

  isSupported() {
    return typeof document !== 'undefined' && Boolean(document.pictureInPictureEnabled);
  }

  isActive() {
    return Boolean(this.video && document.pictureInPictureElement === this.video);
  }

  async enter() {
    if (!this.video || !this.isSupported()) return false;
    if (this.isActive()) return true;
    await this.video.requestPictureInPicture();
    return true;
  }

  async exit() {
    if (typeof document === 'undefined') return false;
    if (!document.pictureInPictureElement) return true;
    await document.exitPictureInPicture();
    return true;
  }

  async toggle() {
    if (this.isActive()) return this.exit();
    return this.enter();
  }
}
