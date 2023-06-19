import { HttpInterceptor, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '@service/notification.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

    /**
     * @created by Avishek Datta Ray on Jul 11, 2021
     * @project The Choice Box
    */

    constructor(private router: Router, private _notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let reqTemp = req;
        if (sessionStorage.getItem('token')) {
            reqTemp = req.clone({
                headers: req.headers.set('Authorization', `thechoicebox ${sessionStorage.getItem('token')}`)
            });
        }
        return next.handle(reqTemp).pipe(
            catchError((err, caught: Observable<HttpEvent<any>>) => {
                if (err instanceof HttpErrorResponse) {
                    var message: string = !err.error.message ? 'Internal Server Error' : err.error.message;
                    if (err.status === 403) {
                        sessionStorage.clear();
                        this.router.navigate(['/admin/authentication']);
                        message = 'Session Timeout !! Login Again';
                    }
                    // this._notificationService.notification$.next({ message: message, action: 'ERROR', panelClass: 'danger' });
                    alert(`ERROR: ${message}`);
                    return of(err as any);
                }
                throw err;
            })
        );
    }
}