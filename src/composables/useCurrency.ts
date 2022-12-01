import { ICurrency } from "@/interfaces/currency";

export const handleInputChange = (event: Event) =>
  (event.target as HTMLInputElement).value;

export const checkLocalStorage = (key: string) => {
  if (!localStorage.getItem(key)) return false;
  return JSON.parse(localStorage.getItem(key) || "");
};
export const setIntoLocalStorage = (key: string, payload: unknown) => {
  localStorage.setItem(key, JSON.stringify(payload));
};
export const getNeededCurrincies = (
  allCurrencies: ICurrency[],
  neededCurrencies: string[]
): ICurrency[] =>
  allCurrencies.filter((item) =>
    neededCurrencies.find((i) => i.toLowerCase() === item.value.toLowerCase())
  );

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
