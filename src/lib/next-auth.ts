import { createUser, getUser } from "@/queries/user.query";
import { Role } from "@prisma/client";
import {
  getServerSession as nextAuthGetServerSession,
  type AuthOptions,
  type DefaultSession,
} from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import CognitoProvider from "next-auth/providers/cognito";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line no-unused-vars
  interface JWT extends DefaultJWT {
    id: string;
    image: string;
    accessToken: string;
    name: string;
    email: string;
    role: Role;
  }
}

export interface CognitoProfile extends Record<string, any> {
  sub: string;
  name: string;
  email: string;
  picture: string;
  id: string;
}

export const authOptions: AuthOptions = {
  theme: {
    colorScheme: "light",
    brandColor: "#E04E4E",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // A month (in seconds)
  },
  providers: [
    CognitoProvider({
      clientId: "4hnv187rfm9fkrnabvbamg54oc",
      clientSecret: "178s7f1kv3llv1iq8843rc8hhjdue50r2di1fe0f2n9bqec0s201",
      issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_dpIfWp356",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith("/")
        ? new URL(url, baseUrl).toString()
        : url;
      return redirectUrl;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      const user = await getUser({ email: token.email });
      if (!user) {
        return token;
      }
      token.name = user.name!;
      token.id = user.id;
      token.email = user.email;
      token.image = user.image!;
      token.role = user.role;
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (token.email && session.user) {
        session.user.email = token?.email;
        session.user.id = token?.id!;
        session.user.name = token?.name!;
        session.user.image = token.picture;
        session.user.role = token?.role!;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const findUser = await getUser({ email: user.email! });
      if (!findUser) {
        await createUser({
          id: profile?.sub!,
          email: user.email!,
          role: "USER",
          image: user.image!,
          name: user.name,
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerSession = () => nextAuthGetServerSession(authOptions);
