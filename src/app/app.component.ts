import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'sncft-front';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Scroll to top when navigating to a new page
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log('Navigation ended, scrolling to top');
      this.forceScrollToTop();
    });
  }

  ngAfterViewInit(): void {
    // Ensure scroll to top on initial page load
    setTimeout(() => {
      this.forceScrollToTop();
    }, 0);
  }

  forceScrollToTop(): void {
    // Multiple methods to ensure scroll to top
    try {
      // Method 1: Modern scrollTo
      window.scrollTo(0, 0);
      
      // Method 2: Document body scroll (fallback)
      document.body.scrollTop = 0;
      
      // Method 3: Document element scroll (fallback)
      document.documentElement.scrollTop = 0;
      
      // Method 4: Force scroll behavior
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate scroll
        });
      }
      
      console.log('Forced scroll to top executed');
    } catch (error) {
      console.error('Error scrolling to top:', error);
      // Last resort - set scroll positions directly
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
}
