import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  role?: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  constructor(private apiService: ApiService) {
    this.loadStoredUser();
  }

  // Register new user
  register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/register', userData).pipe(
      tap(response => {
        if (response.success && response.user) {
          this.setCurrentUser(response.user, response.token);
        }
      })
    );
  }

  // Login user
  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => {
        if (response.success && response.user) {
          this.setCurrentUser(response.user, response.token);
        }
      })
    );
  }

  // Logout user
  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null && this.token !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get authentication token
  getToken(): string | null {
    return this.token;
  }

  // Get user role
  getUserRole(): string | null {
    return this.currentUser?.role || null;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  // Set current user and token
  private setCurrentUser(user: User, token?: string): void {
    this.currentUser = user;
    this.token = token || null;
    
    // Store in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  // Load stored user from localStorage
  private loadStoredUser(): void {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
      
      if (storedToken) {
        this.token = storedToken;
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
      this.logout();
    }
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone number (Tunisian format)
  validatePhone(phone: string): boolean {
    // Accept formats: 21234567, +21621234567, 0021621234567
    const phoneRegex = /^(\+216|00216)?[2-9]\d{7}$/;
    return phoneRegex.test(phone);
  }

  // Validate password strength
  validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Check if email is already registered
  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.apiService.get<{ exists: boolean }>(`/auth/check-email/${email}`);
  }

  // Update user profile
  updateProfile(userData: Partial<User>): Observable<AuthResponse> {
    return this.apiService.put<AuthResponse>('/auth/profile', userData).pipe(
      tap(response => {
        if (response.success && response.user) {
          this.setCurrentUser(response.user, this.token || undefined);
        }
      })
    );
  }

  // Change password
  changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.apiService.post<{ success: boolean; message: string }>('/auth/change-password', passwordData);
  }
}
