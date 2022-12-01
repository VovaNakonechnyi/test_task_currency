import {
  ICurrencyConvertRespData,
  ICurrencyDTO,
  ICurrencyListRespData,
  ICurrencySymbolsRespData,
} from "@/interfaces/currency";

const myHeaders = new Headers();
myHeaders.append("apikey", "uxGY9RdgDDG2UQJN3nlgjv6iiRaH85M0");

const requestOptions = {
  methood: "GET",
  headers: myHeaders,
};

export default () => ({
  async apiConvertCurrency({
    to = "",
    from = "",
    amount = 0,
  }: ICurrencyDTO): Promise<ICurrencyConvertRespData> {
    return await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  },

  async apiCurrencyList({
    base = "",
    symbols = "",
  }): Promise<ICurrencyListRespData> {
    return await fetch(
      `https://api.apilayer.com/exchangerates_data/latest?base=${base}&symbols=${symbols}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  },

  async apiCurrencySymbols(): Promise<ICurrencySymbolsRespData> {
    return await fetch(
      `https://api.apilayer.com/exchangerates_data/symbols`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  },
});
