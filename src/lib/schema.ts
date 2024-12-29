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
  })
  .refine(
    (data) => {
      const { birthday_day, birthday_month, birthday_year } = data;
      const hasAny = birthday_day || birthday_month || birthday_year;
      const allFilled =
        birthday_day?.trim() && birthday_month?.trim() && birthday_year?.trim();
      return !hasAny || allFilled;
    },
    {
      message: "Если вы заполнили одно поле даты рождения, заполните все три",
      path: ["birthday_day"],
    }
  );

export const UserSecuritySchema = z
  .object({
    oldPassword: z.string().min(6, "Введите старый пароль"), // обязательное поле
    newPassword: z.string().min(6, "Введите новый пароль"), // обязательное поле
    repeatPassword: z.string().min(6, "Повторите новый пароль"), // обязательное поле
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Новый пароль и его повтор должны совпадать",
    path: ["repeatPassword"], // ошибка будет привязана к полю repeatPassword
  });

export const AdvertismentSchema = z
  .object({
    mainCategory: z.string(),
    polymer: z.string().optional(),
    type: z.string().optional(),
    title: z.string().min(1, { message: "Заголовок обязателен" }),
    text: z.string().optional(),

    name_of_enterprise: z.string().min(1, "Обязательно"),
    city: z.string().min(1, "Введите ваш город"),
    address: z.string().min(1, "Введите ваш Адресс"),
    area: z.string().min(1, "Введите вашу область"),
    phone_number: z
      .string()
      .min(10, "Номер телефона должен содержать минимум 10 символов")
      .max(15, "Номер телефона не может быть длиннее 15 символов"),
    name: z.string().min(1, "Введите ваше имя"),
    price: z.string().optional(),
    volume: z.string().optional(),
    volume_price: z.string().optional(),
    arrangement: z.boolean(),
  })
  .refine(
    (data) => {
      if (["1", "2"].includes(data.mainCategory) && !data.polymer) {
        return false;
      }
      return true;
    },
    {
      message: "Поле polymer обязательно для категорий 1 и 2",
      path: ["polymer"],
    }
  )
  .refine(
    (data) => {
      if (["2", "3", "4", "5"].includes(data.mainCategory) && !data.type) {
        return false;
      }
      return true;
    },
    {
      message: "Поле type обязательно для категорий 2, 3, 4 и 5",
      path: ["type"],
    }
  )
  .refine((data) => data.arrangement || data.price, {
    message: "Price is required when arrangement is false.",
    path: ["price"],
  });
