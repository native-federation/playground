import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { NavigateToDirective } from '@internal/events';
import type { RecommendationModel } from '../../../core/data/contracts/models/recommendation.model';
import { ResourceService } from '../../utils/resource.service';

@Component({
  selector: 'app-recommendation',
  imports: [NavigateToDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './recommendation.scss',
  template: `
    <li class="e_Recommendation">
      <a
        class="e_Recommendation_link"
        [navigateTo]="item().link.intent"
        [navParams]="item().link.params ?? {}"
      >
        <img
          class="e_Recommendation_image"
          [src]="imgSrc()"
          [srcset]="imgSrcset()"
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
  private readonly image = inject(ResourceService);

  readonly item = input.required<RecommendationModel>();
  readonly imgSrc = computed(() => this.image.imgSrc(this.item().image, 200));
  readonly imgSrcset = computed(() =>
    this.image.imgSrcset(this.item().image, [200, 400]),
  );
}
