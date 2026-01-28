import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: 'en' | 'fr' | 'ar';
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export interface Translations {
  [category: string]: {
    [language: string]: {
      [key: string]: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<'en' | 'fr' | 'ar'>('en');
  public currentLanguage$: Observable<'en' | 'fr' | 'ar'> = this.currentLanguageSubject.asObservable();

  private languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇹🇳', dir: 'rtl' }
  ];

  private translations: Translations = {
    // Navigation
    nav: {
      en: {
        home: 'Home',
        about: 'About',
        schedules: 'Schedules',
        booking: 'Booking',
        contact: 'Contact',
        login: 'Login',
        register: 'Register',
        dashboard: 'Dashboard',
        profile: 'My Profile',
        myBookings: 'My Bookings',
        logout: 'Logout'
      },
      fr: {
        home: 'Accueil',
        about: 'À Propos',
        schedules: 'Horaires',
        booking: 'Réservation',
        contact: 'Contact',
        login: 'Connexion',
        register: 'S\'inscrire',
        dashboard: 'Tableau de bord',
        profile: 'Mon Profil',
        myBookings: 'Mes Réservations',
        logout: 'Déconnexion'
      },
      ar: {
        home: 'الرئيسية',
        about: 'من نحن',
        schedules: 'الجداول الزمنية',
        booking: 'الحجز',
        contact: 'اتصل بنا',
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب',
        dashboard: 'لوحة التحكم',
        profile: 'ملفي الشخصي',
        myBookings: 'حجوزاتي',
        logout: 'تسجيل الخروج'
      }
    },

    // Home Page
    home: {
      en: {
        heroTitle: 'Your Journey Starts Here',
        heroSubtitle: 'Travel comfortably and safely with SNCFT - Tunisia\'s national railway company',
        searchPlaceholder: 'Enter destination...',
        searchButton: 'Search Trains',
        quickBooking: 'Quick Booking',
        from: 'From',
        to: 'To',
        departureDate: 'Departure Date',
        returnDate: 'Return Date',
        passengers: 'Passengers',
        search: 'Search',
        bookNow: 'Book Now',
        featuresTitle: 'Why Choose SNCFT?',
        featuresSubtitle: 'Experience the best railway travel in Tunisia',
        feature1Title: 'Comfortable Travel',
        feature1Desc: 'Modern trains with comfortable seating and air conditioning',
        feature2Title: 'Affordable Prices',
        feature2Desc: 'Competitive prices for all destinations across Tunisia',
        feature3Title: 'Reliable Service',
        feature3Desc: 'On-time departures and arrivals you can count on',
        newsTitle: 'Latest News & Updates',
        alertsTitle: 'Service Alerts',
        viewAllNews: 'View All News',
        viewAllAlerts: 'View All Alerts',
        learnMore: 'Learn More',
        bookTicket: 'Book Ticket',
        viewSchedule: 'View Schedule'
      },
      fr: {
        heroTitle: 'Votre Voyage Commence Ici',
        heroSubtitle: 'Voyagez confortablement et en toute sécurité avec la SNCFT - La compagnie ferroviaire nationale de Tunisie',
        searchPlaceholder: 'Entrez la destination...',
        searchButton: 'Rechercher les Trains',
        quickBooking: 'Réservation Rapide',
        from: 'De',
        to: 'À',
        departureDate: 'Date de Départ',
        returnDate: 'Date de Retour',
        passengers: 'Passagers',
        search: 'Rechercher',
        bookNow: 'Réserver Maintenant',
        featuresTitle: 'Pourquoi Choisir la SNCFT?',
        featuresSubtitle: 'Découvrez le meilleur voyage ferroviaire en Tunisie',
        feature1Title: 'Voyage Confortable',
        feature1Desc: 'Trains modernes avec des sièges confortables et la climatisation',
        feature2Title: 'Prix Abordables',
        feature2Desc: 'Prix compétitifs pour toutes les destinations à travers la Tunisie',
        feature3Title: 'Service Fiable',
        feature3Desc: 'Départs et arrivées à l\'heure sur lesquels vous pouvez compter',
        newsTitle: 'Dernières Nouvelles & Mises à Jour',
        alertsTitle: 'Alertes de Service',
        viewAllNews: 'Voir Toutes les Nouvelles',
        viewAllAlerts: 'Voir Toutes les Alertes',
        learnMore: 'En Savoir Plus',
        bookTicket: 'Réserver un Billet',
        viewSchedule: 'Voir l\'Horaire'
      },
      ar: {
        heroTitle: 'رحلتك تبدأ من هنا',
        heroSubtitle: 'سافر براحة وأمان مع الشركة الوطنية للسكك الحديدية - الشركة الوطنية للسكك الحديدية بتونس',
        searchPlaceholder: 'أدخل الوجهة...',
        searchButton: 'البحث عن القطارات',
        quickBooking: 'حجز سريع',
        from: 'من',
        to: 'إلى',
        departureDate: 'تاريخ المغادرة',
        returnDate: 'تاريخ العودة',
        passengers: 'الركاب',
        search: 'بحث',
        bookNow: 'احجز الآن',
        featuresTitle: 'لماذا تختار الشركة الوطنية للسكك الحديدية؟',
        featuresSubtitle: 'اختبر أفضل رحلة سكك حديدية في تونس',
        feature1Title: 'سفر مريح',
        feature1Desc: 'قطارات حديثة مع مقاعد مريحة وتكييف الهواء',
        feature2Title: 'أسعار معقولة',
        feature2Desc: 'أسعار تنافسية لجميع الوجهات عبر تونس',
        feature3Title: 'خدمة موثوقة',
        feature3Desc: 'مواعيد المغادرة والوصول في الوقت المحدد التي يمكنك الاعتماد عليها',
        newsTitle: 'آخر الأخبار والتحديثات',
        alertsTitle: 'تنبيهات الخدمة',
        viewAllNews: 'عرض كل الأخبار',
        viewAllAlerts: 'عرض كل التنبيهات',
        learnMore: 'اعرف المزيد',
        bookTicket: 'احجز تذكرة',
        viewSchedule: 'عرض الجدول الزمني'
      }
    },

    // Common
    common: {
      en: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        reset: 'Reset',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        view: 'View',
        download: 'Download',
        print: 'Print',
        share: 'Share',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        name: 'Name',
        date: 'Date',
        time: 'Time',
        price: 'Price',
        duration: 'Duration',
        distance: 'Distance',
        available: 'Available',
        unavailable: 'Unavailable',
        yes: 'Yes',
        no: 'No',
        or: 'or',
        and: 'and',
        of: 'of',
        in: 'in',
        to: 'to',
        from: 'from',
        at: 'at',
        on: 'on',
        by: 'by',
        for: 'for',
        with: 'with',
        without: 'without'
      },
      fr: {
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        save: 'Enregistrer',
        edit: 'Modifier',
        delete: 'Supprimer',
        close: 'Fermer',
        back: 'Retour',
        next: 'Suivant',
        previous: 'Précédent',
        submit: 'Soumettre',
        reset: 'Réinitialiser',
        search: 'Rechercher',
        filter: 'Filtrer',
        sort: 'Trier',
        view: 'Voir',
        download: 'Télécharger',
        print: 'Imprimer',
        share: 'Partager',
        email: 'Email',
        phone: 'Téléphone',
        address: 'Adresse',
        name: 'Nom',
        date: 'Date',
        time: 'Heure',
        price: 'Prix',
        duration: 'Durée',
        distance: 'Distance',
        available: 'Disponible',
        unavailable: 'Indisponible',
        yes: 'Oui',
        no: 'Non',
        or: 'ou',
        and: 'et',
        of: 'de',
        in: 'dans',
        to: 'à',
        from: 'de',
        at: 'à',
        on: 'sur',
        by: 'par',
        for: 'pour',
        with: 'avec',
        without: 'sans'
      },
      ar: {
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجح',
        cancel: 'إلغاء',
        confirm: 'تأكيد',
        save: 'حفظ',
        edit: 'تعديل',
        delete: 'حذف',
        close: 'إغلاق',
        back: 'رجوع',
        next: 'التالي',
        previous: 'السابق',
        submit: 'إرسال',
        reset: 'إعادة تعيين',
        search: 'بحث',
        filter: 'تصفية',
        sort: 'ترتيب',
        view: 'عرض',
        download: 'تحميل',
        print: 'طباعة',
        share: 'مشاركة',
        email: 'بريد إلكتروني',
        phone: 'هاتف',
        address: 'عنوان',
        name: 'اسم',
        date: 'تاريخ',
        time: 'وقت',
        price: 'سعر',
        duration: 'مدة',
        distance: 'مسافة',
        available: 'متاح',
        unavailable: 'غير متاح',
        yes: 'نعم',
        no: 'لا',
        or: 'أو',
        and: 'و',
        of: 'من',
        in: 'في',
        to: 'إلى',
        from: 'من',
        at: 'في',
        on: 'على',
        by: 'بواسطة',
        for: 'لـ',
        with: 'مع',
        without: 'بدون'
      }
    }
  };

  constructor() {
    this.loadSavedLanguage();
  }

  private loadSavedLanguage(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage') as 'en' | 'fr' | 'ar';
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      this.currentLanguageSubject.next(savedLanguage);
    }
    this.updateDocumentDirection();
  }

  getCurrentLanguage(): 'en' | 'fr' | 'ar' {
    return this.currentLanguageSubject.value;
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  getCurrentLanguageInfo(): Language {
    return this.languages.find(lang => lang.code === this.getCurrentLanguage())!;
  }

  changeLanguage(language: 'en' | 'fr' | 'ar'): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('selectedLanguage', language);
    this.updateDocumentDirection();
  }

  private updateDocumentDirection(): void {
    const currentLang = this.getCurrentLanguage();
    const langInfo = this.languages.find(lang => lang.code === currentLang);
    if (langInfo) {
      document.documentElement.dir = langInfo.dir;
      document.documentElement.lang = currentLang;
    }
  }

  translate(category: string, key: string): string {
    const currentLang = this.getCurrentLanguage();
    const translation = this.translations[category]?.[currentLang]?.[key];
    return translation || `${category}.${key}`;
  }

  // Helper method for direct translation
  t(key: string): string {
    // Split the key by dots to get category and translation key
    const parts = key.split('.');
    if (parts.length === 2) {
      return this.translate(parts[0], parts[1]);
    }
    return key;
  }

  // Get all translations for a category
  getCategoryTranslations(category: string): { [key: string]: string } {
    const currentLang = this.getCurrentLanguage();
    return this.translations[category]?.[currentLang] || {};
  }

  // Check if current language is RTL
  isRTL(): boolean {
    return this.getCurrentLanguageInfo().dir === 'rtl';
  }

  // Get text direction for CSS
  getTextDirection(): 'ltr' | 'rtl' {
    return this.getCurrentLanguageInfo().dir;
  }
}
