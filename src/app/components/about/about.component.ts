import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private router: Router) {}

  navigateToBooking(): void {
    this.router.navigate(['/booking']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
