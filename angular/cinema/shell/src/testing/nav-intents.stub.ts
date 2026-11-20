import { bus } from '@softarc/native-federation-communication';
import type { NavIntents } from '../contracts';

// Plays the shell's part.
export const publishNavIntents = (intents: NavIntents): void =>
  bus.emit('nav:intents', intents);
