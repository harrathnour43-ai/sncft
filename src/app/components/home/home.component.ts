import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentSlide: number = 0;
  private slideInterval: any;

  newsItems = [
    {
      title: 'SNCFT Launches New Express Service Between Tunis and Sfax',
      excerpt: 'New high-speed service reduces travel time by 30 minutes with modern comfortable trains.',
      date: 'December 15, 2024',
      category: 'Service Update'
    },
    {
      title: 'Station Modernization Project Completed in Sousse',
      excerpt: 'Major renovation brings improved facilities, accessibility, and passenger comfort to central station.',
      date: 'December 10, 2024',
      category: 'Infrastructure'
    },
    {
      title: 'Holiday Schedule Announced for December 2024',
      excerpt: 'Special timetables and additional services for Christmas and New Year holidays.',
      date: 'December 5, 2024',
      category: 'Schedule'
    }
  ];

  trainAlerts = [
    {
      title: 'Track Maintenance - Tunis to Bizerte Line',
      description: 'Scheduled maintenance work will cause minor delays of 10-15 minutes on select services.',
      time: '2 hours ago',
      route: 'Tunis - Bizerte',
      impact: 'Minor',
      urgent: false
    },
    {
      title: 'Service Disruption - Sahel Region',
      description: 'Due to technical issues, some services between Sousse and Monastir are temporarily suspended.',
      time: '1 hour ago',
      route: 'Sousse - Monastir',
      impact: 'Major',
      urgent: true
    }
  ];

  videoGallery = [
    {
      id: 1,
      title: 'Modern Train Fleet',
      thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: '2:30',
      views: '8.2K'
    },
    {
      id: 2,
      title: 'Tunis-Sfax Express',
      thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: '1:45',
      views: '5.6K'
    },
    {
      id: 3,
      title: 'Comfort & Safety',
      thumbnail: 'https://images.unsplash.com/photo-1580684354978-6bc9e2368012?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: '3:15',
      views: '9.1K'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  get hasActiveAlerts(): boolean {
    return this.trainAlerts.length > 0;
  }

  // Slider Methods
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % 3;
    this.resetAutoSlide();
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + 3) % 3;
    this.resetAutoSlide();
  }

  goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
    this.resetAutoSlide();
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // Navigation Methods
  navigateToBooking(): void {
    this.router.navigate(['/booking']).then(() => {
      this.forceScrollToTop();
    });
  }

  navigateToSchedules(): void {
    this.router.navigate(['/horaires']).then(() => {
      this.forceScrollToTop();
    });
  }

  // News Methods
  viewAllNews(event: Event): void {
    event.preventDefault();
    console.log('View All News clicked');
    // Navigate to news list page
    this.router.navigate(['/news']).then(() => {
      this.forceScrollToTop();
    });
  }

  readMoreNews(newsId: string, event: Event): void {
    event.preventDefault();
    console.log(`Read more news: ${newsId}`);
    // Navigate to specific news article
    this.router.navigate(['/news', newsId]).then(() => {
      this.forceScrollToTop();
    });
  }

  forceScrollToTop(): void {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Video Methods
  playVideo(videoId?: number): void {
    console.log('Playing video:', videoId || 'main video');
    // Here you would typically open a modal or navigate to a video player
    // For now, we'll just log the action
    if (videoId) {
      const video = this.videoGallery.find(v => v.id === videoId);
      if (video) {
        console.log(`Playing: ${video.title}`);
      }
    } else {
      console.log('Playing main promotional video');
    }
  }
}
