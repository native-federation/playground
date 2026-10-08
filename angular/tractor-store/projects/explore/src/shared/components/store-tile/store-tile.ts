import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { StoreModel } from '../../../core/data/contracts/models/store.model';

@Component({
  selector: 'app-store-tile',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li class="e_Store">
      <div class="e_Store_content">
        <img
          class="e_Store_image"
          [ngSrc]="store().image"
          width="200"
          height="200"
          alt=""
        />
        <p class="e_Store_address">
          {{ store().name }}<br />
          {{ store().street }}<br />
          {{ store().city }}
        </p>
      </div>
    </li>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .e_Store {
        margin: 0;
      }
      .e_Store_image {
        display: block;
        max-width: 200px;
        width: 100%;
        height: auto;
      }
      .e_Store_address {
        margin: 1rem 0;
      }
    `,
  ],
})
export class StoreTileComponent {
  readonly store = input.required<StoreModel>();
}
