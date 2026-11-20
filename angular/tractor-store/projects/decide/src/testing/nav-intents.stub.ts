import { bus } from '@softarc/native-federation-communication';
import type { NavIntents } from '@tractor-store/contracts';

// Plays the host's part.
export const publishNavIntents = (intents: NavIntents): void =>
  bus.emit('nav:intents', intents);
