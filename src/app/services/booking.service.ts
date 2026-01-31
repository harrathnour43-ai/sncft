import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  trainNumber: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  passengers: number;
  class: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'confirmed';
  createdAt: string;
}

export interface BookingRequest {
  trainNumber: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  class: string;
  price: number;
  passengers: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Create a new booking
  createBooking(bookingData: BookingRequest): Observable<Booking> {
    const currentUser = this.authService.getCurrentUser();
    
    console.log('🔍 === USER ID DEBUGGING ===');
    console.log('👤 Current user from AuthService:', currentUser);
    console.log('🆔 User ID:', currentUser?.id);
    console.log('📧 User email:', currentUser?.email);
    console.log('👤 User name:', currentUser?.firstName, currentUser?.lastName);
    console.log('🔐 Is logged in:', this.authService.isLoggedIn());
    console.log('🎫 Token:', this.authService.getToken());
    
    const booking: Booking = {
      id: `BK${Date.now()}${Math.floor(Math.random() * 1000)}`, // Generate unique ID
      bookingReference: `REF${Date.now()}${Math.floor(Math.random() * 1000)}`, // Generate unique reference
      ...bookingData,
      userId: currentUser?.id || 'guest',
      status: 'confirmed', // Set status to confirmed when booking is created
      createdAt: new Date().toISOString()
    };

    console.log('🎫 === BOOKING CREATION PROCESS ===');
    console.log('📋 Booking data prepared:', booking);
    console.log('👤 Final User ID in booking:', booking.userId);
    console.log('🚂 Train:', booking.trainNumber);
    console.log('📍 Route:', `${booking.from} → ${booking.to}`);
    console.log('📅 Date:', booking.departureDate);
    console.log('💰 Price:', booking.price);
    console.log('👥 Passengers:', booking.passengers);
    console.log('🏷️ Class:', booking.class);
    console.log('📊 Status:', booking.status);
    console.log('🔗 API URL:', this.apiUrl);
    console.log('📤 Sending POST request to:', this.apiUrl);

    return this.http.post<Booking>(this.apiUrl, booking).pipe(
      tap({
        next: (response) => {
          console.log('✅ Booking API Response:', response);
          console.log('✅ Response status:', response);
          console.log('✅ Response data:', response);
        },
        error: (error) => {
          console.error('❌ Booking API Error:', error);
          console.error('❌ Error status:', error.status);
          console.error('❌ Error message:', error.message);
          console.error('❌ Error details:', error.error);
          console.error('❌ Full error object:', error);
          console.error('❌ Request URL:', this.apiUrl);
          console.error('❌ Request data:', booking);
        }
      })
    );
  }

  // Get all bookings for current user
  getUserBookings(): Observable<Booking[]> {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 'guest';
    const url = `${this.apiUrl}/user/${userId}`;
    
    console.log('Fetching bookings for user:', userId);
    console.log('Request URL:', url);
    
    return this.http.get<Booking[]>(url);
  }

  // Get booking by ID
  getBookingById(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${bookingId}`);
  }

  // Update booking status
  updateBookingStatus(bookingId: string, status: 'upcoming' | 'completed' | 'cancelled'): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${bookingId}/status`, { status });
  }

  // Cancel booking
  cancelBooking(bookingId: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${bookingId}/cancel`, {});
  }

  // Determine booking status based on departure date
  private determineBookingStatus(departureDate: string): 'upcoming' | 'completed' {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison
    
    const departure = new Date(departureDate);
    departure.setHours(0, 0, 0, 0);
    
    return departure >= today ? 'upcoming' : 'completed';
  }

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Format time for display
  formatTime(timeString: string): string {
    return timeString;
  }

  // Format currency for display
  formatCurrency(amount: number): string {
    return `TND ${amount.toFixed(2)}`;
  }

  // Get status class for styling
  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'upcoming':
        return 'status-upcoming';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-upcoming';
    }
  }

  // Get status text for display
  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}
