import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HorairesComponent } from './components/horaires/horaires.component';
import { BookingComponent } from './components/booking/booking.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ModalComponent } from './components/modal/modal.component';
import { NewsDetailComponent } from './components/news/news-detail/news-detail.component';
import { NewsListComponent } from './components/news/news-list/news-list.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { BookingService } from './services/booking.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HorairesComponent,
    BookingComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    NewsDetailComponent,
    NewsListComponent,
    ScrollToTopComponent,
    SchedulesComponent,
    DashboardComponent,
    TranslatePipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    BookingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
