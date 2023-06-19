import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { GetPostsModel } from '@model/public/posts/get-posts.model';
import { fadeIn, fadeOut } from './carousel.animation';

@Component({
  selector: 'tcb-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition("void => *", [useAnimation(fadeIn, { params: { time: '1300ms' } })]),
      transition("* => void", [useAnimation(fadeOut, { params: { time: '1300ms' } })]),
    ])
  ]
})
export class CarouselComponent implements OnInit {

  @Input() slides: GetPostsModel[];
  currentSlide = 0;

  async ngOnInit() {
    setInterval(() => this.onNextClick(), 7000);
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  selectRandomImages(): GetPostsModel[] {
    return this.slides.sort(() => 0.5 - Math.random()).slice(0, this.slides.length > 5 ? 5 : this.slides.length);
  }
}
