import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /**
   * @created by Avishek Datta Ray on Jul 19, 2021
   * @project The Choice Box
  */

  private count = 0;
  private loader$ = new BehaviorSubject<string>('');
  isLoading: boolean = false;

  getLoaderObserver(): Observable<string> {
    return this.loader$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.loader$.next('start');
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.loader$.next('stop');
    }
  }

  resetLoader() {
    this.count = 0;
    this.loader$.next('stop');
  }
}
