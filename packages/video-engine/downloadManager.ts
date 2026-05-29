export interface DownloadTask { id:string; url:string; progress:number; status:'queued'|'downloading'|'completed'|'failed'; }
export class DownloadManager { private tasks: DownloadTask[] = []; add(task:DownloadTask){ this.tasks.push(task);} list(){ return this.tasks; } }
