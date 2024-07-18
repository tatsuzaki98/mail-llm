import { KintoneRestAPIClient } from "@kintone/rest-api-client";

const client = new KintoneRestAPIClient({
  baseUrl: import.meta.env.VITE_KINTONE_BASE_URL,
});

const parseQuery = (query: string): { app: number; id: number } => {
  const url = new URL(query, window.location.origin);
  const params = new URLSearchParams(url.search);
  return {
    app: Number(params.get("app")),
    id: Number(params.get("id")),
  };
};

export const getMailLogRecords = async (query: string): Promise<{ records: MailLogRecord[] }> => {
  return client.record
    .getAllRecords({ app: parseQuery(query).app })
    .then((response) => {
      return { records: response as unknown as MailLogRecord[] };
    });
};
