import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  isVisible: boolean = false;

  ngOnInit(): void {
    // Make button always visible for testing
    this.isVisible = true;
    this.checkScrollPosition();
    console.log('ScrollToTopComponent initialized');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  checkScrollPosition(): void {
    // Show button when user scrolls down 100px or more
    this.isVisible = window.pageYOffset > 100;
  }

  // Debug methods for mouse events
  onMouseDown(): void {
    console.log('Button mousedown - event fired');
  }

  onMouseUp(): void {
    console.log('Button mouseup - event fired');
  }

  scrollToTop(): void {
    console.log('=== SCROLL TO TOP CLICKED ===');
    console.log('Current scroll position:', window.pageYOffset);
    
    // Method 1: Immediate scroll (most reliable)
    window.scrollTo(0, 0);
    console.log('After window.scrollTo(0, 0):', window.pageYOffset);
    
    // Method 2: Document body scroll (backup)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log('After document scroll reset:', window.pageYOffset);
    
    // Method 3: Force scroll with behavior
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Use 'auto' for immediate scroll
      });
      console.log('After scrollTo with behavior:', window.pageYOffset);
    } catch (error) {
      console.log('ScrollTo with behavior not supported:', error);
    }
    
    console.log('=== SCROLL COMPLETED ===');
  }
}
