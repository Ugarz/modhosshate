import NextAuth from 'next-auth'
import TwitchProvider from "next-auth/providers/twitch";

export default NextAuth({
  // Secret only for dev purpose https://next-auth.js.org/configuration/options#secret
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  providers: [
    // OAuth authentication providers...
    TwitchProvider({
      clientId: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET,
      authorization: { params: { scope: "openid moderation:read moderator:manage:banned_users user:read:blocked_users user:manage:blocked_users user:read:email" } },
    }, {
      id: "twitch-full",
      name: "Twitch",
      type: "oauth",
      wellKnown: "https://id.twitch.tv/oauth2/.well-known/openid-configuration",
      // https://next-auth.js.org/configuration/providers/oauth#options
      idToken: true,
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
          accessToken: tokens.accessTokenUrl,
          userinfo: tokens.userinfo
        }
      },
    })
  ]
})