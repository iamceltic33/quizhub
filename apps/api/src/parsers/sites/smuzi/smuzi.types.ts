export type SmuziResponse = {
  total: number;
  products: SmuziProduct[];
};

export type SmuziProduct = {
  uid: number;
  title: string;
  sort: number;
  editions: SmuziEdition[];
  characteristics: SmuziCharacteristic[];
};

export type SmuziEdition = {
  uid: number;
  "Место проведения:"?: string;
};

export type SmuziCharacteristic = {
  title: "Тип игры" | "Место проведения" | "Будни или выходные" | string;
  value: string;
};

export type SmuziQuizInfo = {
  dateTime: string;
  title: string;
  place?: string;
};
