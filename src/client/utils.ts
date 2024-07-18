export const getAPIKeyFromAppId = (app: string | null) => {
  switch (app) {
    case import.meta.env.VITE_MAILLOG_APP_ID:
      return import.meta.env.VITE_MAILLOG_APP_TOKEN;
    default:
      return '';
  }
}
