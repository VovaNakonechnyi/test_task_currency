export interface ICurrency {
  id: number;
  value: string;
  title: string;
  selected?: string;
  img?: string;
  currency?: number;
  added?: boolean;
}

export interface ICurrencyDTO {
  to: string;
  from: string;
  amount: number;
}
export interface ICurrencyConvertRespData {
  data: string;
  info: {
    timestamp: Date;
    rate: number;
  };
  query: {
    from: string;
    to: string;
    amount: number;
  };
  result: number;
  success: boolean;
}

export interface ICurrencyListRespData {
  success: boolean;
  timestamp: Date;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export interface ICurrencySymbolsRespData {
  success: boolean;
  symbols: {
    [key: string]: string;
  };
}
