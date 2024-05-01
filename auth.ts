import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { fetchUserByEMail } from "@/app/lib/sql/data/fetch";
import { Role, User } from "@/app/lib/definitions";
import NextAuth, { DefaultSession } from "next-auth";

export const { auth, signIn, signOut } = NextAuth( {
  ...authConfig,
  providers: [
    Credentials( {
      async authorize ( credentials )
      {
        const parsedCredentials: z.SafeParseReturnType<{ email: string, password: string }, {
          email: string,
          password: string,
        }> = z.object( {
          email:    z.string().email(),
          password: z.string().min( 6 ),
        } ).safeParse( credentials );
        
        if ( parsedCredentials.success )
        {
          const { email, password }: { email: string, password: string } = parsedCredentials.data;
          const user: User | undefined = await fetchUserByEMail( email );
          if ( !user ) return null;
          const passwordsMatch: boolean = await bcrypt.compare( password, user.password );
          
          if ( passwordsMatch ) return user;
        }
        
        console.log( "Invalid credentials" );
        return null;
      },
    } ),
  ],
} );