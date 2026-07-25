// Environment variables type definitions for Angular

interface ImportMetaEnv {
  readonly VITE_USE_API?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend the global namespace for import.meta
declare global {
  interface Window {
    env?: {
      VITE_USE_API?: string;
      VITE_API_BASE_URL?: string;
    };
  }
}
