import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { RecommendationService } from '../../data/recommendation.service';
import { RecommendationComponent } from '../../shared/components/recommendation/recommendation.component';

@Component({
  selector: 'app-recommendations',
  imports: [RecommendationComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class RecommendationsComponent {
  // Comma-separated, set as an attribute: <mfe-recommendations skus="CL-01-GY,AU-07-MT">
  readonly skus = input('');

  private readonly seedSkus = computed(() =>
    this.skus()
      .split(',')
      .map((sku) => sku.trim())
      .filter(Boolean),
  );

  private readonly recommendations = inject(RecommendationService).bySeedSkus(
    this.seedSkus,
  );
  protected readonly items = computed(() => this.recommendations.value() ?? []);
}
