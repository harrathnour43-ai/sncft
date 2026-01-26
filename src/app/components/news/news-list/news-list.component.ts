import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsArticles: NewsArticle[] = [];
  loading: boolean = true;
  selectedCategory: string = 'all';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadNewsArticles();
  }

  loadNewsArticles(): void {
    this.loading = true;
    
    // Sample news data - in a real app, this would come from an API
    const allNews: NewsArticle[] = [
      {
        id: 'high-speed-trains',
        title: 'New High-Speed Trains Join SNCFT Fleet',
        excerpt: 'SNCFT announces the addition of modern high-speed trains to enhance passenger comfort and reduce travel times between major cities.',
        date: 'March 15, 2024',
        category: 'Fleet Update',
        image: '/assets/photos/tr.jpg',
        author: 'SNCFT Communications Team'
      },
      {
        id: 'tunis-station',
        title: 'Tunis Central Station Modernization Complete',
        excerpt: 'Major renovation of Tunis Central Station concludes, offering passengers improved facilities and modern amenities.',
        date: 'March 12, 2024',
        category: 'Infrastructure',
        image: '/assets/photos/Gare.jpg',
        author: 'SNCFT Infrastructure Department'
      },
      {
        id: 'southern-regions',
        title: 'Expanded Service to Southern Regions',
        excerpt: 'SNCFT launches new routes connecting southern cities with improved schedules and enhanced passenger services.',
        date: 'March 10, 2024',
        category: 'Service',
        image: '/assets/photos/train4.jpg',
        author: 'SNCFT Operations Team'
      },
      {
        id: 'digital-tickets',
        title: 'Digital Ticketing System Launches Nationwide',
        excerpt: 'SNCFT introduces new digital ticketing system allowing passengers to book and manage tickets through mobile app.',
        date: 'March 8, 2024',
        category: 'Technology',
        image: '/assets/photos/train4.jpg',
        author: 'SNCFT Digital Team'
      },
      {
        id: 'safety-upgrade',
        title: 'New Safety Features Implemented Across Fleet',
        excerpt: 'Advanced safety systems including automatic braking and collision avoidance now installed on all major routes.',
        date: 'March 5, 2024',
        category: 'Safety',
        image: '/assets/photos/tr.jpg',
        author: 'SNCFT Safety Department'
      },
      {
        id: 'passenger-award',
        title: 'SNCFT Wins Passenger Service Excellence Award',
        excerpt: 'National recognition for outstanding passenger service and commitment to customer satisfaction across all routes.',
        date: 'March 1, 2024',
        category: 'Awards',
        image: '/assets/photos/Gare.jpg',
        author: 'SNCFT PR Team'
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      this.newsArticles = allNews;
      this.loading = false;
    }, 500);
  }

  getCategories(): string[] {
    const categories = ['all', ...new Set(this.newsArticles.map(article => article.category))];
    return categories;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  getFilteredArticles(): NewsArticle[] {
    if (this.selectedCategory === 'all') {
      return this.newsArticles;
    }
    return this.newsArticles.filter(article => article.category === this.selectedCategory);
  }

  readMore(articleId: string): void {
    this.router.navigate(['/news', articleId]).then(() => {
      this.forceScrollToTop();
    });
  }

  goBack(): void {
    this.router.navigate(['']).then(() => {
      this.forceScrollToTop();
    });
  }

  forceScrollToTop(): void {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
