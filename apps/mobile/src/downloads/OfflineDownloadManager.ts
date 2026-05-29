export class OfflineDownloadManager {
  async queueDownload(videoId:string){
    return { videoId, status:'queued' };
  }
}
