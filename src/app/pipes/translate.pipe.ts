import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef, Injectable } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false
})
@Injectable()
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription: Subscription;
  private lastValue: string = '';
  private lastKey: string = '';

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = this.translationService.currentLanguage$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(key: string, category?: string): string {
    const fullKey = category ? `${category}.${key}` : key;
    
    // Return cached value if key hasn't changed
    if (this.lastKey === fullKey) {
      return this.lastValue;
    }

    this.lastKey = fullKey;
    this.lastValue = this.translationService.t(fullKey);
    
    return this.lastValue;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
