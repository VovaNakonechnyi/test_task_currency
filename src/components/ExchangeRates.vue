<template>
  <div class="card">
    <div class="row">
      <div class="col currency-exchange">
        <form>
          <h1>Dublemint Currency Converter</h1>
          <div class="row my-2">
            <div class="col currency-column give-column my-1">
              <CustomSelect v-model="give" :label="'Give'" :items="currency" />
            </div>
            <div class="col currency-column get-column my-1">
              <CustomSelect v-model="get" :label="'Get'" :items="currency" />
            </div>
          </div>
          <div class="row">
            <div class="input-fields-wrappper col">
              <CustomInput
                v-model="giveAmount"
                :type="'number'"
                :method="pasteGive"
              />
            </div>
            <div class="input-fields-wrappper col">
              <CustomInput
                v-model="getAmount"
                :type="'number'"
                :method="pasteGet"
              />
            </div>
          </div>
          <div v-if="isOverLimit" class="row my-2">
            <div class="col error-wrapper">
              <CustomError
                :error="`Limit is 10000$, your request is ${limitCount.toFixed(
                  2
                )}$`"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

import CustomSelect from "@/components/shared/CustomSelect";
import CustomInput from "@/components/shared/CustomInput";
import CustomError from "@/components/shared/CustomError";
import {
  ICurrency,
  ICurrencyConvertRespData,
  ICurrencyDTO,
} from "@/interfaces/currency";
import { watch } from "vue";

const store = useStore();

const give = ref("USD");
const get = ref("BTC");

const getAmount = ref(0);
const giveAmount = ref(0);

const limitCount = ref(0);
const isOverLimit = ref(false);

const currency: ICurrency[] = store.state?.currency?.currency;

watch(give, pasteGet);
watch(get, pasteGive);

async function pasteGive() {
  if (!giveAmount.value) {
    getAmount.value = 0;
    return;
  }
  const convertRes: ICurrencyConvertRespData = await actionConvertCurrency({
    from: give.value,
    to: get.value,
    amount: giveAmount.value,
  });
  const convertToUSD: ICurrencyConvertRespData = await actionConvertCurrency({
    from: get.value,
    to: "USD",
    amount: convertRes.result,
  });
  isOverLimit.value = convertToUSD.result > 10000;
  limitCount.value = convertToUSD.result;
  if (isOverLimit.value) {
    getAmount.value = 0;
    return;
  }
  getAmount.value = convertRes.result;
}

async function pasteGet() {
  if (!getAmount.value) {
    giveAmount.value = 0;
    return;
  }
  const convertRes: ICurrencyConvertRespData = await actionConvertCurrency({
    from: get.value,
    to: give.value,
    amount: getAmount.value,
  });
  const convertToUSD: ICurrencyConvertRespData = await actionConvertCurrency({
    from: give.value,
    to: "USD",
    amount: convertRes.result,
  });
  isOverLimit.value = convertToUSD.result > 10000;
  limitCount.value = convertToUSD.result;
  if (isOverLimit.value) {
    giveAmount.value = 0;
    return;
  }
  giveAmount.value = convertRes.result;
}

const actionConvertCurrency = async (
  dto: ICurrencyDTO
): Promise<ICurrencyConvertRespData> => {
  return await store.dispatch("currency/convertCurrency", dto);
};
</script>

<style lang="scss" scoped>
.currency-exchange {
  width: 45%;
}
.currency-column {
  width: 50%;
}
.input-fields-wrappper {
  display: flex;
  justify-content: center;
  width: 35%;
}
@include media-max(xxl) {
  .currency-exchange {
    width: 60%;
  }
}

@include media-max(lg) {
  .currency-exchange {
    width: 100%;
  }
  .currency-column {
    width: 100%;
  }
  .input-fields-wrappper {
    width: 40%;
  }
  .error-wrapper {
    width: 50%;
  }
}

@include media-max(md) {
  .error-wrapper {
    width: 100%;
  }
}
@include media-max(sm) {
  .currency-column {
    padding: 0 !important;
  }
  .input-fields-wrappper {
    width: 100%;
  }
}
</style>
