import axios from 'axios';

//#region Discord OAuth2 Flow Helpers (https://discord.com/developers/docs/topics/oauth2)

const discordClientId = process.env.DISCORD_CLIENT_ID as string;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET as string;
const discordRedirectUri = process.env.DISCORD_REDIRECT_URI as string;

export function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    client_id: discordClientId,
    redirect_uri: discordRedirectUri,
    response_type: 'code',
    scope: 'identify email',
  });

  return `https://discordapp.com/oauth2/authorize?${params.toString()}`;
}

export async function getDiscordUser(code: string) {
  try {
    const response = await axios.get(process.env.BASE_URL + `/api/auth/exchangeToken?type=discord&code=${code}`);

    return response.data;
  } catch (err) {
    console.error(`>>> ERROR:`, (err as unknown as any).message);
  }
}

//#endregion

//#region  Google OAuth2 Flow Helpers (https://developers.google.com/identity/protocols/oauth2)

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI as string;

export const getGoogleAuthUrl = () => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const params = new URLSearchParams({
    redirect_uri: googleRedirectUri,
    client_id: googleClientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' ',
    ),
  });

  return `${rootUrl}?${params.toString()}`;
};

// new function to exchange token & fetch user info from google
export async function getGoogleUser(code: string) {
  try {
    const response = await axios.get(process.env.BASE_URL + `/api/auth/exchangeToken?type=google&code=${code}`);

    return response.data;
  } catch (err) {
    console.error(`>>> ERROR:`, (err as unknown as any).message);
  }
}

//#endregion

//#region Twitter OAuth2 Flow Helpers (https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens)

const twitterClientId = process.env.TWITTER_CLIENT_ID as string;
const twitterClientSecret = process.env.TWITTER_CLIENT_SECRET as string;
const twitterRedirectUri = process.env.TWITTER_REDIRECT_URI as string;

// create a getTwitterAuthUrl function that returns the url to redirect the user to for twitter auth (https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens)

export const getTwitterAuthUrl = () => {
  const rootUrl = `https://twitter.com/i/oauth2/authorize`;

  const params = new URLSearchParams({
    response_type: 'code',
    redirect_uri: twitterRedirectUri,
    client_id: twitterClientId,
    scope: ['users.read', 'tweet.read', 'follows.read', 'follows.write', 'offline.access'].join(' '),
    state: 'state',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
  });

  return `${rootUrl}?${params.toString()}`;
};

// create a getTwitterOauthToken function that returns the oauth_token and oauth_token_secret (https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens)

export async function getTwitterUser(code: string) {
  try {
    const response = await axios.get(process.env.BASE_URL + `/api/auth/exchangeToken?type=twitter&code=${code}`);

    return response.data;
  } catch (err) {
    console.error(`>>> ERROR:`, (err as unknown as any).message);
  }
}

//#endregion
