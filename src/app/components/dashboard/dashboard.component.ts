import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  isLoading = false;

  // Simple user data
  userStats = {
    totalBookings: 0,
    upcomingTrips: 0,
    completedTrips: 0
  };

  // Sample recent bookings
  recentBookings = [
    {
      id: 'BK001',
      trainNumber: 'TN-202',
      from: 'Tunis',
      to: 'Sfax',
      departureDate: '2024-12-15',
      departureTime: '08:30',
      class: 'First',
      price: 45.50,
      status: 'upcoming'
    },
    {
      id: 'BK002', 
      trainNumber: 'MN-105',
      from: 'Sousse',
      to: 'Monastir',
      departureDate: '2024-12-10',
      departureTime: '14:15',
      class: 'Second',
      price: 12.00,
      status: 'completed'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.calculateStats();
  }

  calculateStats(): void {
    this.userStats.totalBookings = this.recentBookings.length;
    this.userStats.upcomingTrips = this.recentBookings.filter(b => b.status === 'upcoming').length;
    this.userStats.completedTrips = this.recentBookings.filter(b => b.status === 'completed').length;
  }

  // Navigation methods
  navigateToBooking(): void {
    this.router.navigate(['/booking']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  viewBookingDetails(bookingId: string): void {
    // TODO: Navigate to booking details
    console.log('View booking:', bookingId);
  }

  // Utility methods
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatTime(timeString: string): string {
    return timeString;
  }

  formatCurrency(amount: number): string {
    return `TND ${amount.toFixed(2)}`;
  }

  getStatusClass(status: string): string {
    return status === 'upcoming' ? 'status-upcoming' : 'status-completed';
  }

  getStatusText(status: string): string {
    return status === 'upcoming' ? 'Upcoming' : 'Completed';
  }

  // User info methods
  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    return `${this.currentUser.firstName?.charAt(0) || ''}${this.currentUser.lastName?.charAt(0) || ''}`.toUpperCase();
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return 'User';
    return `${this.currentUser.firstName || ''} ${this.currentUser.lastName || ''}`.trim();
  }
}
