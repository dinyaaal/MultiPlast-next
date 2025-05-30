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
  id: number; // Уникальный идентификатор пользователя
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

export interface Photo {
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

interface ProductCategory {
  id: number;
  name: string;
  parent_id: number | null;
  type: string;
  created_at: string | null;
  updated_at: string | null;
  position: number | null;
}

export interface Contact {
  id: number;
  product_id: number;
  name_of_enterprise: string | null;
  name: string;
  phone_number: string;
  address: string | null;
  city: string;
  area: string;
}
export interface ProductType {
  id: number;
  title: string;
  text: string;
  type_price: string;
  price: number;
  type_of_product: "sell" | "buy";
  volume: string;
  price_per_volume: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  categories: ProductCategory[];
  author: Author;
  photos: Photo[]; // Оставил массив, если структура фото изменится, лучше создать отдельный интерфейс
  files: any[]; // Если файлы имеют структуру, лучше заменить `any[]` на интерфейс
  contact: Contact; // Добавил контактные данные
}

// export interface ProductType {
//   id: number;
//   title: string;
//   text: string;
//   type_price: string;
//   price: number;
//   type_of_product: string;
//   user_id: number;
//   created_at: string;
//   updated_at: string;
//   categories: ProductCategory[];
//   author: Author;
//   photos: Photo[];
//   files: any[];
// }

export interface Author {
  id: number;
  first_name: string | null;
  last_name: string | null;
  avatar?: string;
}

export interface Page {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ForumCategory {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  position: number;
  pivot: {
    forum_id: number;
    forum_subject_id: number;
  };
}

export interface ForumPost {
  id: number;
  author_id: number;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;
  comments_count: number;
  views_count: number;
  categories: ForumCategory[];
  author: Author;
}

interface ChatUser {
  id: number;
  name: string | null;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  city: string;
  avatar: string;
  verify_cookie: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role_id: number;
  name_of_enterprise: string | null;
  address: string | null;
  area: string | null;
  web_site: string | null;
  country: string | null;
  ig_link: string | null;
  fb_link: string | null;
  yt_link: string | null;
  tg_link: string | null;
  gender: string | null;
  birthday: string | null;
  middle_name: string | null;
}

export interface ChatItemData {
  id: number;
  from_user_id: number;
  to_user_id: number;
  is_deleted: number;
  blocked_by_user_id: number | null;
  reported_by_user_id: number | null;
  report_reason: string | null;
  created_at: string;
  updated_at: string;
  from_user: ChatUser;
  to_user: ChatUser;
}

export interface CommentType {
  id: number;
  forum_id: number;
  user_id: number;
  text: string;
  like: number;
  created_at: string;
  updated_at: string;
  comments_count: number;
  is_liked: boolean;
  author: Author;
  photos: string[];
  replies?: Comment[];
}

export interface MessageType {
  message_content: string;
  from_user: User;
  chat_id: number;
}

export interface ForumCategory {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  position: number;
}

export type NotificationType = {
  id: number;
  title: string;
  content: string;
  to_user_id: number;
  is_read: 0 | 1; // <-- важно!
  type: number;
  read_at: string | null;
  root_id: number | null;
  created_at: string;
  updated_at: string;
  should_be_shown_in: string;
};
