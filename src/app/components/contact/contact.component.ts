import { Component } from '@angular/core';

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

  submitContact(): void {
    // Validate form
    if (!this.contactData.firstName || !this.contactData.lastName || 
        !this.contactData.email || !this.contactData.phone || 
        !this.contactData.subject || !this.contactData.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone format (basic Tunisian phone validation)
    const phoneRegex = /^\+216\s?\d{8}$/;
    if (!phoneRegex.test(this.contactData.phone)) {
      alert('Please enter a valid Tunisian phone number (e.g., +216 71 334 444)');
      return;
    }

    // In a real application, this would send data to a server
    console.log('Contact form submitted:', this.contactData);
    
    // Show success message
    alert(`Thank you ${this.contactData.firstName} ${this.contactData.lastName}! Your message has been sent successfully. We will contact you soon.`);
    
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
