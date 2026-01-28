import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User, AuthResponse } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
  
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  validationErrors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onRegister(): void {
    this.clearMessages();
    
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    const userData = {
      firstName: this.registerData.firstName.trim(),
      lastName: this.registerData.lastName.trim(),
      email: this.registerData.email.trim().toLowerCase(),
      phone: this.registerData.phone.trim(),
      password: this.registerData.password
    };

    this.authService.register(userData).subscribe({
      next: (response: AuthResponse) => {
        this.isLoading = false;
        
        if (response.success) {
          this.successMessage = 'Registration successful! Please login to continue.';
          
          // Clear form
          this.registerData = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            terms: false
          };
          
          // Redirect to login page after a short delay
          setTimeout(() => {
            this.router.navigate(['/login'], { queryParams: { registered: 'success' } });
          }, 2000);
        } else {
          this.errorMessage = response.message || 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        
        if (error.status === 409) {
          this.errorMessage = 'Email already registered. Please use a different email or login.';
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid registration data. Please check your information.';
        } else {
          this.errorMessage = 'Registration failed. Please try again later.';
        }
      }
    });
  }

  validateForm(): boolean {
    this.validationErrors = [];

    // First name validation
    if (!this.registerData.firstName.trim()) {
      this.validationErrors.push('First name is required');
    } else if (this.registerData.firstName.trim().length < 2) {
      this.validationErrors.push('First name must be at least 2 characters long');
    }

    // Last name validation
    if (!this.registerData.lastName.trim()) {
      this.validationErrors.push('Last name is required');
    } else if (this.registerData.lastName.trim().length < 2) {
      this.validationErrors.push('Last name must be at least 2 characters long');
    }

    // Email validation
    if (!this.registerData.email.trim()) {
      this.validationErrors.push('Email is required');
    } else if (!this.authService.validateEmail(this.registerData.email)) {
      this.validationErrors.push('Please enter a valid email address');
    }

    // Phone validation
    if (!this.registerData.phone.trim()) {
      this.validationErrors.push('Phone number is required');
    } else if (!this.authService.validatePhone(this.registerData.phone)) {
      this.validationErrors.push('Please enter a valid Tunisian phone number');
    }

    // Password validation
    if (!this.registerData.password) {
      this.validationErrors.push('Password is required');
    } else {
      const passwordValidation = this.authService.validatePassword(this.registerData.password);
      if (!passwordValidation.isValid) {
        this.validationErrors.push(...passwordValidation.errors);
      }
    }

    // Confirm password validation
    if (!this.registerData.confirmPassword) {
      this.validationErrors.push('Please confirm your password');
    } else if (this.registerData.password !== this.registerData.confirmPassword) {
      this.validationErrors.push('Passwords do not match');
    }

    // Terms validation
    if (!this.registerData.terms) {
      this.validationErrors.push('You must accept the Terms of Service and Privacy Policy');
    }

    if (this.validationErrors.length > 0) {
      this.errorMessage = 'Please fix the following errors:';
      return false;
    }

    return true;
  }

  checkEmailAvailability(): void {
    const email = this.registerData.email.trim();
    
    if (email && this.authService.validateEmail(email)) {
      this.authService.checkEmailExists(email).subscribe({
        next: (response) => {
          if (response.exists) {
            this.errorMessage = 'This email is already registered. Please use a different email or login.';
          }
        },
        error: (error) => {
          console.error('Email check error:', error);
        }
      });
    }
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

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.validationErrors = [];
  }

  // Toggle password visibility
  togglePassword(fieldId: string): void {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    }
  }

  // Helper methods for form validation feedback
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerData[fieldName as keyof typeof this.registerData];
    return !field || field.toString().trim() === '';
  }

  getPasswordStrength(): { strength: number; color: string; text: string } {
    const password = this.registerData.password;
    if (!password) return { strength: 0, color: 'gray', text: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const strengthMap = {
      0: { color: 'gray', text: '' },
      1: { color: 'red', text: 'Very Weak' },
      2: { color: 'orange', text: 'Weak' },
      3: { color: 'yellow', text: 'Fair' },
      4: { color: 'blue', text: 'Good' },
      5: { color: 'green', text: 'Strong' }
    };

    return {
      strength,
      ...strengthMap[strength as keyof typeof strengthMap]
    };
  }
}
