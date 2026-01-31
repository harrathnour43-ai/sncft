import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any = null;
  isLoading = false;
  isEditing = false;
  successMessage = '';
  errorMessage = '';

  // Profile form data
  profileData = {
    fullName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    if (this.currentUser) {
      // Load profile from API
      this.profileService.getProfile().subscribe({
        next: (response) => {
          console.log('✅ Profile loaded from database:', response);
          if (response.success && response.data) {
            this.profileData = {
              fullName: response.data.fullName || 'Harrath Nour',
              email: response.data.email || 'harrathnour43@gmail.com',
              phoneNumber: response.data.phoneNumber || '29332527'
            };
          }
        },
        error: (error) => {
          console.error('❌ Error loading profile from database:', error);
          // Fallback to localStorage or default values
          this.profileData = {
            fullName: this.currentUser.fullName || 'Harrath Nour',
            email: this.currentUser.email || 'harrathnour43@gmail.com',
            phoneNumber: this.currentUser.phoneNumber || '29332527'
          };
        }
      });
    }
  }

  enableEditing(): void {
    this.isEditing = true;
    this.clearMessages();
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.loadUserProfile(); // Reset to original data
    this.clearMessages();
  }

  updateProfile(): void {
    this.clearMessages();
    
    // Validate form
    if (!this.validateProfileForm()) {
      return;
    }

    this.isLoading = true;

    // Update profile via API (PRIMARY METHOD)
    this.profileService.updateProfile(this.profileData).subscribe({
      next: (response) => {
        console.log('✅ Profile updated in database:', response);
        this.isLoading = false;
        this.isEditing = false;
        this.successMessage = 'Profile updated successfully in database!';
        
        // Update currentUser with new data from database
        if (response.success && response.data) {
          this.currentUser = {
            ...this.currentUser,
            fullName: response.data.fullName,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber
          };
          
          // Update localStorage only to keep frontend in sync
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('❌ Error updating profile in database:', error);
        this.isLoading = false;
        
        if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Invalid profile data. Please check your inputs.';
        } else if (error.status === 401) {
          this.errorMessage = 'You are not authorized to update this profile.';
        } else if (error.status === 404) {
          this.errorMessage = 'User not found.';
        } else {
          this.errorMessage = 'Failed to update profile in database. Please try again later.';
          
          // FALLBACK: Update localStorage if database fails
          console.log('🔄 Fallback: Updating localStorage...');
          const updatedUser = {
            ...this.currentUser,
            fullName: this.profileData.fullName,
            email: this.profileData.email,
            phoneNumber: this.profileData.phoneNumber
          };
          
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUser = updatedUser;
          this.isEditing = false;
          this.successMessage = 'Profile updated locally (database unavailable).';
          
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      }
    });
  }

  validateProfileForm(): boolean {
    if (!this.profileData.fullName.trim()) {
      this.errorMessage = 'Full name is required';
      return false;
    }

    if (!this.profileData.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }

    if (!this.authService.validateEmail(this.profileData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    if (!this.profileData.phoneNumber.trim()) {
      this.errorMessage = 'Phone number is required';
      return false;
    }

    // Basic phone number validation (Tunisian numbers)
    const phoneRegex = /^[2-9]\d{7}$/;
    if (!phoneRegex.test(this.profileData.phoneNumber.replace(/\s/g, ''))) {
      this.errorMessage = 'Please enter a valid Tunisian phone number (8 digits starting with 2-9)';
      return false;
    }

    return true;
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  navigateToDashboard(): void {
    this.router.navigate(['/']);
  }

  // Helper method to check if field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileData[fieldName as keyof typeof this.profileData];
    return !field || field.toString().trim() === '';
  }

  // Helper methods for profile display
  getInitials(): string {
    const name = this.profileData.fullName || 'User';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  getMemberSince(): string {
    // Default to current date, in a real app this would come from user data
    return new Date().getFullYear().toString();
  }

  getLastUpdated(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
