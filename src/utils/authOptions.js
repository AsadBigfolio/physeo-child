import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { User } from "@/models";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.AUTHCLINTID,
      clientSecret: process.env.AUTHCLINTSECRETID,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        const user = await User.findOne({ email });

        if (!user) throw new Error("User not found");

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  secret: "supersecretkey",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days,
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      const userExists = await User.findOne({ email: user.email });

      let newUser;

      if (!userExists) {
        newUser = await User.create({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          token: account?.access_token,
          provider: account?.provider,
          role: "user",
        });
      } else {
        newUser = await User.findOneAndUpdate(
          { email: user.email },
          { token: account?.access_token },
          { new: true }
        );
      }
      return newUser;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.userId = user.id;
      }
      if (user) {
        token.role = user.role
       }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.accessToken = token.access_token;
        session.user.id = token.userId;
        session.user.role = 'user';
      }
      return session;
    },
  },
};

export default authOptions;
