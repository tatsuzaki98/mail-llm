import { exec } from 'child_process';

// eslint-disable-next-line no-undef
const env = process.env;

// from .env
const baseUrl = env.VITE_KINTONE_BASE_URL;

// from .env.local
const username = env.KINTONE_USERNAME;
const password = env.KINTONE_PASSWORD;

const command = `kintone-customize-uploader --base-url ${baseUrl} --username ${username} --password ${password} kintone-scripts/customize-manifest.json`;

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
