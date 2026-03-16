export type PartyThemeKey = 'stranger-things' | 'space' | 'jungle' | 'princess' | 'superhero' | 'lilo' | 'moana';

export type RSVP = {
  enabled: boolean;
  mode: 'none' | 'embed';
  embedUrl?: string;
  buttonLabel?: string;
  helperText?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

export type EventDetails = {
  eventName: string;
  ageTurning: number;
  date: string;
  endTime: string;
  location: string;
  address: string;
  description: string[];
  menu: string[];
  beverages: string[];
  activities: string[];
  notes: string[];
  rsvp: RSVP;
};

export type EventConfig = {
  year: number;
  slug: string;
  password: string;
  isCurrent: boolean;
  themeKey: PartyThemeKey;
  customColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    highlight?: string;
  };
  backgroundImage: string;
  postcardImage: string;
  event: EventDetails;
};

export type ThemeTokens = {
  title: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    paper: string;
    textGlow: string;
  };
  overlay: string;
  fonts: {
    display: string;
    body: string;
  };
};
