export interface DownloadProgressSnapshot {
  id: string;
  receivedBytes: number;
  totalBytes: number;
  progress: number;
  updatedAt: string;
}

export class DownloadTracker {
  private snapshots = new Map<string, DownloadProgressSnapshot>();

  update(id: string, receivedBytes: number, totalBytes: number) {
    const progress = totalBytes > 0 ? Math.min(100, Math.round((receivedBytes / totalBytes) * 100)) : 0;
    const snapshot: DownloadProgressSnapshot = {
      id,
      receivedBytes,
      totalBytes,
      progress,
      updatedAt: new Date().toISOString()
    };
    this.snapshots.set(id, snapshot);
    return snapshot;
  }

  get(id: string) {
    return this.snapshots.get(id) ?? null;
  }

  list() {
    return Array.from(this.snapshots.values());
  }

  remove(id: string) {
    return this.snapshots.delete(id);
  }

  reset() {
    this.snapshots.clear();
  }
}
