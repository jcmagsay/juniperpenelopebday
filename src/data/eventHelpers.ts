import rawEvents from './events.json';
import { themeLibrary } from './themes';
import type { EventConfig, ThemeTokens } from '../types/event';

const sharedPrivateEventFields = {
  address: import.meta.env.VITE_EVENT_ADDRESS,
  contactEmail: import.meta.env.VITE_EVENT_CONTACT_EMAIL,
  contactPhone: import.meta.env.VITE_EVENT_CONTACT_PHONE
};

export const events = (rawEvents as EventConfig[]).map((event) => {
  return {
    ...event,
    event: {
      ...event.event,
      address: sharedPrivateEventFields.address || event.event.address,
      rsvp: {
        ...event.event.rsvp,
        contactEmail: sharedPrivateEventFields.contactEmail || event.event.rsvp.contactEmail,
        contactPhone: sharedPrivateEventFields.contactPhone || event.event.rsvp.contactPhone
      }
    }
  };
});

export function getCurrentEventConfig(): EventConfig {
  return events.find((event) => event.isCurrent) ?? events[0];
}

export function getUpcomingEvents(): EventConfig[] {
  const now = Date.now();
  return [...events]
    .filter((event) => event.isCurrent || new Date(event.event.date).getTime() >= now)
    .sort((a, b) => new Date(a.event.date).getTime() - new Date(b.event.date).getTime());
}

export function getPastEvents(): EventConfig[] {
  const upcomingYears = new Set(getUpcomingEvents().map((event) => event.year));
  return [...events]
    .filter((event) => !upcomingYears.has(event.year))
    .sort((a, b) => new Date(b.event.date).getTime() - new Date(a.event.date).getTime());
}

export function getEventByYear(year: number): EventConfig | undefined {
  return events.find((event) => event.year === year);
}

export function getEventBySlug(slug: string): EventConfig | undefined {
  return events.find((event) => event.slug === slug);
}

export function getThemeTokens(event: EventConfig): ThemeTokens {
  const tokens = themeLibrary[event.themeKey];
  if (!event.customColors) return tokens;

  return {
    ...tokens,
    palette: {
      ...tokens.palette,
      primary: event.customColors.primary ?? tokens.palette.primary,
      secondary: event.customColors.secondary ?? tokens.palette.secondary,
      accent: event.customColors.accent ?? tokens.palette.accent,
      highlight: event.customColors.highlight ?? tokens.palette.highlight
    }
  };
}

export function isValidGoogleFormEmbed(url?: string): boolean {
  return Boolean(url && url.includes('docs.google.com/forms') && url.includes('embedded=true'));
}

function formatIcsDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');

  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate())
  ].join('') + 'T' + [
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds())
  ].join('') + 'Z';
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function downloadCalendarInvite(eventConfig: EventConfig): void {
  const { event, slug } = eventConfig;
  const start = new Date(event.date);
  const end = new Date(event.endTime);
  const createdAt = formatIcsDate(new Date());
  const fileSafeSlug = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const description = event.description.join('\n');
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Juniper Penelope Birthday//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${fileSafeSlug}-${start.getTime()}@juniperpenelope.party`,
    `DTSTAMP:${createdAt}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(event.eventName)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(event.address)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `juniper-penelope-party.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
