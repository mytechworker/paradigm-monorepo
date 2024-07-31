import { getApiURL } from '../utils/checkEnvironment';

export default {
  APP_URL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_URL : 'http://localhost:3000',
  SERVER_BASE_URL: getApiURL(),
  UPLOAD_DIR: (process.env.NEXT_PUBLIC_SERVER_URL as string).concat('/uploads'),
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION as string,
};
