import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { CredentialsProvider } from "next-auth/providers";
import clientPromise from "../../../lib/mongodb";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Username", type: "email", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      const email = credentials.email;
      const password = credentials.password;
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("You haven't registered yet");
      }
      if (user) return signinUser({ password, user });
    },
  }),
  adapter: MongoDBAdapter(clientPromise),
});
