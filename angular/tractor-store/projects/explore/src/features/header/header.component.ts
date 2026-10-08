import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  RemoteElementDirective,
  NavigateToDirective,
} from '@tractor-store/shared';
import { NavigationComponent } from '../../shared/components/navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RemoteElementDirective,
    NavigationComponent,
    NavigateToDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {}
