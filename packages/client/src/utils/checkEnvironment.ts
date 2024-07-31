export const getBaseURL = () => {
  let base_url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://paradigmresear.ch';

  return base_url;
};

export const getApiURL = () => {
  let api_url = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://paradigmresear.ch:7000';

  return api_url;
};
