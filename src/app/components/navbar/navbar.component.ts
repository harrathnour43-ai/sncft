import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLanguageDropdownOpen = false;
  currentLanguage: 'en' | 'fr' | 'ar' = 'en';
  currentRoute: string = '';

  translationsData = {
    en: {
      home: 'Home',
      about: 'About',
      schedules: 'Schedules',
      booking: 'Booking',
      contact: 'Contact',
      login: 'Login',
      register: 'Register'
    },
    fr: {
      home: 'Accueil',
      about: 'À Propos',
      schedules: 'Horaires',
      booking: 'Réservation',
      contact: 'Contact',
      login: 'Connexion',
      register: 'S\'inscrire'
    },
    ar: {
      home: 'الرئيسية',
      about: 'من نحن',
      schedules: 'الجداول الزمنية',
      booking: 'الحجز',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب'
    }
  };

  languageInfo = {
    en: { flag: '🇬🇧', name: 'English', dir: 'ltr' },
    fr: { flag: '🇫🇷', name: 'Français', dir: 'ltr' },
    ar: { flag: '🇹🇳', name: 'العربية', dir: 'rtl' }
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Load saved language preference or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') as 'en' | 'fr' | 'ar';
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    }
    this.updateDocumentDirection();
    
    // Set initial route
    this.currentRoute = this.router.url;
    
    // Subscribe to route changes
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  get currentLanguageFlag(): string {
    return this.languageInfo[this.currentLanguage].flag;
  }

  get currentLanguageName(): string {
    return this.languageInfo[this.currentLanguage].name;
  }

  get translations() {
    return this.translationsData[this.currentLanguage];
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Close language dropdown when menu is toggled
    if (this.isMenuOpen) {
      this.isLanguageDropdownOpen = false;
    }
  }

  toggleLanguageDropdown(event: Event): void {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    event.stopPropagation();
  }

  changeLanguage(lang: 'en' | 'fr' | 'ar'): void {
    this.currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    this.updateDocumentDirection();
    this.isLanguageDropdownOpen = false;
    
    // Emit language change event for other components
    this.onLanguageChange();
  }

  private updateDocumentDirection(): void {
    const dir = this.languageInfo[this.currentLanguage].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = this.currentLanguage;
  }

  private onLanguageChange(): void {
    // This method can be used to notify other components of language changes
    // You could implement a service for this if needed
    console.log(`Language changed to: ${this.currentLanguage}`);
  }

  isRouteActive(route: string): boolean {
    // Handle home route specially
    if (route === '/') {
      return this.currentRoute === '/' || this.currentRoute === '' || this.currentRoute.startsWith('/?');
    }
    
    // For other routes, check exact match or starts with route
    return this.currentRoute === route || 
           this.currentRoute.startsWith(route + '/') ||
           (route !== '/' && this.currentRoute.startsWith(route));
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-switcher')) {
      this.isLanguageDropdownOpen = false;
    }
  }
}
