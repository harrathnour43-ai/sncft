import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() type: 'terms' | 'privacy' = 'terms';
  @Input() title: string = 'Terms of Service';
  @Output() closeModalEvent = new EventEmitter<void>();
  
  scrollPosition: number = 0;

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onClose(): void {
    this.closeModal();
  }

  // Handle escape key
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isVisible) {
      this.closeModal();
    }
  }
}
