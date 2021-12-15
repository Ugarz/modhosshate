import NextAuth from 'next-auth'
import TwitchProvider from "next-auth/providers/twitch";

const providerOverride = {
  id: "twitch-full",
  name: "Twitch",
  type: "oauth",
  wellKnown: "https://id.twitch.tv/oauth2/.well-known/openid-configuration",
  // https://next-auth.js.org/configuration/providers/oauth#options
  authorization:"https://id.twitch.tv/oauth2/authorize",
  userinfo: "https://id.twitch.tv/oauth2/userinfo",
  accessTokenUrl: "https://api.twitch.tv/helix/",
  profile(profile, tokens) {
    console.log("profile", profile)
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      accessToken: tokens.twitch.accessToken
    }
  },
}

export default NextAuth({
  // Secret only for dev purpose https://next-auth.js.org/configuration/options#secret
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  providers: [
    // OAuth authentication providers...
    TwitchProvider({
      clientId: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
      authorization: { params: { scope: "openid moderation:read moderator:manage:banned_users user:read:blocked_users user:manage:blocked_users user:read:email" } },
    }, providerOverride)
  ],
  callbacks: {
    async jwt({ token, user, account = {}, profile, isNewUser }) {
      if (account.provider && !token[account.provider]) {
        token[account.provider] = {}
      }
      if (account.access_token) {
        token[account.provider].accessToken = account.access_token
      }
      if (account.refresh_token) {
        token[account.provider].refreshToken = account.refresh_token
      }
      console.log("NEXTAUTH token", token)
      console.log("NEXTAUTH account", account)
      return token
    }
  }
})