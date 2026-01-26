import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  activeTab: 'longDistance' | 'suburban' = 'longDistance';
  showModal: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';

  // Filter properties
  selectedDepartureCity: string = '';
  selectedArrivalCity: string = '';
  selectedTrainType: string = '';

  // Translations
  translations = {
    schedules: 'Train Schedules',
    schedulesSubtitle: 'Find timetables for all SNCFT train services',
    longDistanceLines: 'Long-Distance Lines',
    tunisSuburbanLines: 'Tunis Suburban Lines',
    longDistanceDescription: 'Inter-city trains connecting major Tunisian cities',
    suburbanDescription: 'Suburban trains serving the Tunis metropolitan area',
    departureCity: 'Departure City',
    arrivalCity: 'Arrival City',
    trainType: 'Train Type',
    allCities: 'All Cities',
    allTypes: 'All Types',
    days: 'Days',
    details: 'Details',
    north: 'North',
    south: 'South',
    firstTrain: 'First Train',
    lastTrain: 'Last Train',
    frequency: 'Frequency',
    serviceDays: 'Service Days'
  };

  // Long-distance trains data
  longDistanceTrains = [
    {
      id: 1,
      number: 'GL 101',
      type: 'Grand Ligne',
      departureCity: 'Tunis',
      departureStation: 'Tunis Marine',
      departureTime: '06:30',
      arrivalCity: 'Sfax',
      arrivalStation: 'Sfax Ville',
      arrivalTime: '09:45',
      duration: '3h 15m',
      days: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: true },
        { name: 'Sun', active: false }
      ]
    },
    {
      id: 2,
      number: 'GL 102',
      type: 'Grand Ligne',
      departureCity: 'Tunis',
      departureStation: 'Tunis Marine',
      departureTime: '08:00',
      arrivalCity: 'Sousse',
      arrivalStation: 'Sousse Bab Jedid',
      arrivalTime: '10:30',
      duration: '2h 30m',
      days: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: true },
        { name: 'Sun', active: true }
      ]
    },
    {
      id: 3,
      number: 'R 201',
      type: 'Rapide',
      departureCity: 'Tunis',
      departureStation: 'Tunis Marine',
      departureTime: '07:15',
      arrivalCity: 'Bizerte',
      arrivalStation: 'Bizerte Ville',
      arrivalTime: '09:00',
      duration: '1h 45m',
      days: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: false },
        { name: 'Sun', active: false }
      ]
    },
    {
      id: 4,
      number: 'GL 103',
      type: 'Grand Ligne',
      departureCity: 'Tunis',
      departureStation: 'Tunis Marine',
      departureTime: '10:30',
      arrivalCity: 'Gabès',
      arrivalStation: 'Gabès',
      arrivalTime: '14:45',
      duration: '4h 15m',
      days: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: true },
        { name: 'Sun', active: false }
      ]
    },
    {
      id: 5,
      number: 'R 202',
      type: 'Rapide',
      departureCity: 'Sfax',
      departureStation: 'Sfax Ville',
      departureTime: '11:00',
      arrivalCity: 'Tunis',
      arrivalStation: 'Tunis Marine',
      arrivalTime: '14:15',
      duration: '3h 15m',
      days: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: true },
        { name: 'Sun', active: true }
      ]
    }
  ];

  // Suburban lines data
  suburbanLines = [
    {
      id: 1,
      lineNumber: 'L1',
      name: 'Tunis Marine - La Marsa',
      color: '#e74c3c',
      northTerminus: 'La Marsa',
      southTerminus: 'Tunis Marine',
      firstTrain: '05:00',
      lastTrain: '23:30',
      frequency: '15-20 minutes',
      serviceDays: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: true },
        { name: 'Sun', active: true }
      ]
    },
    {
      id: 2,
      lineNumber: 'L2',
      name: 'Tunis Marine - Borj Cédria',
      color: '#3498db',
      northTerminus: 'Tunis Marine',
      southTerminus: 'Borj Cédria',
      firstTrain: '05:30',
      lastTrain: '22:45',
      frequency: '20-30 minutes',
      serviceDays: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: true },
        { name: 'Sun', active: true }
      ]
    },
    {
      id: 3,
      lineNumber: 'L3',
      name: 'Tunis Marine - El Mourouj',
      color: '#2ecc71',
      northTerminus: 'Tunis Marine',
      southTerminus: 'El Mourouj',
      firstTrain: '06:00',
      lastTrain: '21:30',
      frequency: '25-35 minutes',
      serviceDays: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: false },
        { name: 'Sun', active: false }
      ]
    },
    {
      id: 4,
      lineNumber: 'L4',
      name: 'Tunis Marine - Manouba',
      color: '#f39c12',
      northTerminus: 'Tunis Marine',
      southTerminus: 'Manouba',
      firstTrain: '05:45',
      lastTrain: '22:00',
      frequency: '30-40 minutes',
      serviceDays: [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: true },
        { name: 'Sat', active: true },
        { name: 'Sun', active: true }
      ]
    }
  ];

  // Filtered data
  filteredLongDistanceTrains = this.longDistanceTrains;

  // Computed properties
  get departureCities(): string[] {
    return [...new Set(this.longDistanceTrains.map(train => train.departureCity))].sort();
  }

  get arrivalCities(): string[] {
    return [...new Set(this.longDistanceTrains.map(train => train.arrivalCity))].sort();
  }

  get trainTypes(): string[] {
    return [...new Set(this.longDistanceTrains.map(train => train.type))].sort();
  }

  ngOnInit(): void {
    this.filterLongDistanceTrains();
  }

  switchTab(tab: 'longDistance' | 'suburban'): void {
    this.activeTab = tab;
  }

  filterLongDistanceTrains(): void {
    this.filteredLongDistanceTrains = this.longDistanceTrains.filter(train => {
      const matchesDeparture = !this.selectedDepartureCity || 
        train.departureCity === this.selectedDepartureCity;
      const matchesArrival = !this.selectedArrivalCity || 
        train.arrivalCity === this.selectedArrivalCity;
      const matchesType = !this.selectedTrainType || 
        train.type === this.selectedTrainType;
      
      return matchesDeparture && matchesArrival && matchesType;
    });
  }

  getTrainIcon(type: string): string {
    switch (type) {
      case 'Grand Ligne':
        return '🚄';
      case 'Rapide':
        return '🚆';
      case 'Direct':
        return '🚅';
      default:
        return '🚂';
    }
  }

  showTrainDetails(train: any): void {
    this.modalTitle = `Train ${train.number} - ${train.type}`;
    this.modalContent = `
      <div class="train-details">
        <div class="detail-row">
          <strong>Route:</strong> ${train.departureCity} → ${train.arrivalCity}
        </div>
        <div class="detail-row">
          <strong>Departure:</strong> ${train.departureTime} from ${train.departureStation}
        </div>
        <div class="detail-row">
          <strong>Arrival:</strong> ${train.arrivalTime} at ${train.arrivalStation}
        </div>
        <div class="detail-row">
          <strong>Duration:</strong> ${train.duration}
        </div>
        <div class="detail-row">
          <strong>Days of Operation:</strong> ${train.days.filter((d: any) => d.active).map((d: any) => d.name).join(', ')}
        </div>
      </div>
    `;
    this.showModal = true;
  }

  showLineDetails(line: any): void {
    this.modalTitle = `Line ${line.lineNumber} - ${line.name}`;
    this.modalContent = `
      <div class="line-details">
        <div class="detail-row">
          <strong>Route:</strong> ${line.northTerminus} ↔ ${line.southTerminus}
        </div>
        <div class="detail-row">
          <strong>First Train:</strong> ${line.firstTrain}
        </div>
        <div class="detail-row">
          <strong>Last Train:</strong> ${line.lastTrain}
        </div>
        <div class="detail-row">
          <strong>Frequency:</strong> ${line.frequency}
        </div>
        <div class="detail-row">
          <strong>Service Days:</strong> ${line.serviceDays.filter((d: any) => d.active).map((d: any) => d.name).join(', ')}
        </div>
      </div>
    `;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.modalTitle = '';
    this.modalContent = '';
  }
}
