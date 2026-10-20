import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { App } from './app';

@Component({ template: '<p>routed page</p>' })
class RoutedPage {}

describe('App', () => {
  it('renders the active route', async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([{ path: 'page', component: RoutedPage }])],
    });
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/page');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('routed page');
  });
});
