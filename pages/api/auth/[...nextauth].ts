import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../lib/prismadb'
import bcrypt from 'bcrypt'

export const nextOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any) {
        const { email, password } = credentials;

        if (!email || !password ) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Incorrect email or password");
        }
        
        if (!user.hashedPassword) {
          throw new Error("User password is not set");
        }

        const correctPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!correctPassword) {
          throw new Error("Incorrect password.");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
}

export default NextAuth(nextOptions);
