export class Timer {
  private startTime: number | null = null;
  private running: boolean = false;
  private elapsedTime: number = 0;

  start(): void {
    if (!this.running) {
      this.startTime = Date.now() - this.elapsedTime;
      this.running = true;
    }
  }

  stop(): void {
    if (this.running && this.startTime !== null) {
      this.elapsedTime = Date.now() - this.startTime;
      this.running = false;
    }
  }

  reset(): void {
    this.elapsedTime = 0;
    this.startTime = null;
    this.running = false;
  }

  getElapsedTime(): string {
    if (!this.startTime) return this.formatTime(0);

    const elapsed = this.running
      ? Date.now() - this.startTime
      : this.elapsedTime;

    return this.formatTime(elapsed);
  }

  private formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours.toString().padStart(2, '0')}:${(minutes % 60)
      .toString()
      .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  }
}
