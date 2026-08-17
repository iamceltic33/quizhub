export interface Currency {
  id: number | null;
  title: string | null;
  code: string | null;
  symbol: string;
  rate: number | null;
  is_before: boolean | null;
}

export interface Timezone {
  id: number | null;
  title: string;
  title_ru: string;
  utc_offset: string;
  title_utc?: string;
}

export interface Country {
  id: number;
  title: string;
  code: string;
  language: string;
  default_city_id: number;
  currency_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  currency: Currency;
}

export interface City {
  id: number | null;
  title: string;
  title_en: string;
  slug: string;
  map: string;
  timezone_id: number;
  reservation?: unknown;
  show_on_index: boolean;
  city_is_connected: boolean;
  video_price_classic?: number | null;
  video_price_movie_music?: number | null;
  video_price_online?: number | null;
  video_price_english?: number | null;
  video_price_teens?: number | null;
  video_price_corporate?: number | null;
  royalty_percent?: number | null;
  royalty_vacation_start?: string | null;
  royalty_vacation_stop?: string | null;
  country_id: number;
  key?: string | null;
  manager_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  country: Country;
  timezone?: Timezone;
  citysettings?: unknown[];
}

export interface Place {
  id: number | null;
  city_id: number;
  title: string;
  address: string;
  address_ru: string;
  special: unknown | null;
  option: unknown | null;
  description: string | null;
  covid_free: boolean;
  anti_covid_no: boolean;
  bar_link: string | null;
  lat: number;
  lon: number;
  menu: unknown | null;
  people_have_places_to_reserve: number | null;
  people_reserve_no_places: number | null;
  commands_have_places_to_reserve: number | null;
  commands_reserve_no_places: number | null;
  city: City;
  images: unknown[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Lang {
  code: string; 
  title: string; 
}

export interface GameCategory {
  id: number;
  title: string;
  is_visible_in_filters: boolean;
  category: string;
  order: number;
  slug: string;
}

export interface GameTemplate {
  id: number | null;
  title: string;
  game_number: string | null;
  game_level: 'light' | 'medium' | 'hard' | string;
  welcome_text: string;
  quote: string;
  description: string;
  block: string;
  hidden: boolean;
  game_title: string;
  free: boolean;
  game_type: number;
  game_format_id: number | null;
  is_hide_game_number: boolean;
  is_exclude_from_rating: boolean;
  is_bingo_register_link: boolean;
  is_show_promo_field: boolean;
  hide_for_mobile: boolean;
  game_underlay: string;
  background_pc: string;
  background_tablet: string;
  background_phone: string;
  category: GameCategory;
}

export interface QuizGame {
  id: string;
  place: Place;
  title: string;
  description: string;
  block_with_text: string;
  quote: string;
  date: string;
  date_open_registration: string;
  people_have_places_to_reserve: number;
  commands_have_places_to_reserve: number;
  status: number;
  level: string | null;
  show_account: boolean;
  price_type: number;
  pay_method: number;
  free_enter: number;
  free_entry_age_from: number;
  game_number: string;
  game_type: number;
  lottery_id: string | null;
  price: number;
  current_price: string;
  prices: unknown[];
  few_places_left: boolean;
  lang: Lang;
  game_tables: unknown[];
  schedule_button_text: string | null;
  schedule_button_link: string | null;
  link_registration_iframe: string | null;
  link_no_registration: string | null;
  game_button_text: string | null;
  game_button_link: string | null;
  welcome_inscription: string;
  package_number: string;
  is_show_promo_field: boolean;
  link_contact_button: string | null;
  link_to_donations: string | null;
  link_facecast: string | null;
  custom_fields: unknown[];
  max_participants: number;
  link_results_page: string | null;
  banner_for_streams: string | null;
  banner_for_streams_desktop: string | null;
  banner_for_streams_tablet: string | null;
  banner_for_streams_mobile: string | null;
  people_count_until_reserve: number;
  people_count_until_no_places: number;
  hide_registration_form_page: unknown | null;
  template: GameTemplate;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface GameTypesMeta {
  data: GameCategory[];
}

export interface ShortPlace {
  id: number;
  city_id: number;
  title: string;
  address: string;
  lat: number;
  lon: number;
  special: unknown | null;
  option: unknown | null;
  covid_free: boolean;
  anti_covid_no: boolean;
  description: string | null;
  bar_link: string | null;
  menu: unknown | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address_ru: string;
  people_have_places_to_reserve: number | null;
  people_reserve_no_places: number | null;
  commands_have_places_to_reserve: number | null;
  commands_reserve_no_places: number | null;
  city: City;
  images: unknown[];
}

export interface ResponseMeta {
  places_ids: number[];
  dates: string[];
  game_types: GameTypesMeta;
  places: ShortPlace[];
}

export interface QuizPleaseApiResponse {
  status: 'ok' | string;
  data: {
    data: QuizGame[];
    meta: ResponseMeta;
    pagination: Pagination;
  };
}