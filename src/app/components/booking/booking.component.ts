import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingConfirmationData } from '../modal/modal.component';

export interface BookingData {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  class: string;
  paymentMethod: string;
}

export interface Train {
  trainNumber: string;
  type: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  price: number;
  features: string[];
  class: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  bookingData: BookingData = {
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
    paymentMethod: 'credit'
  };

  searchResults: Train[] = [];
  selectedTrain: Train | null = null;
  passengers: Passenger[] = [];
  
  // Modal properties
  showBookingModal: boolean = false;
  bookingConfirmationData: BookingConfirmationData | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load saved booking data from localStorage
    this.loadBookingData();
    this.initializePassengers();
  }

  initializePassengers(): void {
    this.passengers = [];
    for (let i = 0; i < this.bookingData.passengers; i++) {
      this.passengers.push({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      });
    }
  }

  searchTrains(): void {
    // Debug: Log current booking data
    console.log('Current booking data:', this.bookingData);
    
    // Check if required fields are filled
    if (!this.bookingData.from || this.bookingData.from === '') {
      alert('Please select departure city');
      return;
    }
    
    if (!this.bookingData.to || this.bookingData.to === '') {
      alert('Please select arrival city');
      return;
    }
    
    if (!this.bookingData.departureDate || this.bookingData.departureDate === '') {
      alert('Please select departure date');
      return;
    }
    
    if (this.bookingData.from === this.bookingData.to) {
      alert('Departure and arrival cities cannot be the same');
      return;
    }
    
    // Save booking data to localStorage
    this.saveBookingData();
    
    // Mock search results - in real app, this would call an API
    this.searchResults = [
      {
        trainNumber: 'TN-101',
        type: 'Express',
        from: this.getCityName(this.bookingData.from),
        to: this.getCityName(this.bookingData.to),
        departureTime: '08:00',
        arrivalTime: '11:30',
        departureDate: this.bookingData.departureDate,
        arrivalDate: this.bookingData.departureDate,
        duration: '3h 30m',
        price: this.getBasePrice(),
        features: ['WiFi', 'Restaurant', 'AC'],
        class: this.bookingData.class
      },
      {
        trainNumber: 'TN-202',
        type: 'Regional',
        from: this.getCityName(this.bookingData.from),
        to: this.getCityName(this.bookingData.to),
        departureTime: '14:00',
        arrivalTime: '18:45',
        departureDate: this.bookingData.departureDate,
        arrivalDate: this.bookingData.departureDate,
        duration: '4h 45m',
        price: this.getBasePrice() * 0.8,
        features: ['AC', 'Snacks'],
        class: this.bookingData.class
      },
      {
        trainNumber: 'TN-303',
        type: 'High-Speed',
        from: this.getCityName(this.bookingData.from),
        to: this.getCityName(this.bookingData.to),
        departureTime: '19:00',
        arrivalTime: '21:15',
        departureDate: this.bookingData.departureDate,
        arrivalDate: this.bookingData.departureDate,
        duration: '2h 15m',
        price: this.getBasePrice() * 1.5,
        features: ['WiFi', 'Restaurant', 'AC', 'Power Outlets'],
        class: this.bookingData.class
      }
    ];
    
    console.log('Search results generated:', this.searchResults);
  }

  selectTrain(train: Train): void {
    this.selectedTrain = train;
    this.initializePassengers();
    
    // Scroll to the "Complete Your Booking" section
    setTimeout(() => {
      const bookingFormSection = document.querySelector('.booking-form-section');
      if (bookingFormSection) {
        bookingFormSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  }

  confirmBooking(): void {
    if (!this.selectedTrain) {
      this.showErrorModal('Please select a train');
      return;
    }

    // Validate passenger details
    for (let passenger of this.passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.email || !passenger.phone) {
        this.showErrorModal('Please fill in all passenger details');
        return;
      }
    }

    if (!this.bookingData.paymentMethod) {
      this.showErrorModal('Please select a payment method');
      return;
    }

    // Generate booking confirmation data
    this.bookingConfirmationData = {
      trainNumber: this.selectedTrain.trainNumber,
      from: this.selectedTrain.from,
      to: this.selectedTrain.to,
      departureDate: this.selectedTrain.departureDate,
      departureTime: this.selectedTrain.departureTime,
      arrivalTime: this.selectedTrain.arrivalTime,
      passengers: this.bookingData.passengers,
      totalPrice: this.selectedTrain.price * this.bookingData.passengers,
      bookingReference: this.generateBookingReference(),
      passengerNames: this.passengers.map(p => `${p.firstName} ${p.lastName}`)
    };

    // Show booking confirmation modal
    this.showBookingModal = true;
  }

  showErrorModal(message: string): void {
    // For now, use alert for error messages - could be enhanced with error modal
    alert(message);
  }

  generateBookingReference(): string {
    // Generate a random booking reference (e.g., SNCFT123456)
    const random = Math.floor(Math.random() * 1000000);
    return `SNCFT${random.toString().padStart(6, '0')}`;
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    // Reset form after successful booking
    this.resetForm();
  }

  cancelBooking(): void {
    this.selectedTrain = null;
    this.searchResults = [];
  }

  resetForm(): void {
    this.bookingData = {
      from: '',
      to: '',
      departureDate: '',
      returnDate: '',
      passengers: 1,
      class: 'economy',
      paymentMethod: 'credit'
    };
    this.searchResults = [];
    this.selectedTrain = null;
    this.passengers = [];
  }

  getCityName(cityCode: string): string {
    const cityNames: { [key: string]: string } = {
      'tunis': 'Tunis',
      'sfax': 'Sfax',
      'sousse': 'Sousse',
      'monastir': 'Monastir',
      'bizerte': 'Bizerte',
      'gabes': 'Gabès',
      'tozeur': 'Tozeur',
      'djerba': 'Djerba'
    };
    return cityNames[cityCode] || cityCode;
  }

  getBasePrice(): number {
    const basePrices: { [key: string]: number } = {
      'economy': 25,
      'business': 45,
      'first': 75
    };
    return basePrices[this.bookingData.class] || 25;
  }

  saveBookingData(): void {
    try {
      localStorage.setItem('sncft_booking_data', JSON.stringify(this.bookingData));
      console.log('Booking data saved to localStorage');
    } catch (error) {
      console.error('Error saving booking data:', error);
    }
  }

  loadBookingData(): void {
    try {
      const savedData = localStorage.getItem('sncft_booking_data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.bookingData = { ...this.bookingData, ...parsedData };
        console.log('Booking data loaded from localStorage:', this.bookingData);
      }
    } catch (error) {
      console.error('Error loading booking data:', error);
    }
  }
}
