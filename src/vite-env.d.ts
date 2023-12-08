/// <reference types="vite/client" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

interface ImportMetaEnv {
  readonly VITE_VERCEL_ANALYTICS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
