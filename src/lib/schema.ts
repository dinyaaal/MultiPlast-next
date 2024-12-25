import { number, z } from "zod";

export const RegistrationFormSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Пароли должны быть одинаковые",
    path: ["passwordConfirmation"],
  });

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email")
    .min(1, "Введите свой email "),

  password: z.string().min(6, "required"),
  remember: z.boolean().optional(),
});

export const UserInfoSchema = z
  .object({
    first_name: z.string().min(1, "Введите ваше имя"),
    last_name: z.string().min(1, "Введите вашу фамилию"),
    middle_name: z.string().nullable().optional(),
    phone_number: z
      .string()
      .min(10, "Номер телефона должен содержать минимум 10 символов")
      .max(15, "Номер телефона не может быть длиннее 15 символов"),
    email: z
      .string()
      .email("Введите корректный email")
      .min(1, "Введите свой email "),
    city: z.string().min(1, "Введите ваш город"),
    name_of_enterprise: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    area: z.string().nullable().optional(),
    web_site: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    ig_link: z.string().nullable().optional(),
    fb_link: z.string().nullable().optional(),
    yt_link: z.string().nullable().optional(),
    tg_link: z.string().nullable().optional(),
    birthday_day: z.string().optional(),
    birthday_month: z.string().optional(),
    birthday_year: z.string().optional(),

    gender: z.string().nullable().optional(),
    oldPassword: z.string().nullable().optional(),
    newPassword: z.string().nullable().optional(),
    repeatPassword: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      const { oldPassword, newPassword, repeatPassword } = data;
      if (!oldPassword && !newPassword && !repeatPassword) {
        return true; // Все пустые, нет ошибок
      }
      if (oldPassword && newPassword && repeatPassword) {
        return newPassword === repeatPassword; // Все заполнены и пароли совпадают
      }
      return false; // Одно или два поля заполнены, но не все
    },
    {
      message:
        "Если одно из полей пароля заполнено, заполните все, и новый пароль должен совпадать с подтверждением.",
      path: ["newPassword"], // Указываем путь для удобства отображения ошибки
    }
  );

export const AdvertismentSchema = z.object({
  category_id: z.number(),
  description: z.string().optional(),
  title: z.string().min(1, { message: "Заголовок обязателен" }),
  photos: z.array(z.instanceof(File)).optional(),
  files: z.array(z.instanceof(File)).optional(),
  name_of_enterprise: z.string().min(1, "Обязательно"),
  city: z.string().min(1, "Введите ваш город"),
  address: z.string().min(1, "Введите ваш Адресс"),
  area: z.string().min(1, "Введите вашу область"),
  phone_number: z
    .string()
    .min(10, "Номер телефона должен содержать минимум 10 символов")
    .max(15, "Номер телефона не может быть длиннее 15 символов"),
  name: z.string().min(1, "Введите ваше имя"),
});
