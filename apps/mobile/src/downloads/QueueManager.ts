export type QueueStatus = 'queued' | 'downloading' | 'paused' | 'completed' | 'failed' | 'cancelled';

export interface DownloadQueueItem {
  id: string;
  videoAssetId: string;
  remoteUrl: string;
  localFileName: string;
  status: QueueStatus;
  progress: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export class QueueManager {
  private queue: DownloadQueueItem[] = [];

  enqueue(item: Omit<DownloadQueueItem, 'status' | 'progress' | 'createdAt' | 'updatedAt'>) {
    const timestamp = new Date().toISOString();
    const queued: DownloadQueueItem = {
      ...item,
      status: 'queued',
      progress: 0,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this.queue.push(queued);
    return queued;
  }

  updateStatus(id: string, status: QueueStatus, errorMessage?: string) {
    const item = this.queue.find((entry) => entry.id === id);
    if (!item) return null;
    item.status = status;
    item.errorMessage = errorMessage;
    item.updatedAt = new Date().toISOString();
    return item;
  }

  updateProgress(id: string, progress: number) {
    const item = this.queue.find((entry) => entry.id === id);
    if (!item) return null;
    item.progress = Math.max(0, Math.min(100, progress));
    item.updatedAt = new Date().toISOString();
    return item;
  }

  remove(id: string) {
    const before = this.queue.length;
    this.queue = this.queue.filter((entry) => entry.id !== id);
    return this.queue.length !== before;
  }

  list(status?: QueueStatus) {
    if (!status) return this.queue;
    return this.queue.filter((entry) => entry.status === status);
  }

  next() {
    return this.queue.find((entry) => entry.status === 'queued') ?? null;
  }
}
