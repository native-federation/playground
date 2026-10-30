import { useStyles } from '../../app';
import { getRecommendationsBySeedSkus } from '../../data/recommendation';
import { useAsync } from '../../shared/use-async';
import { RecommendationTile } from './RecommendationTile';
import { recommendationsStyles } from './recommendations-styles';

// `skus` is the comma-separated attribute of <mfe-recommendations>.
export function Recommendations({ skus = '' }: { skus?: string }) {
  useStyles(recommendationsStyles);

  const seeds = skus
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const { value, error } = useAsync(
    () => getRecommendationsBySeedSkus(seeds),
    [seeds.join(',')],
  );
  const items = value ?? [];

  if (error) {
    return (
      <div className="e_Recommendations" data-boundary="explore">
        <h2>Recommendations</h2>
        <p role="alert">Recommendations are temporarily unavailable.</p>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="e_Recommendations" data-boundary="explore">
      <h2>Recommendations</h2>
      <ul className="e_Recommendations_list">
        {items.map((item) => (
          <RecommendationTile key={item.sku} item={item} />
        ))}
      </ul>
    </div>
  );
}
