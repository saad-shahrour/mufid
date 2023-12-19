import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FaceBookProvider from "next-auth/providers/facebook"

import User from "@/app/models/User"

export const options = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        FaceBookProvider({
            profile(profile) {
                console.log(profile, "github");

                let userRole = "user";
                if (profile?.email == "m.saad.shahrour@gmail.com") {
                    userRole = "admin"
                }

                return {
                    ...profile,
                    role: userRole
                }
            },
            clientId: process.env.FACEBOOK_APPLICATION_ID,
            clientSecret: process.env.FACEBOOK_APPLICATION_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                // console.log(profile, "google");

                let userRole = "user";
                if (profile?.email == "m.saad.shahrour@gmail.com") {
                    userRole = "admin"  
                }

                // if (User.findOne({email: profile?.email})) {
                //     console.log();
                // }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            // add our role to the token
            if (user) token.role = user.role
            return token
        },
        async session({session, token}) {
            if (session?.user) session.user.role = token.role
            return session
        },
    },
    
}
