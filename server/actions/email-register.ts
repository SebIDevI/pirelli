"use server";

import { RegisterSchema } from "@/types/register-schema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { accounts, users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, password, name }) => {
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // check existing user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      const existingAcc = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      if (existingAcc?.provider === "google") {
        return { error: "Contul este deja autentificat prin google" };
      }
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Confirmarea email-ului a fost retrimisă" };
      }
      return { error: "Email deja folosit" };
    }

    await db.insert(users).values({
      email: email,
      name: name,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token
    );

    return { success: "Confirmarea email-ului a fost trimisă" };
  }
);
