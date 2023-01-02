import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  private _interval!: NodeJS.Timer;
  private _tweetsNumber: number = 0;
  private _averageNumberOfTweetsPerMinute: number = 0;
  private _startTrackingDateTime: number = 0;

  get averageNumberOfTweetsPerMinute(): number {
    return Math.floor(this._averageNumberOfTweetsPerMinute);
  }

  startTracking(): void {
    this._tweetsNumber = 0;
    this._averageNumberOfTweetsPerMinute = 0;
    this._startTrackingDateTime = new Date().getTime();

    this._interval = setInterval(() => {
      const durationInSeconds =
        (this.getCurrentDateTime() - this._startTrackingDateTime) / 1000;

      if (durationInSeconds < 60) {
        this._averageNumberOfTweetsPerMinute =
          (60 / durationInSeconds) * this._tweetsNumber;
      } else {
        const durationInMins = durationInSeconds / 60;
        this._averageNumberOfTweetsPerMinute =
          this._tweetsNumber / durationInMins;
      }
    }, 10000);
  }

  stopTracking(): void {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  trackNewTweet(): void {
    this._tweetsNumber++;
  }

  resetStartTrackingDateTime(): void {
    // reset tracking if tracker was already started
    if (this._startTrackingDateTime > 0) {
      this.stopTracking();
      this.startTracking();
    }
  }

  private getCurrentDateTime(): number {
    return new Date().getTime();
  }
}
