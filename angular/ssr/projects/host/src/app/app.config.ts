import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';

import { commonConfig } from './app.config.common';
import { LOAD_REMOTE_MODULE, LoadRemoteModule } from './load-remote-module.token';

const browserLoader: LoadRemoteModule = (remoteName, exposedModule) =>
  loadRemoteModule({ remoteName, exposedModule });

const browserConfig: ApplicationConfig = {
  providers: [{ provide: LOAD_REMOTE_MODULE, useValue: browserLoader }],
};

export const appConfig = mergeApplicationConfig(commonConfig, browserConfig);
