import { exec } from 'child_process';

// eslint-disable-next-line no-undef
const env = process.env;

// from .env.local
const username = env.KINTONE_USERNAME;
const password = env.KINTONE_PASSWORD;

// from .env
const baseUrl = env.VITE_KINTONE_BASE_URL;
const appId = 20;

const command = `npx kintone-dts-gen --base-url ${baseUrl} -u ${username} -p ${password} --app-id ${appId} -o src/types/fields.d.ts`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stderr) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
})
