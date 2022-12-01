<template>
  <div class="card">
    <div class="row">
      <div class="col my-1">
        <h1>1 {{ give }}</h1>
      </div>
      <div class="col my-2 currency-selector">
        <CustomSelect v-model="give" :items="currencySelector" />
      </div>
    </div>
    <div class="row">
      <div class="col currency-list-wrapper">
        <div class="row">
          <div class="col btn-update-wrapper">
            <CustomBtn :method="fetchList" :disabled="isDisabled">
              <template #text> Update </template>
            </CustomBtn>
          </div>
        </div>
        <div v-if="isLoading" class="row my-1">
          <div class="col">
            <CustomLoader />
          </div>
        </div>
        <div v-else class="row my-1">
          <div class="col">
            <CurrencyList
              :currency-list="currenciesList"
              @remove="removeCurrency"
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col btn-add_currency-wrapper">
            <CustomBtn
              :disabled="isDisabled"
              :method="() => (showModal = true)"
            >
              <template #text> Add currency </template>
            </CustomBtn>
          </div>
        </div>
      </div>
    </div>
    <CustomModal v-if="showModal" @close="showModal = false">
      <template #header> Add another currency </template>
      <template #body>
        <div class="row">
          <div class="col">
            <span
              >Please fill in 3 letters of currency, that you want to add.
            </span>
          </div>
        </div>
        <div class="row">
          <div v-if="!isLoadingCurrency" class="col input-modal-wrapper">
            <CustomInput v-model="newCurrency" :type="'text'" :max-length="3" />
          </div>
          <div v-else class="col input-modal-wrapper">
            <CustomLoader />
          </div>
          <div class="col add_btn-modal-wrapper">
            <CustomBtn
              :disabled="isLoadingCurrency"
              :method="addCurrenciesToList"
            >
              <template #text>Add</template>
            </CustomBtn>
          </div>
        </div>
        <div v-if="error.length" class="row my-1">
          <div class="col">
            <CustomError :error="error" />
          </div>
        </div>
      </template>
    </CustomModal>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";

import CustomLoader from "@/components/shared/CustomLoader";
import CustomSelect from "@/components/shared/CustomSelect";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomModal from "@/components/shared/CustomModal";
import CustomInput from "./shared/CustomInput";
import CustomError from "./shared/CustomError";
import CurrencyList from "@/components/CurrencyList";

import { ICurrency, ICurrencySymbolsRespData } from "@/interfaces/currency";
import {
  checkLocalStorage,
  getNeededCurrincies,
  getRandomNumber,
  setIntoLocalStorage,
} from "@/composables/useCurrency";

const store = useStore();

const give = ref("USD");
const newCurrency = ref("");
const error = ref("");

const isDisabled = ref(false);
const isLoading = ref(true);
const isLoadingCurrency = ref(false);
const isCurrency = ref(false);
const showModal = ref(false);
const isFirstLoading = ref(true);

let currency: ICurrency[] = [...store.state.currency.currency];
const currencyListValue = ["USD", "EUR", "UAH", "BTC", "ETH"];

let currencySelector = getNeededCurrincies(currency, ["USD", "EUR", "UAH"]);
let currenciesList = ref(getNeededCurrincies(currency, currencyListValue));

if (isFirstLoading.value) {
  addingLocStorageListToDef();
}
function addingLocStorageListToDef() {
  const currencies: ICurrency[] = checkLocalStorage("newCurrencies");
  if (!currencies || !currencies.length) return;
  currenciesList.value = [...currenciesList.value, ...currencies];
  isFirstLoading.value = false;
}

const removeCurrency = (removeCurrency: string) => {
  let currencies: ICurrency[] = checkLocalStorage("newCurrencies");
  currenciesList.value = currenciesList.value.filter(
    (item: ICurrency) =>
      item.value.toLowerCase() !== removeCurrency.toLowerCase()
  );
  if (!currencies) return;
  currencies = currencies.filter(
    (item: ICurrency) =>
      item.value.toLowerCase() !== removeCurrency.toLowerCase()
  );
  setIntoLocalStorage("newCurrencies", currencies);
};

watch(give, fetchList);

async function fetchList() {
  isDisabled.value = true;
  await store
    .dispatch("currency/currencyList", {
      base: give.value,
      symbols: currenciesList.value.map((item) => item.value).join(","),
    })
    .then((resp) => {
      currenciesList.value = currenciesList.value.map((item: ICurrency) => {
        const map: { [key: string]: number } = resp.rates;
        return { ...item, currency: map[item.value] };
      });
      setTimeout(() => (isDisabled.value = false), 5000);
      if (currenciesList.value.length) isLoading.value = false;
    });
}
fetchList();

const addCurrenciesToList = async () => {
  isLoadingCurrency.value = true;
  if (newCurrency.value.length !== 3) {
    isLoadingCurrency.value = false;
    error.value = "Needed 3 letters.";
    return;
  }
  const currencySymbols: ICurrencySymbolsRespData = await store.dispatch(
    "currency/currencySymbols"
  );

  const map: { [key: string]: string } = currencySymbols.symbols;
  if (!map[newCurrency.value.toUpperCase()]) {
    isLoadingCurrency.value = false;
    error.value = "This currency isn't.";
    return;
  }
  const currencyObject: ICurrency = reactive({
    id: getRandomNumber(1, 10000000),
    value: newCurrency.value.toUpperCase(),
    title: map[newCurrency.value.toUpperCase()],
    img: "cur",
    added: true,
  });
  addCurrencyToLocStorage(currencyObject);
  if (!isCurrency.value) {
    currenciesList.value.push(currencyObject);
    await fetchList().then(() => {
      isLoadingCurrency.value = false;
      error.value = "";
    });
  }
};
const addCurrencyToLocStorage = (currencyObject: ICurrency): void => {
  isCurrency.value = false;
  const currencies: ICurrency[] = checkLocalStorage("newCurrencies");
  if (currencies) {
    isCurrency.value = checkCurrencyInList(
      newCurrency.value,
      currencies,
      currencyListValue
    );
    if (isCurrency.value) {
      isLoadingCurrency.value = false;
      error.value = "This currency is in list";
      return;
    }
    currencies.push(currencyObject);
    setIntoLocalStorage("newCurrencies", currencies);
    newCurrency.value = "";
    error.value = "";
    return;
  }
  setIntoLocalStorage("newCurrencies", [currencyObject]);
  newCurrency.value = "";
};

const checkCurrencyInList = (
  currency: string,
  localStorageCurrencies: ICurrency[],
  currenciesDefList: string[]
) => {
  const isInLocal = !!localStorageCurrencies.find(
    (item) => item.value.toLowerCase() === currency.toLowerCase()
  );
  const isInDef = !!currenciesDefList.find(
    (item) => item.toLowerCase() === currency.toLowerCase()
  );
  if (isInLocal || isInDef) return true;
  return false;
};
</script>
<style lang="scss" scoped>
.currency-selector {
  display: flex;
  justify-content: center;
  width: 50%;
}
.currency-list-wrapper {
  width: 40%;
}
.btn-update-wrapper {
  width: 25%;
}
.btn-add_currency-wrapper {
  width: 15%;
}
.input-modal-wrapper {
  width: 50%;
}
.add_btn-modal-wrapper {
  width: 50%;
}
@include media-max(xxl) {
  .currency-list-wrapper {
    width: 50%;
  }
  .btn-update-wrapper {
    width: 30%;
  }
  .btn-add_currency-wrapper {
    width: 20%;
  }
}

@include media-max(xl) {
  .currency-list-wrapper {
    width: 75%;
  }
}

@include media-max(lg) {
  .btn-update-wrapper {
    width: 30%;
  }
  .btn-add_currency-wrapper {
    width: 30%;
  }
}

@include media-max(md) {
  .btn-update-wrapper {
    width: 50%;
  }
  .btn-add_currency-wrapper {
    width: 50%;
  }
  .currency-list-wrapper {
    width: 100%;
  }
}
@include media-max(sm) {
  .input-modal-wrapper {
    width: 75%;
  }
  .btn-update-wrapper {
    width: 75%;
  }
  .btn-add_currency-wrapper {
    width: 75%;
  }
}
</style>
