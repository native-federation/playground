import { useCdn, useStyles } from '../../app';
import type { Recommendation } from '../../data/recommendation';
import { NavLink } from '../../shared/nav-intent';
import { recommendationTileStyles } from './recommendation-tile-styles';

export function RecommendationTile({ item }: { item: Recommendation }) {
  useStyles(recommendationTileStyles);
  const cdn = useCdn();

  return (
    <li className="e_Recommendation">
      <NavLink
        intent={item.link.intent}
        payload={item.link.params}
        className="e_Recommendation_link"
      >
        <img
          className="e_Recommendation_image"
          src={cdn.src(item.image, 200)}
          srcSet={cdn.srcSet(item.image, [200, 400])}
          alt=""
          sizes="200px"
          width={200}
          height={200}
        />
        <span className="e_Recommendation_name">{item.name}</span>
      </NavLink>
    </li>
  );
}
