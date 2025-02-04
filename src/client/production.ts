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


// export const postMailLogRecord = async (record: MailLogRecord): Promise<void> => {
//   const recordParam = {
//     "受信メッセージ": { value: record.受信メッセージ },
//     "送信メッセージ": { value: record.送信メッセージ },
//     "対応者": { value: record.対応者 },
//     "お客様名": { value: record.お客様名 },
//     "カテゴリ": { value: record.カテゴリ },
//   };
//   return client.record
//     .addRecord({ app: import.meta.env.VITE_MAILLOG_APP_ID, recordParam })
//     .then(() => {});
// }
