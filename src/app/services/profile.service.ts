import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/profile';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Get authentication headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get user profile
  getProfile(): Observable<any> {
    console.log('🔍 Fetching user profile...');
    
    return this.http.get(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update user profile
  updateProfile(profileData: any): Observable<any> {
    console.log('📝 Updating user profile:', profileData);
    
    return this.http.put(`${this.apiUrl}/update`, profileData, {
      headers: this.getAuthHeaders()
    });
  }
}
