import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

export interface BookingConfirmationData {
  trainNumber: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  passengers: number;
  totalPrice: number;
  bookingReference: string;
  passengerNames: string[];
}

export interface ContactConfirmationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submissionTime: string;
  ticketNumber: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() type: 'terms' | 'privacy' | 'booking-confirmation' | 'contact-confirmation' = 'terms';
  @Input() title: string = 'Terms of Service';
  @Input() bookingData: BookingConfirmationData | null = null;
  @Input() contactData: ContactConfirmationData | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  
  scrollPosition: number = 0;

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onClose(): void {
    this.closeModal();
  }

  // Handle escape key
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isVisible) {
      this.closeModal();
    }
  }
}
