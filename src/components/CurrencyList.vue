<template>
  <main class="list__currencies">
    <article
      v-for="currency in currencyList"
      :key="currency.id"
      class="list__currency"
    >
      <div class="list__blocks picture-wrapper">
        <img
          :src="require(`@/assets/images/currency/${currency.img}.svg`)"
          class="list__img"
        />
      </div>
      <div class="list__blocks">
        <span class="list__name">{{ currency.title }}</span>
      </div>
      <div class="list__blocks">
        <span class="list__value">{{
          currency.currency ? currency.currency.toFixed(5) : "-"
        }}</span>
      </div>
      <div v-if="currency.added" class="list__btn-remove">
        <button
          class="close-btn"
          role="button"
          @click="$emit('remove', currency.id)"
        >
          x
        </button>
      </div>
    </article>
  </main>
</template>

<script lang="ts" setup>
import { ICurrency } from "@/interfaces/currency";

interface Props {
  currencyList: ICurrency[];
}

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  currencyList: () => [
    {
      id: 0,
      value: "",
      title: "",
    },
  ],
});

// eslint-disable-next-line no-undef
defineEmits<{
  (e: "remove"): void;
}>();
</script>

<style lang="scss" scoped>
.list {
  max-width: remSize(490px);
  width: 100%;
  border-radius: remSize(12px);

  &__currencies {
    background-color: #fff;
    border-radius: 0 0 remSize(12px) remSize(12px);
    padding: remSize(15px);
    display: grid;
    row-gap: remSize(8px);
  }

  &__currency {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: remSize(10px);
    overflow: hidden;
    border-radius: remSize(10px);
    box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
      box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
    background-color: #fff;
  }
  &__blocks {
    width: 25%;
  }
  &__img {
    max-width: 100%;
    width: remSize(50px);
    border-radius: 50%;
    box-shadow: 0 0 0 10px $primary-grey-color, 0 0 0 22px $primary-grey-color;
  }

  &__name {
    color: #979cb0;
    font-weight: 600;
    font-size: remSize(20px);
    letter-spacing: 0.64px;
    margin-left: remSize(12px);
  }

  &__value {
    color: $secondary-blue-color;
    font-weight: 700;
    font-size: remSize(28px);
    text-align: right;

    &__btn-remove {
      width: 15%;
    }
    & > span {
      opacity: 0.8;
      font-weight: 600;
      font-size: remSize(13px);
      margin-left: remSize(3px);
    }
  }
}

.close-btn {
  background: $red-color;
  border-radius: remSize(59px);
  box-sizing: border-box;
  color: $white-color;
  font-size: remSize(16px);
  font-weight: 700;
  cursor: pointer;
  line-height: remSize(24px);
  opacity: 1;
  outline: 0 solid transparent;
  padding: remSize(8px) remSize(18px);
  width: fit-content;
  word-break: break-word;
  border: 0;
}

@include media-max(sm) {
  .list {
    &__currency {
      flex-direction: column;
      align-items: center;
    }
    &__img {
      width: remSize(30px);
      box-shadow: 0 0 0 0;
    }
    &__blocks {
      width: 100%;
    }
  }
} ;
</style>
