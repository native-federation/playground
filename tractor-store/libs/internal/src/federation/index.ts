import type { LoadRemoteModule } from '@softarc/native-federation-orchestrator';

export type { LoadRemoteModule } from '@softarc/native-federation-orchestrator';

export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;
  scope: string;
  cdnUrl: string;
}

export interface ComponentBootstrap {
  bootstrap: (
    env: EnvironmentConfig,
    loadRemoteModule: LoadRemoteModule,
  ) => Promise<void>;
}
