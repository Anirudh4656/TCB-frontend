import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notification$: Subject<NotificationDetails> = new Subject();
}

interface NotificationDetails {
  message: string;
  action: string;
  panelClass: string;
}
