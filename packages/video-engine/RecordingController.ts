export type RecordingStatus = 'idle' | 'armed' | 'recording' | 'stopped';

export interface RecordingSegment {
  id: string;
  startTime: number;
  endTime?: number;
  label?: string;
}

export class RecordingController {
  private status: RecordingStatus = 'idle';
  private activeSegment: RecordingSegment | null = null;
  private segments: RecordingSegment[] = [];

  arm() {
    if (this.status === 'recording') return false;
    this.status = 'armed';
    return true;
  }

  start(startTime: number, label?: string) {
    if (this.status === 'recording') return false;
    this.activeSegment = {
      id: crypto.randomUUID(),
      startTime,
      label
    };
    this.status = 'recording';
    return this.activeSegment;
  }

  stop(endTime: number) {
    if (!this.activeSegment) return null;
    const completed = { ...this.activeSegment, endTime };
    this.segments.push(completed);
    this.activeSegment = null;
    this.status = 'stopped';
    return completed;
  }

  reset() {
    this.status = 'idle';
    this.activeSegment = null;
  }

  getStatus() {
    return this.status;
  }

  getSegments() {
    return this.segments;
  }
}
