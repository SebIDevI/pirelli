"use server";
import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { accounts, twoFactorTokens, users } from "../schema";
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "./tokens";
import { sendTwoFactorTokenByEmail, sendVerificationEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

const action = createSafeActionClient();

export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email || !existingUser) {
        return { error: "Email-ul nu a fost găsit" };
      }

      const existingAcc = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      if (existingAcc?.provider === "google") {
        return { error: "Contul este autentificat prin google" };
      }

      if (!existingUser!.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser!.email
        );
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );
        return { success: "Confirmarea email-ului a fost trimisă" };
      }

      if (existingUser?.twoFactorEnabled && existingUser.email) {
        if (code) {
          const twoFactorToken = await getTwoFactorTokenByEmail(
            existingUser.email
          );
          if (!twoFactorToken) {
            return { error: "Niciun token" };
          }
          if (twoFactorToken.token !== code) {
            return { error: "Token invalid" };
          }
          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if (hasExpired) {
            return { error: "Token-ul a expirat" };
          }
          await db
            .delete(twoFactorTokens)
            .where(eq(twoFactorTokens.id, twoFactorToken.id));
        } else {
          const token = await generateTwoFactorToken(existingUser.email);
          if (!token) return { error: "Token-ul nu a fost generat" };
          await sendTwoFactorTokenByEmail(token[0].email, token[0].token);
          return { twoFactor: "Token-ul doi factori a fost setat cu succes!" };
        }
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
      });

      return { success: email };
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email sau parolă incorecte" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "A intervenit o eroare" };
        }
      }
      throw error;
    }
  }
);
