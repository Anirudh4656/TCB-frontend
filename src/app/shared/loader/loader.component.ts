import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '@service/loader.service';

@Component({
  selector: 'tcb-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  constructor(public loaderService: LoaderService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loaderService.getLoaderObserver().subscribe(status => {
      this.loaderService.isLoading = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}
