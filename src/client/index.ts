import * as dev from './development';
import * as prod from './production';

const isDev = import.meta.env.DEV;

export const getMailLogRecords = isDev ? dev.getMailLogRecords : prod.getMailLogRecords;
