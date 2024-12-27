export interface SubCategory {
  id: number;
  parent_id: number;
  name: string;
  type: string;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  categories: SubCategory[];
}

export interface User {
  id: number | null; // Уникальный идентификатор пользователя
  first_name: string; // Имя
  last_name: string; // Фамилия
  middle_name: string | null; // Отчество (может быть null)
  phone_number: string; // Номер телефона
  email: string; // Электронная почта
  city: string; // Город
  photo: Photo; // URL аватара пользователя
  name_of_enterprise: string | null; // Название предприятия (может быть null)
  address: string | null; // Адрес (может быть null)
  area: string | null; // Район (может быть null)
  web_site: string | null; // Сайт пользователя (может быть null)
  country: string | null; // Страна (может быть null)
  ig_link: string | null; // Ссылка на Instagram (может быть null)
  fb_link: string | null; // Ссылка на Facebook (может быть null)
  yt_link: string | null; // Ссылка на YouTube (может быть null)
  tg_link: string | null; // Ссылка на Telegram (может быть null)
  birthday: string | null; // День рождения (может быть null, формат ISO)
  gender: string | null; // Пол (может быть null)
}

interface Photo {
  id: number;
  name: string;
  path: string;
  url: string;
  type: string;
  mime_type: string;
  size: number;
  fileable_type: string;
  fileable_id: number;
  created_at: string;
  updated_at: string;
}
