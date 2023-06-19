import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { NotificationService } from '@service/notification.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'tcb-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(router: Router, snackBar: MatSnackBar, _notificationService: NotificationService) {
    router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      tap(() => sessionStorage.removeItem('data'))
    ).subscribe();
    _notificationService.notification$.subscribe(response => snackBar.open(response.message, response.action, {
      panelClass: ['toastr-bg', response.panelClass]
    }));
  }
}
