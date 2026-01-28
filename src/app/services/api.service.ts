import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Generic HTTP methods
  post<T>(endpoint: string, data: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  get<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers });
  }
}
