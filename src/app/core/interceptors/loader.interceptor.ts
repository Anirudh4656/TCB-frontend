import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '@service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  /**
   * @created by Avishek Datta Ray on Jul 19, 2021
   * @project The Choice Box
  */

  constructor(private _loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/snapshot')) {
      return this.handler(next, request);
    }
    this._loaderService.requestStarted();
    return this.handler(next, request);
  }

  handler(next, request) {
    return next.handle(request).pipe(tap((event) => {
      if (event instanceof HttpResponse) {
        this._loaderService.requestEnded();
      }
    }, (error: HttpErrorResponse) => {
      this._loaderService.resetLoader();
      throw error;
    }));
  }
}