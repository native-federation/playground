import { remoteApp } from '../../core/remote-app';
import { RecommendationsComponent } from './recommendations.component';

export const bootstrap = remoteApp.expose(
  'mfe-recommendations',
  RecommendationsComponent,
);
