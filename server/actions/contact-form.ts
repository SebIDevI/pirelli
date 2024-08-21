"use server";
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
import { ContactSchema } from "@/types/contact-schema";

const action = createSafeActionClient();

export const contactForm = action(
  ContactSchema,
  async ({ email, nume, prenume, telefon, mesaj }) => {
    try {
      return {
        success: `${
          nume + " " + prenume
        } a trimis un email de pe adresa ${email}, nr tel: ${telefon} cu mesajul: ${mesaj}`,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        return { error: "A intervenit o eroare" };
      }
      throw error;
    }
  }
);
