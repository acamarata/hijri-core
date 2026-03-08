import type { CalendarEngine } from './types';

const _engines = new Map<string, CalendarEngine>();

/**
 * Register a calendar engine under the given name.
 *
 * Once registered, the engine can be selected via `{ calendar: name }` in any
 * conversion function or retrieved directly with {@link getCalendar}.
 *
 * @param name - unique identifier for the calendar (e.g. 'uaq', 'fcna')
 * @param engine - an object implementing the {@link CalendarEngine} interface
 */
export function registerCalendar(name: string, engine: CalendarEngine): void {
  _engines.set(name, engine);
}

/**
 * Retrieve a registered calendar engine by name.
 *
 * @param name - the calendar identifier passed to {@link registerCalendar}
 * @returns the matching engine
 * @throws {Error} if no engine is registered under that name
 */
export function getCalendar(name: string): CalendarEngine {
  const engine = _engines.get(name);
  if (!engine) {
    const available = listCalendars().join(', ');
    throw new Error(
      `Unknown Hijri calendar: "${name}". Available: ${available}. Register custom calendars with registerCalendar().`,
    );
  }
  return engine;
}

/**
 * List the names of all registered calendar engines.
 *
 * @returns an array of calendar names (e.g. ['uaq', 'fcna'])
 */
export function listCalendars(): string[] {
  return Array.from(_engines.keys());
}
