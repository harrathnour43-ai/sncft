import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('🔐 === HTTP INTERCEPTOR ===');
    console.log('📋 Original request:', request.url);
    console.log('🎫 Token available:', !!this.authService.getToken());
    
    const token = this.authService.getToken();
    
    if (token) {
      // Clone the request and add the Authorization header
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      
      console.log('✅ Authorization header added');
      console.log('📋 Modified request:', authReq.url);
      console.log('🎫 Headers:', authReq.headers.keys());
      
      return next.handle(authReq);
    }
    
    console.log('⚠️ No token available, proceeding without Authorization header');
    return next.handle(request);
  }
}
