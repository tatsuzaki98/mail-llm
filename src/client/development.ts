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
