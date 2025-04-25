import bcrypt from "bcrypt";
import client from "@/lib/mongoAdapter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextAuthOptions, Session, User as TUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import connectDb from "@/lib/db";
import { User } from "@/models/user";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface User {
    email: string;
    image: string | null;
    id: string;
    name: string;
    isAdmin: boolean;
  }

  interface JWT {
    email: string;
    name: string;
    picture: string | null;
    sub: string;
    isAdmin: boolean;
  }
  interface Session {
    user: {
      isAdmin: boolean | undefined;
      id: string | null | undefined;
      image: string | null | undefined;
      name: string | null | undefined;
      email: string | null | undefined;
    };
  }
}
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isAdmin: profile.email === process.env.EMAIL,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isAdmin: profile.email === process.env.EMAIL,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const password = credentials?.password;
        const email = credentials?.email;
        let isAdmin = false;
        try {
          if (!email || !password) {
            throw new Error("The fields are required");
          }
          await connectDb();
          const user = await User.findOne({ email: email });
          if (!user) {
            throw new Error("User are not found, you need sign up first");
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            throw new Error("Password is incorrect");
          }
          if (email === process.env.EMAIL) isAdmin = true;
          return {
            name: user.name,
            email: email,
            id: user.id,
            image: null,
            isAdmin,
          };
        } catch (err) {
          throw new Error(
            err instanceof Error ? err.message : "Could not log you in"
          );
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 30,
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }: { token: JWT; user: TUser }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
