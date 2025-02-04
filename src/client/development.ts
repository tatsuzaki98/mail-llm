import axios from 'axios';
import { getAPIKeyFromAppId } from './utils';

const baseUrl = "/k/v1";
const getHeaders = (query: string) => {
  const url = new URL(query, window.location.origin);
  const params = new URLSearchParams(url.search);
  const app = params.get('app');
  const api_key = getAPIKeyFromAppId(app);
  return {'X-Cybozu-API-Token': api_key as string};
}

export const getMailLogRecords = async (query: string): Promise<{records: MailLogRecord[]}> => {
  return axios.get(`${baseUrl}/${query}`, {headers: getHeaders(query)})
      .then((response) => response.data);
}

export const postMailLogRecord = async (record: PostRecord): Promise<void> => {
  console.log(record);
  const recordToPost = {
    app: record.app,
    record: {
      '受信メッセージ': {value: record.record['受信メッセージ'].value},
      '送信メッセージ': {value: record.record['送信メッセージ'].value},
      '対応者': {value: record.record['対応者'].value},
      'お客様名': {value: record.record['お客様名'].value},
      'カテゴリ': {value: record.record['カテゴリ'].value},
    }
  };
  const headers = getHeaders(`/record.json?app=${record.app}`);
  console.log(headers);
  return axios.post(`${baseUrl}/record.json`, recordToPost, {headers: getHeaders(`/record.json?app=${record.app}`)})
      .then((response) => response.data);
}
