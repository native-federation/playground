import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavigateToDirective } from '@internal/events';
import { beforeEach, describe, expect, it } from 'vitest';
import { NavigationComponent } from './navigation';

describe('NavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders one link per top-level nav entry', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(2);
  });

  it('declares the explore.products and explore.stores intents', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
    const intents = fixture.debugElement
      .queryAll(By.directive(NavigateToDirective))
      .map((d) => d.injector.get(NavigateToDirective).navigateTo());
    expect(intents).toEqual(['explore.products', 'explore.stores']);
  });
});
