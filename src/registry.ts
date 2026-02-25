import type { CalendarEngine } from './types';

const _engines = new Map<string, CalendarEngine>();

export function registerCalendar(name: string, engine: CalendarEngine): void {
  _engines.set(name, engine);
}

export function getCalendar(name: string): CalendarEngine {
  const engine = _engines.get(name);
  if (!engine) {
    const available = listCalendars().join(', ');
    throw new Error(
      `Unknown Hijri calendar: "${name}". Available: ${available}. Register custom calendars with registerCalendar().`
    );
  }
  return engine;
}

export function listCalendars(): string[] {
  return Array.from(_engines.keys());
}
