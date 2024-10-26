import { z } from "zod";

export const RegistrationFormSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email")
    .min(1, "Введите свой email "),
  firstName: z.string().min(1, "Введите ваше имя"),
  lastName: z.string().min(1, "Введите вашу фамиллию"),
  phoneNumber: z.string().min(1, "Введите ваш номер"),
  city: z.string().min(1, "required"),

  agreement: z.boolean().refine((val) => val === true, {
    message: "Вы должны принять пользовательское соглашение",
  }),
  password: z.string().min(6, "required"),
  passwordConfirmation: z.string().min(6, "required"),
});
