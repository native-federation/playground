import { TestBed } from '@angular/core/testing';
import { bus } from '@softarc/native-federation-communication';
import { describe, expect, it } from 'vitest';
import { EventLog } from './event-log';

describe('EventLog', () => {
  it('logs every channel, newest first, with its kind', () => {
    const log = TestBed.inject(EventLog);
    bus.emit('booking:confirmed', { bookingRef: 'BR-1', ticketCount: 2 }, { retain: false });
    bus.emit('nav:navigate', { id: 'programme.list' }, { retain: false });
    bus.emit('nav:intents', { 'programme.list': '/programme' });

    expect(log.events().map(({ channel, kind }) => [channel, kind])).toEqual([
      ['nav:intents', 'state'],
      ['nav:navigate', 'command'],
      ['booking:confirmed', 'command'],
    ]);
    expect(JSON.parse(log.events()[2].value)).toEqual({ bookingRef: 'BR-1', ticketCount: 2 });
  });

  it('includes values retained before it started', () => {
    // The shell publishes nav:intents in an app initializer, before the panel renders.
    bus.emit('nav:intents', { 'programme.list': '/programme' });
    const log = TestBed.inject(EventLog);
    expect(log.events().map((event) => event.channel)).toEqual(['nav:intents']);
  });

  it('keeps the value as it was sent', () => {
    const log = TestBed.inject(EventLog);
    const intents: Record<string, string> = { 'programme.list': '/programme' };
    bus.emit('nav:intents', intents);
    intents['film.detail'] = '/film/{filmId}';
    expect(JSON.parse(log.events()[0].value)).toEqual({ 'programme.list': '/programme' });
  });

  it('keeps the latest 200 events', () => {
    const log = TestBed.inject(EventLog);
    for (let i = 0; i < 205; i++) bus.emit('test:tick', i, { retain: false });
    expect(log.events()).toHaveLength(200);
    expect(log.events()[0].value).toBe('204');
  });

  it('clears', () => {
    const log = TestBed.inject(EventLog);
    bus.emit('nav:navigate', { id: 'programme.list' }, { retain: false });
    log.clear();
    expect(log.events()).toEqual([]);
  });

  it('stops listening when destroyed', () => {
    const log = TestBed.inject(EventLog);
    TestBed.resetTestingModule();
    bus.emit('nav:navigate', { id: 'programme.list' }, { retain: false });
    expect(log.events()).toEqual([]);
  });
});
