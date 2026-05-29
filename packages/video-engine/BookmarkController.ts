export interface Bookmark {
  id: string;
  videoId: string;
  time: number;
  title: string;
  note?: string;
  createdAt: string;
}

export class BookmarkController {
  private bookmarks: Bookmark[] = [];

  add(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    this.bookmarks.sort((a, b) => a.time - b.time);
    return bookmark;
  }

  remove(id: string) {
    const before = this.bookmarks.length;
    this.bookmarks = this.bookmarks.filter((item) => item.id !== id);
    return this.bookmarks.length !== before;
  }

  list(videoId?: string) {
    if (!videoId) return this.bookmarks;
    return this.bookmarks.filter((item) => item.videoId === videoId);
  }

  clear(videoId?: string) {
    if (!videoId) {
      this.bookmarks = [];
      return;
    }
    this.bookmarks = this.bookmarks.filter((item) => item.videoId !== videoId);
  }
}
