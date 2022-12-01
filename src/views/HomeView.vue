<template>
  <div class="row">
    <div class="col">
      <img width="100" src="@/assets/images/exchange.svg" />
      <ExchangeRates class="my-2" />
      <CurrencyRates />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ExchangeRates from "@/components/ExchangeRates.vue";
import CurrencyRates from "@/components/CurrencyRates.vue";
</script>

<style lang="scss" scoped></style>
