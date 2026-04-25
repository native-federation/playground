import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExploreDataService } from '../../services/explore-data.service';
import { RecommendationsComponent } from '../../components/recommendations/recommendations';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { imgSrc, imgSrcset } from '../../utils/image';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RecommendationsComponent, HeaderComponent, FooterComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-boundary-page': 'explore' },
})
export class HomePage {
  private readonly data = inject(ExploreDataService);

  readonly teasers = computed(() =>
    this.data.teaser().map((t) => ({
      ...t,
      src: imgSrc(t.image, 500),
      srcset: imgSrcset(t.image, [500, 1000]),
    })),
  );

  readonly seedSkus: string[] = ['CL-01-GY', 'AU-07-MT'];
}
