export interface StoredVideoAsset {
  id: string;
  videoAssetId: string;
  localUri: string;
  fileName: string;
  fileSizeBytes?: number;
  checksum?: string;
  downloadedAt: string;
}

export class StorageManager {
  private assets: StoredVideoAsset[] = [];

  register(asset: Omit<StoredVideoAsset, 'id' | 'downloadedAt'>) {
    const stored: StoredVideoAsset = {
      ...asset,
      id: crypto.randomUUID(),
      downloadedAt: new Date().toISOString()
    };
    this.assets.push(stored);
    return stored;
  }

  findByVideoAssetId(videoAssetId: string) {
    return this.assets.find((asset) => asset.videoAssetId === videoAssetId) ?? null;
  }

  list() {
    return this.assets;
  }

  remove(id: string) {
    const before = this.assets.length;
    this.assets = this.assets.filter((asset) => asset.id !== id);
    return this.assets.length !== before;
  }

  getTotalStorageBytes() {
    return this.assets.reduce((total, asset) => total + (asset.fileSizeBytes ?? 0), 0);
  }

  clear() {
    this.assets = [];
  }
}
