import NextAuth from 'next-auth'
import TwitchProvider from 'next-auth/providers/twitch'

async function refreshAccessToken(token) {
  const scopes = process.env.NEXT_PUBLIC_TWITCH_SCOPES.replaceAll(',', ' ')

  try {
    const refreshAccessTokenUrl = `https://id.twitch.tv/oauth2/token--data-urlencode?grant_type=refresh_token&refresh_token=${token.refreshToken}&client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET}&scope=${scopes}`

    const response = await fetch(refreshAccessTokenUrl, {
      headers: {
        "Accept": "application/json",
      },
      method: "POST",
    })
    const refreshedTokens = await response.json()
    console.log("refreshedTokens", refreshedTokens)

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log("\n -- ERROR", error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}


export default NextAuth({
  // Secret only for dev purpose https://next-auth.js.org/configuration/options#secret
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  providers: [
    // OAuth authentication providers...
    TwitchProvider(
      {
        clientId: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
        wellKnown: 'https://id.twitch.tv/oauth2/.well-known/openid-configuration',
        authorization: 'https://id.twitch.tv/oauth2/authorize',
        userinfo: 'https://id.twitch.tv/oauth2/userinfo',
        accessTokenUrl: 'https://api.twitch.tv/helix/',
        authorization: {
          params: {
            scope:
              'openid moderation:read moderator:manage:banned_users user:read:blocked_users user:manage:blocked_users user:read:email',
          },
        },
      }
    ),
  ],
  callbacks: {
    async jwt({token, user, account}) {
      // if (account.provider && !token[account.provider]) {
      //   token[account.provider] = {}
      // }
      // if (account.access_token) {
      //   token[account.provider].accessToken = account.access_token
      // }
      // if (account.refresh_token) {
      //   token[account.provider].refreshToken = account.refresh_token
      // }
      // return token
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({session, token}) {
      console.log("all", token)
      session.token = token.accessToken
      session.user = token.user
      return session
    }

  },
})
