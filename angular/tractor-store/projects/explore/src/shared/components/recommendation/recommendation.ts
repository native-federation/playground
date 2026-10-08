import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavigateToDirective } from '@tractor-store/shared';
import type { RecommendationModel } from '../../../core/data/contracts/models/recommendation.model';

@Component({
  selector: 'app-recommendation',
  imports: [NgOptimizedImage, NavigateToDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './recommendation.scss',
  template: `
    <li class="e_Recommendation">
      <a
        class="e_Recommendation_link"
        [appNavigateTo]="item().link.intent"
        [navPayload]="item().link.params ?? {}"
      >
        <img
          class="e_Recommendation_image"
          [ngSrc]="item().image"
          ngSrcset="200w, 400w"
          alt=""
          sizes="200px"
          width="200"
          height="200"
        />
        <span class="e_Recommendation_name">{{ item().name }}</span>
      </a>
    </li>
  `,
})
export class RecommendationComponent {
  readonly item = input.required<RecommendationModel>();
}
