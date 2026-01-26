import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsArticle: NewsArticle | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('id');
    this.loadNewsArticle(newsId);
  }

  loadNewsArticle(id: string | null): void {
    this.loading = true;
    
    // Sample news data - in a real app, this would come from an API
    const newsData: { [key: string]: NewsArticle } = {
      'high-speed-trains': {
        id: 'high-speed-trains',
        title: 'New High-Speed Trains Join SNCFT Fleet',
        excerpt: 'SNCFT announces the addition of modern high-speed trains to enhance passenger comfort and reduce travel times between major cities.',
        content: `
          <p><strong>SNCFT is proud to announce a major upgrade to our fleet with the introduction of state-of-the-art high-speed trains that will revolutionize railway travel across Tunisia.</strong> This landmark investment represents our commitment to providing world-class transportation services to the Tunisian people.</p>
          
          <h3>🚄 Cutting-Edge Technology & Features</h3>
          <p>The new high-speed trains feature the latest in railway technology, setting new standards for comfort and efficiency:</p>
          <ul>
            <li><strong>Advanced Propulsion Systems:</strong> Electric locomotives capable of reaching speeds up to 200 km/h</li>
            <li><strong>Intelligent Suspension:</strong> Magnetic levitation suspension systems for smoother rides</li>
            <li><strong>Climate Control:</strong> Advanced air conditioning with individual seat controls</li>
            <li><strong>Ergonomic Seating:</strong> Premium seats with adjustable headrests, lumbar support, and ample legroom</li>
            <li><strong>WiFi Connectivity:</strong> Free high-speed internet throughout all carriages</li>
            <li><strong>Power Outlets:</strong> USB and standard power outlets at every seat</li>
            <li><strong>Digital Displays:</strong> Real-time travel information and entertainment systems</li>
          </ul>
          
          <h3>⏰ Significant Reduction in Travel Times</h3>
          <p>The introduction of high-speed trains will dramatically reduce journey times across Tunisia's major routes:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f0f8ff;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Route</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Current Time</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">New Time</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Time Saved</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;">Tunis → Sfax</td>
              <td style="border: 1px solid #ddd; padding: 12px;">3h 45min</td>
              <td style="border: 1px solid #ddd; padding: 12px;">3h 15min</td>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>30 minutes</strong></td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;">Tunis → Sousse</td>
              <td style="border: 1px solid #ddd; padding: 12px;">2h 30min</td>
              <td style="border: 1px solid #ddd; padding: 12px;">2h 10min</td>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>20 minutes</strong></td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;">Tunis → Gabes</td>
              <td style="border: 1px solid #ddd; padding: 12px;">5h 15min</td>
              <td style="border: 1px solid #ddd; padding: 12px;">4h 30min</td>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>45 minutes</strong></td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;">Sousse → Sfax</td>
              <td style="border: 1px solid #ddd; padding: 12px;">2h 00min</td>
              <td style="border: 1px solid #ddd; padding: 12px;">1h 40min</td>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>20 minutes</strong></td>
            </tr>
          </table>
          
          <h3>🌱 Environmental Benefits & Sustainability</h3>
          <p>These modern trains are designed with sustainability as a core principle, featuring:</p>
          <ul>
            <li><strong>Energy Efficiency:</strong> Regenerative braking systems that capture and reuse energy</li>
            <li><strong>Reduced Emissions:</strong> 25% lower carbon footprint compared to older models</li>
            <li><strong>Solar Panels:</strong> Integrated solar panels on roof for auxiliary power</li>
            <li><strong>Recycled Materials:</strong> 80% of construction materials are recyclable</li>
            <li><strong>Water Conservation:</strong> Advanced water recycling systems in restrooms</li>
          </ul>
          <p>This initiative aligns with SNCFT's commitment to achieving carbon neutrality by 2030 and supporting Tunisia's national environmental goals.</p>
          
          <h3>🎯 Enhanced Passenger Services</h3>
          <p>Passengers can enjoy a premium travel experience with new and improved services:</p>
          <ul>
            <li><strong>Business Class:</strong> Premium seating with complimentary meals and priority boarding</li>
            <li><strong>Family Zones:</strong> Dedicated areas with play facilities for children</li>
            <li><strong>Accessibility:</strong> Full wheelchair accessibility and dedicated spaces for passengers with reduced mobility</li>
            <li><strong>Dining Car:</strong> Restaurant-quality meals and refreshments available</li>
            <li><strong>Luggage Storage:</strong> Secure storage areas for oversized luggage</li>
            <li><strong>Prayer Rooms:</strong> Quiet spaces for religious observance</li>
          </ul>
          
          <h3>📅 Implementation Schedule</h3>
          <p>The rollout of high-speed trains will be conducted in phases to ensure smooth integration:</p>
          <ul>
            <li><strong>Phase 1 (April 2024):</strong> Tunis → Sousse route (2 trains daily)</li>
            <li><strong>Phase 2 (June 2024):</strong> Tunis → Sfax route (4 trains daily)</li>
            <li><strong>Phase 3 (September 2024):</strong> Extended service to Gabes and southern regions</li>
            <li><strong>Phase 4 (December 2024):</strong> Full integration with existing network</li>
          </ul>
          
          <h3>💰 Economic Impact</h3>
          <p>This investment will have significant positive effects on Tunisia's economy:</p>
          <ul>
            <li><strong>Job Creation:</strong> Over 500 new jobs in operations, maintenance, and customer service</li>
            <li><strong>Tourism Boost:</strong> Improved accessibility expected to increase tourism by 15%</li>
            <li><strong>Business Growth:</strong> Faster connections will facilitate business travel and commerce</li>
            <li><strong>Regional Development:</strong> Enhanced connectivity will promote economic growth in smaller cities</li>
          </ul>
          
          <p><strong>Book your journey today and experience the future of rail travel in Tunisia!</strong></p>
        `,
        date: 'March 15, 2024',
        category: 'Fleet Update',
        image: '/assets/photos/tr.jpg',
        author: 'SNCFT Communications Team'
      },
      'tunis-station': {
        id: 'tunis-station',
        title: 'Tunis Central Station Modernization Complete',
        excerpt: 'Major renovation of Tunis Central Station concludes, offering passengers improved facilities and modern amenities.',
        content: `
          <p>After months of extensive renovation, Tunis Central Station has officially reopened its doors, showcasing a completely transformed facility that sets new standards for railway stations in Tunisia.</p>
          
          <h3>Modern Architecture and Design</h3>
          <p>The renovated station features a stunning blend of modern architecture and traditional Tunisian design elements. The main hall has been expanded to accommodate more passengers comfortably, with natural lighting flooding through new skylights and large windows.</p>
          
          <h3>Enhanced Passenger Facilities</h3>
          <p>Passengers can now enjoy a wide range of improved facilities including comfortable waiting areas with charging stations, modern restroom facilities, and dedicated spaces for families with young children.</p>
        `,
        date: 'March 12, 2024',
        category: 'Infrastructure',
        image: '/assets/photos/Gare.jpg',
        author: 'SNCFT Infrastructure Department'
      },
      'southern-regions': {
        id: 'southern-regions',
        title: 'Expanded Service to Southern Regions',
        excerpt: 'SNCFT launches new routes connecting southern cities with improved schedules and enhanced passenger services.',
        content: `
          <p>SNCFT is excited to announce the expansion of railway services to southern Tunisia, connecting more communities and providing improved transportation options for residents and visitors alike.</p>
          
          <h3>New Routes and Destinations</h3>
          <p>The expansion includes new routes connecting Tunis to Gabes, Medenine, and Tataouine, with intermediate stops in key towns along the way.</p>
          
          <h3>Improved Schedules</h3>
          <p>New schedules have been designed to provide more convenient departure times, with early morning services for business travelers and evening departures for those returning from day trips.</p>
        `,
        date: 'March 10, 2024',
        category: 'Service',
        image: '/assets/photos/train4.jpg',
        author: 'SNCFT Operations Team'
      }
    };

    // Simulate loading delay
    setTimeout(() => {
      if (id && newsData[id]) {
        this.newsArticle = newsData[id];
      } else {
        // Article not found, redirect to news list
        this.router.navigate(['/news']);
      }
      this.loading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/news']).then(() => {
      this.forceScrollToTop();
    });
  }

  readMore(articleId: string): void {
    this.router.navigate(['/news', articleId]).then(() => {
      this.forceScrollToTop();
    });
  }

  forceScrollToTop(): void {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getRelatedArticles(): NewsArticle[] {
    if (!this.newsArticle) return [];
    
    // Return other articles excluding the current one
    const allArticles = [
      {
        id: 'high-speed-trains',
        title: 'New High-Speed Trains Join SNCFT Fleet',
        excerpt: 'SNCFT announces the addition of modern high-speed trains.',
        content: '',
        date: 'March 15, 2024',
        category: 'Fleet Update',
        image: '/assets/photos/tr.jpg',
        author: 'SNCFT Communications Team'
      },
      {
        id: 'tunis-station',
        title: 'Tunis Central Station Modernization Complete',
        excerpt: 'Major renovation of Tunis Central Station concludes.',
        content: '',
        date: 'March 12, 2024',
        category: 'Infrastructure',
        image: '/assets/photos/Gare.jpg',
        author: 'SNCFT Infrastructure Department'
      },
      {
        id: 'southern-regions',
        title: 'Expanded Service to Southern Regions',
        excerpt: 'SNCFT launches new routes connecting southern cities.',
        content: '',
        date: 'March 10, 2024',
        category: 'Service',
        image: '/assets/photos/train4.jpg',
        author: 'SNCFT Operations Team'
      }
    ];

    return allArticles.filter(article => article.id !== this.newsArticle?.id);
  }
}
