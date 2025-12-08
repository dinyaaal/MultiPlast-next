export interface Translations {
  name: {
    en: string;
    ukr: string;
    ru: string;
  };
}

export interface SubCategory {
  id: number;
  parent_id: number;
  name: string;
  type: string;
  translations: Translations;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  categories: SubCategory[];
  translations: Translations;
}

export interface UserAuth {
  id: number;
  access_token: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  phone_number: string;
  avatar: string;
  remember: boolean;
}

export interface User {
  id: number; // Уникальный идентификатор пользователя
  first_name: string; // Имя
  last_name: string; // Фамилия
  middle_name: string | null; // Отчество (может быть null)
  phone_number: string; // Номер телефона
  email: string; // Электронная почта
  city: string; // Город
  avatar: string;
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
  photos: Photo[];
}

export interface StaticData {
  id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
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
export interface ProductContact {
  id: number;
  product_id: number;
  name_of_enterprise: string | null;
  name: string;
  phones?: string[];
  address: string | null;
  city: string;
  area: string;
  position: string | null;
}
export interface ProductType {
  id: number;
  title: string;
  text: string;
  type_price: string;
  price: number;
  type_of_product: "sell" | "buy";
  volume: string | null;
  price_per_volume: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_liked: boolean;
  latitude: string;
  longitude: string;
  categories: ProductCategory[];
  author: Author;
  photos: Photo[];
  files: any[];
  city: string;
  web_site?: string;
  contacts: ProductContact[]; // <-- Массив, а не объект
}

export interface MinimalProduct {
  id: number;
  title: string;
  photos: Photo[];
  type_price: string;
  price: number;
  author: Author;
  is_liked: boolean;
  volume: string | null;
  price_per_volume: string | null;
  city: string;
  updated_at: string;
}

export interface PriceType {
  type: "by_arrangement" | "for_minute" | "for_hour" | "for_piece" | "for_kg";
}

export interface Author {
  id: number;
  first_name: string | null;
  last_name: string | null;
  avatar?: string;
  ig_link?: string;
  fb_link?: string;
  yt_link?: string;
  tg_link?: string;
  web_site?: string;
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

export interface ForumCategoryMinimal {
  id: number;
  title: string;
  position: number;
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
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Reasonable {
  id: number;
  title: string;
  updated_at: string;
  created_at: string;
  image?: string;
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
  last_message: IMessageItem | null;
  to_user: ChatUser;
  reasonable: Reasonable;
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
  author: ChatUser;
  photos: Photo[];
  // replies?: Comment[];
}

// export interface MessageType {
//   message_content: string;
//   from_user: User;
//   chat_id: number;
// }

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

export interface IMessageItem {
  id: number;
  content: string;
  chat_id: number;
  created_at: string;
  updated_at: string;
  files?: Photo[];
  from_user: ChatUser;
}

export interface MapSelectData {
  lat: number;
  lng: number;
  address: {
    formatted: string;
    country: string;
    region: string;
    district: string;
    city: string;
    sublocality: string;
    street: string;
    houseNumber: string;
    postalCode: string;
  };
}
