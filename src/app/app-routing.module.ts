import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { BookingComponent } from './components/booking/booking.component';
import { ContactComponent } from './components/contact/contact.component';
import { HorairesComponent } from './components/horaires/horaires.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsDetailComponent } from './components/news/news-detail/news-detail.component';
import { NewsListComponent } from './components/news/news-list/news-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'horaires', component: HorairesComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'news', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: '**', redirectTo: '' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'disabled', // Disable to prevent unwanted anchor scrolling
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
