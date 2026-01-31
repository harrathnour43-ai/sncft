import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, AuthResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
    remember: false
  };

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']).then(() => {
        // Refresh the page after successful navigation
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
      return;
    }

    // Check if redirected from registration
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'success') {
        this.successMessage = 'Registration successful! Please login with your new account.';
      }
    });
  }

  onLogin(): void {
    this.clearMessages();
    
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    const credentials = {
      email: this.loginData.email.trim().toLowerCase(),
      password: this.loginData.password
    };

    this.authService.login(credentials).subscribe({
      next: (response: AuthResponse) => {
        this.isLoading = false;
        
        if (response.success) {
          this.successMessage = 'Login successful! Welcome back!';
          
          // Handle remember me functionality
          if (this.loginData.remember) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }
          
          // Redirect to home page after a short delay
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              // Refresh the page after successful navigation
              setTimeout(() => {
                window.location.reload();
              }, 100);
            });
          }, 1000);
        } else {
          this.errorMessage = response.message || 'Login failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid login data. Please check your credentials.';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
      }
    });
  }

  validateForm(): boolean {
    if (!this.loginData.email.trim()) {
      this.errorMessage = 'Email is required';
      return false;
    }

    if (!this.authService.validateEmail(this.loginData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    if (!this.loginData.password) {
      this.errorMessage = 'Password is required';
      return false;
    }

    return true;
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
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

  // Helper method to check if field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginData[fieldName as keyof typeof this.loginData];
    return !field || field.toString().trim() === '';
  }

  // Navigate to registration page
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Navigate to forgot password page (placeholder)
  goToForgotPassword(event: Event): void {
    event.preventDefault();
    // TODO: Implement forgot password functionality
    console.log('Forgot password functionality not implemented yet');
  }
}
