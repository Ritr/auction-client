import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;
                await connectMongo();
                user = await User.find({
                    email: credentials.email,
                    password: credentials.password,
                });
                return user;
            },
        }),
    ],
});