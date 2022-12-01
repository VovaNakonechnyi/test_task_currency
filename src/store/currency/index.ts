import api from "@/api";
import {
  ICurrency,
  ICurrencyDTO,
  ICurrencyConvertRespData,
  ICurrencyListRespData,
  ICurrencySymbolsRespData,
} from "@/interfaces/currency";

interface ICurrencyStore {
  currency: ICurrency[];
}

const state = (): ICurrencyStore => ({
  currency: [
    {
      id: 1,
      value: "USD",
      title: "USD - Dollar USA",
      selected: "USD",
      img: "usd",
    },
    {
      id: 2,
      value: "EUR",
      title: "EUR - Euro",
      img: "eur",
    },
    {
      id: 3,
      value: "UAH",
      title: "UAH - Hryvni",
      img: "uah",
    },
    {
      id: 5,
      value: "BTC",
      title: "BTC - Bitcoin",
      selected: "BTC",
      img: "btc",
    },
    {
      id: 6,
      value: "ETH",
      title: "ETH - Ethereum",
      img: "eth",
    },
    {
      id: 4,
      value: "GBP",
      title: "GBP - Pound sterling",
      img: "gbp",
    },
    {
      id: 7,
      value: "BNB",
      title: "BNB - Binance Coin",
      img: "bnb",
    },
    {
      id: 8,
      value: "XRP",
      title: "XRP - Ripples",
      img: "xrp",
    },
  ],
});
const getters = {};

const actions = {
  async convertCurrency(
    // eslint-disable-next-line no-empty-pattern
    {},
    payload: ICurrencyDTO
  ): Promise<ICurrencyConvertRespData> {
    return await api.currency.apiConvertCurrency(payload);
  },
  async currencyList(
    // eslint-disable-next-line no-empty-pattern
    {},
    payload: {
      base: string;
      symbols: string;
    }
  ): Promise<ICurrencyListRespData> {
    return await api.currency.apiCurrencyList(payload);
  },
  async currencySymbols(
    // eslint-disable-next-line no-empty-pattern
    {}
  ): Promise<ICurrencySymbolsRespData> {
    return await api.currency.apiCurrencySymbols();
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
