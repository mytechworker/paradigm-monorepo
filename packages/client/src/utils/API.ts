import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';
import https from 'https';
import { getApiURL } from '../utils/checkEnvironment';

const baseURL = getApiURL().concat('/api/v1');

// Custom agent is required to call SSG & SSR requests in production with SSL Verfication
// ([issue]: https://github.com/vercel/next.js/issues/21771)

// Custom HTTPS Agent
const HTTPS_Agent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  key: fs?.readFileSync('src/../cert/privkey.pem'),
  cert: fs?.readFileSync('src/../cert/cert.pem'),
  ca: fs?.readFileSync('src/../cert/paradigmresear_ch.ca-bundle', 'utf8'),
  passphrase: 'YYY',
});

const config: AxiosRequestConfig = {
  baseURL: baseURL,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  // },
};

const HTTPSConfig =
  process.env.NODE_ENV === 'production'
    ? ({
        ...config,
        httpsAgent: HTTPS_Agent,
      } as AxiosRequestConfig)
    : null;

const instance = axios.create(HTTPSConfig ?? config);

export default instance;
