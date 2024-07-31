declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_SERVER_URL: string;

      NEXT_PUBLIC_IFRAME_URL: string;
      NEXT_PUBLIC_IFRAMELY_SECRET: string;

      NEXT_PUBLIC_FB_APP_ID: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URI: string;

      TWITTER_CLIENT_ID: string;
      TWITTER_CLIENT_SECRET: string;
      TWITTER_REDIRECT_URI: string;

      TWITTER_API_KEY: string;
      TWITTER_API_SECRET_KEY: string;

      TWITTER_BEARER_TOKEN: string;
      TWITTER_BASE64_TOKEN: string;

      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      DISCORD_REDIRECT_URI: string;
    }
  }
}
