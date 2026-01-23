import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  showModal: boolean = false;
  modalType: 'terms' | 'privacy' = 'terms';
  modalTitle: string = 'Terms of Service';

  onRegister(): void {
    console.log('Register attempt:', this.registerData);
    // Add your registration logic here
  }

  openTermsModal(event: Event): void {
    event.preventDefault();
    this.modalType = 'terms';
    this.modalTitle = 'Terms of Service';
    this.showModal = true;
  }

  openPrivacyModal(event: Event): void {
    event.preventDefault();
    this.modalType = 'privacy';
    this.modalTitle = 'Privacy Policy';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
