import type { DownloadQueueItem } from './QueueManager';
import type { StoredVideoAsset } from './StorageManager';

export interface SyncResult {
  syncedAt: string;
  queuedCount: number;
  storedCount: number;
  failedCount: number;
}

export class SyncManager {
  private lastSyncAt: string | null = null;

  getLastSyncAt() {
    return this.lastSyncAt;
  }

  buildPayload(queue: DownloadQueueItem[], storedAssets: StoredVideoAsset[]) {
    return {
      queued: queue,
      storedAssets,
      generatedAt: new Date().toISOString()
    };
  }

  completeSync(queue: DownloadQueueItem[], storedAssets: StoredVideoAsset[]): SyncResult {
    const syncedAt = new Date().toISOString();
    this.lastSyncAt = syncedAt;

    return {
      syncedAt,
      queuedCount: queue.filter((item) => item.status === 'queued').length,
      storedCount: storedAssets.length,
      failedCount: queue.filter((item) => item.status === 'failed').length
    };
  }

  shouldRetry(item: DownloadQueueItem, maxAttempts = 3) {
    if (item.status !== 'failed') return false;
    const attempts = Number((item as DownloadQueueItem & { attempts?: number }).attempts ?? 0);
    return attempts < maxAttempts;
  }

  getPendingSyncItems(queue: DownloadQueueItem[]) {
    return queue.filter((item) => ['queued', 'paused', 'failed'].includes(item.status));
  }
}
