import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  isLoading = true;
  recentBookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  displayedBookings: Booking[] = [];

  // Pagination and display properties
  showAllBookings = false;
  readonly INITIAL_DISPLAY_COUNT = 3;

  // Search and filter properties
  searchTerm = '';
  statusFilter = 'all';
  dateFilter = 'all';

  // Simple user data
  userStats = {
    totalBookings: 0,
    upcomingTrips: 0,
    completedTrips: 0,
    confirmedTrips: 0
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    console.log('🚀 Dashboard component initialized');
    this.currentUser = this.authService.getCurrentUser();
    console.log('👤 Current user:', this.currentUser);
    this.refreshBookings();
  }

  refreshBookings(): void {
    console.log('🔄 Refreshing user bookings...');
    this.isLoading = true;
    this.loadUserBookings();
  }

  loadUserBookings(): void {
    console.log('🔄 Loading user bookings...');
    this.bookingService.getUserBookings().subscribe({
      next: (response: any) => {
        console.log('✅ Bookings loaded successfully:', response);
        
        // Handle different response structures
        if (response && response.data && Array.isArray(response.data)) {
          this.recentBookings = response.data;
        } else if (Array.isArray(response)) {
          this.recentBookings = response;
        } else {
          console.warn('Unexpected response format:', response);
          this.recentBookings = [];
        }
        
        console.log('📋 Recent bookings array:', this.recentBookings);
        this.applyFiltersAndSearch();
        this.calculateStats();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading bookings:', error);
        console.error('Error details:', error.error);
        console.error('Status:', error.status);
        console.error('Status text:', error.statusText);
        this.isLoading = false;
        // Use empty array as fallback - no sample data
        this.recentBookings = [];
        this.filteredBookings = [];
        this.displayedBookings = [];
        this.calculateStats();
      }
    });
  }

  calculateStats(): void {
    console.log('📊 Calculating user stats...');
    console.log('📋 Bookings for stats:', this.recentBookings);
    
    this.userStats.totalBookings = this.recentBookings.length;
    this.userStats.upcomingTrips = this.recentBookings.filter(b => b.status === 'upcoming').length;
    this.userStats.completedTrips = this.recentBookings.filter(b => b.status === 'completed').length;
    this.userStats.confirmedTrips = this.recentBookings.filter(b => b.status === 'confirmed').length;
    
    console.log('📊 User stats calculated:', this.userStats);
  }

  // Apply filters and search to bookings
  applyFiltersAndSearch(): void {
    console.log('🔍 Applying filters and search...');
    
    let filtered = [...this.recentBookings];
    
    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === this.statusFilter);
    }
    
    // Apply date filter
    if (this.dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.departureDate);
        bookingDate.setHours(0, 0, 0, 0);
        
        switch (this.dateFilter) {
          case 'upcoming':
            return bookingDate >= today;
          case 'past':
            return bookingDate < today;
          case 'today':
            return bookingDate.getTime() === today.getTime();
          default:
            return true;
        }
      });
    }
    
    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(booking => 
        booking.trainNumber.toLowerCase().includes(searchLower) ||
        booking.from.toLowerCase().includes(searchLower) ||
        booking.to.toLowerCase().includes(searchLower) ||
        booking.bookingReference.toLowerCase().includes(searchLower) ||
        booking.price.toString().includes(searchLower) ||
        booking.class.toLowerCase().includes(searchLower)
      );
    }
    
    this.filteredBookings = filtered;
    this.updateDisplayedBookings();
    
    console.log('📋 Filtered bookings:', this.filteredBookings.length);
    console.log('📋 Displayed bookings:', this.displayedBookings.length);
  }

  // Update displayed bookings based on showAllBookings flag
  updateDisplayedBookings(): void {
    if (this.showAllBookings) {
      this.displayedBookings = this.filteredBookings;
    } else {
      this.displayedBookings = this.filteredBookings.slice(0, this.INITIAL_DISPLAY_COUNT);
    }
  }

  // Toggle show all bookings
  toggleViewMore(): void {
    this.showAllBookings = !this.showAllBookings;
    this.updateDisplayedBookings();
    console.log('🔄 View more toggled:', this.showAllBookings);
  }

  // Handle search input
  onSearchChange(): void {
    this.applyFiltersAndSearch();
  }

  // Handle status filter change
  onStatusFilterChange(): void {
    this.applyFiltersAndSearch();
  }

  // Handle date filter change
  onDateFilterChange(): void {
    this.applyFiltersAndSearch();
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.dateFilter = 'all';
    this.applyFiltersAndSearch();
    console.log('🧹 Filters cleared');
  }

  // Navigation methods
  navigateToBooking(): void {
    this.router.navigate(['/booking']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  viewBookingDetails(bookingId: string): void {
    // TODO: Navigate to booking details
    console.log('View booking:', bookingId);
  }

  // Utility methods
  formatDate(dateString: string): string {
    return this.bookingService.formatDate(dateString);
  }

  formatTime(timeString: string): string {
    return this.bookingService.formatTime(timeString);
  }

  formatCurrency(amount: number): string {
    return this.bookingService.formatCurrency(amount);
  }

  getStatusClass(status: string): string {
    return this.bookingService.getStatusClass(status);
  }

  getStatusText(status: string): string {
    return this.bookingService.getStatusText(status);
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
