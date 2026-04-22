import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RecommendationComponent } from '../recommendation/recommendation';
import { RecommendationService } from '../../services/recommendation.service';

function parseSkus(v: unknown): string[] {
  if (Array.isArray(v)) return v as string[];
  if (typeof v === 'string') {
    return v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

@Component({
  selector: 'app-recommendations',
  imports: [RecommendationComponent],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent {
  private readonly recoSvc = inject(RecommendationService);

  readonly skus = input<string[], unknown>([], {
    alias: 'skus',
    transform: parseSkus,
  });

  readonly items = computed(() => this.recoSvc.recosForSkus(this.skus()));
}
