import NextAuth from "next-auth/next";
import axiosInstance from "@/axios.config";

// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = await NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    const { data } = await axiosInstance.post('/public/auth/login', {
                        email,
                        password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    console.log(data);

                    return {
                        email,
                        role: data.isCoordinator ? 'coordinator' : data?.role,
                        token: data.token
                    }
                } catch (error) {
                    throw new Error('Invalid credentials')
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                return {
                    ...token,
                    role: user.role,
                    accessToken: user.token,
                    email: user.email
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                    token: token.accessToken,
                    email: token.email
                }
            }
        }
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
        newUser: '/auth/signup'
    }
})


export { handler as GET, handler as POST }