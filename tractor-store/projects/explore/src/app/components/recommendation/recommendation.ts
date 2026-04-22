import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RecoItem } from '../../services/explore-data.service';
import { imgSrc, imgSrcset } from '../../utils/image';

@Component({
  selector: 'app-recommendation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './recommendation.scss',
  template: `
    <li class="e_Recommendation">
      <a class="e_Recommendation_link" [href]="item().url">
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
  readonly item = input.required<RecoItem>();
  readonly imgSrc = computed(() => imgSrc(this.item().image, 200));
  readonly imgSrcset = computed(() => imgSrcset(this.item().image, [200, 400]));
}
