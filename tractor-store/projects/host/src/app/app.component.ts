import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MODULE_LOADER } from './app.config';

interface RemoteBootstrap {
  bootstrap: (cfg: {
    production: boolean;
    apiUrl: string;
    scope: string;
    imageServer: string;
  }) => Promise<void>;
}

const apiUrl = 'http://localhost:4200';
const imageServer = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  private loader = inject(MODULE_LOADER);

  constructor() {
    void this.loadRemote('@tractor-store/explore', 'http://localhost:4201');
    void this.loadRemote('@tractor-store/decide', 'http://localhost:4202');
    void this.loadRemote('@tractor-store/checkout', 'http://localhost:4203');
  }

  private async loadRemote(name: string, scope: string): Promise<void> {
    try {
      const mod = await this.loader
        .as<RemoteBootstrap>()
        .loadRemoteModule(name, './Component');
      await mod.bootstrap({ production: false, apiUrl, scope, imageServer });
    } catch (err) {
      console.error(`Failed to load remote ${name}`, err);
    }
  }
}
