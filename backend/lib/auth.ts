import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        workspace: {
          label: "Workspace",
          type: "text",
        },

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.workspace ||
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const workspace =
          await prisma.workspace.findUnique({
            where: {
              slug: credentials.workspace,
            },
          });

        if (!workspace || workspace.deletedAt) {
          return null;
        }

        const user =
          await prisma.user.findUnique({
            where: {
              workspaceId_email: {
                workspaceId: workspace.id,
                email: credentials.email,
              },
            },
          });

        if (!user || user.deletedAt) {
          return null;
        }

        const passwordMatch =
          await compare(
            credentials.password,
            user.passwordHash
          );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          workspaceId: user.workspaceId,
          workspaceSlug: workspace.slug,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.workspaceId = user.workspaceId;
        token.workspaceSlug = user.workspaceSlug;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as any;
        session.user.workspaceId =
          token.workspaceId as string;
        session.user.workspaceSlug =
          token.workspaceSlug as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};