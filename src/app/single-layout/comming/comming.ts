import { Component } from '@angular/core';

@Component({
  selector: 'app-comming',
  imports: [],
  templateUrl: './comming.html',
  styleUrl: './comming.css',
  standalone: true
})
export class Comming {

  launchDate = new Date('2026-02-14T00:00:00').getTime();
  intervalId!: number;

  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  email = '';
  success = false;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startCountdown() {
    this.intervalId = window.setInterval(() => {
      const now = Date.now();
      const distance = this.launchDate - now;

      if (distance < 0) {
        clearInterval(this.intervalId);
        return;
      }

      this.days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
      this.hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      this.minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
      this.seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');
    }, 1000);
  }


}
