/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EVENT_ADDRESS?: string;
  readonly VITE_EVENT_CONTACT_EMAIL?: string;
  readonly VITE_EVENT_CONTACT_PHONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
