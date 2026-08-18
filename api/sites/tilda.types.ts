export type TildaQuizStoreResponse = {
  total: number;
  products: TildaQuizProduct[];
};

export type TildaQuizProduct = {
  uid: number;
  title: string;
  sort: number;
  editions: TildaQuizEdition[];
  characteristics: TildaQuizCharacteristic[];
};

export type TildaQuizEdition = {
  uid: number;
  "Место проведения:"?: string;
};

export type TildaQuizCharacteristic = {
  title:
    | "Тип игры"
    | "Место проведения"
    | "Будни или выходные"
    | "Выходные или будни"
    | (string & {});
  value: string;
};

export type ParsedTildaQuizInfo = {
  dateTime: string;
  title: string;
  place?: string;
};

export type SmuziQuizStoreResponse = TildaQuizStoreResponse;
export type SmuziQuizProduct = TildaQuizProduct;
export type SmuziQuizEdition = TildaQuizEdition;
export type SmuziQuizCharacteristic = TildaQuizCharacteristic;
export type SmuziQuizInfo = ParsedTildaQuizInfo;

export type MohitoQuizStoreResponse = TildaQuizStoreResponse;
export type MohitoQuizProduct = TildaQuizProduct;
export type MohitoQuizEdition = TildaQuizEdition;
export type MohitoQuizCharacteristic = TildaQuizCharacteristic;
export type MohitoQuizInfo = ParsedTildaQuizInfo;
