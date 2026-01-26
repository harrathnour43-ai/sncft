import { Component } from '@angular/core';
import { ContactConfirmationData } from '../modal/modal.component';

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  contactData: ContactData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // Modal properties
  showContactModal: boolean = false;
  contactConfirmationData: ContactConfirmationData | null = null;

  submitContact(): void {
    // Validate form
    if (!this.contactData.firstName || !this.contactData.lastName || 
        !this.contactData.email || !this.contactData.phone || 
        !this.contactData.subject || !this.contactData.message) {
      this.showErrorModal('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactData.email)) {
      this.showErrorModal('Please enter a valid email address');
      return;
    }

    // Validate phone format (basic Tunisian phone validation)
    const phoneRegex = /^\+216\s?\d{8}$/;
    if (!phoneRegex.test(this.contactData.phone)) {
      this.showErrorModal('Please enter a valid Tunisian phone number (e.g., +216 71 334 444)');
      return;
    }

    // Generate contact confirmation data
    this.contactConfirmationData = {
      firstName: this.contactData.firstName,
      lastName: this.contactData.lastName,
      email: this.contactData.email,
      phone: this.contactData.phone,
      subject: this.contactData.subject,
      message: this.contactData.message,
      submissionTime: this.getCurrentDateTime(),
      ticketNumber: this.generateTicketNumber()
    };

    // In a real application, this would send data to a server
    console.log('Contact form submitted:', this.contactData);
    
    // Show contact confirmation modal
    this.showContactModal = true;
  }

  showErrorModal(message: string): void {
    // For now, use alert for error messages - could be enhanced with error modal
    alert(message);
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleString('en-TN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Tunis'
    });
  }

  generateTicketNumber(): string {
    // Generate a random ticket number (e.g., CNT-123456)
    const random = Math.floor(Math.random() * 1000000);
    return `CNT-${random.toString().padStart(6, '0')}`;
  }

  closeContactModal(): void {
    this.showContactModal = false;
    // Reset form after successful submission
    this.resetForm();
  }

  resetForm(): void {
    this.contactData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
