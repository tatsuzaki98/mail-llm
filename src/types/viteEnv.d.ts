/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KINTONE_BASE_URL: string

  readonly VITE_MAILLOG_APP_ID: string
  readonly VITE_MAILLOG_APP_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
