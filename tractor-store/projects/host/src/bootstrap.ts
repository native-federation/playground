import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NativeFederationResult } from '@softarc/native-federation-orchestrator';
import { EnvironmentConfig } from '@internal/federation';

export const bootstrap = (
  nf: NativeFederationResult,
  env: EnvironmentConfig & { manifest: Record<string, string> },
) =>
  bootstrapApplication(AppComponent, appConfig(nf, env)).catch((err) =>
    console.error(err),
  );
