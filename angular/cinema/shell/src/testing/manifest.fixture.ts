import type { FederationManifest } from '@softarc/native-federation-orchestrator';

export const testManifest: FederationManifest = {
  '@cinema/programme': 'http://localhost:4301/remoteEntry.json',
  '@cinema/seating': 'http://localhost:4303/remoteEntry.json',
};
