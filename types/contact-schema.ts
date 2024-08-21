import * as z from "zod";

const phoneRegex = new RegExp(
  /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/
);

export const ContactSchema = z.object({
  nume: z.string().min(1, {
    message: "Vă rugăm introducteți numele",
  }),

  prenume: z.string().min(1, {
    message: "Vă rugăm introducteți prenumele",
  }),
  email: z.string().email({
    message: "Vă rugăm introducteți o adresa de email validă",
  }),
  telefon: z
    .string()
    .regex(phoneRegex, "Vă rugăm introduceți un număr de telefon valid"),
  mesaj: z.string().min(1, {
    message: "Vă rugăm introducteți mesajul",
  }),
});
