import { bus } from '@softarc/native-federation-communication';
import type { NavResolver } from '../contracts';

// Plays the host's part.
export const publishNavResolver = (resolve: NavResolver): void =>
  bus.emit('nav:resolve', resolve);
