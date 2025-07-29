<!-- [FILEPATH] src/common/components/shared/ProductCard.vue -->
<template>
  <div class="product-card">
    <div class="img-wrapper">
      <img :src="product.thumbnail" alt="chicken"></img>
    </div>
    <span class="category">{{ product.category }}</span>
    <span class="title">{{ product.title }}</span>
    <div class="point">
      <span>{{ product.price }}</span>
      <img src="@/assets/currency_symbol.png" alt="point symbol" />
    </div>
    <div class="buy">
      <span>Buy</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '@/services/info'

  defineProps<{
    product: Product
  }>()
</script>

<style scoped>
  .product-card {
    width: 275px;
    height: 370px;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .img-wrapper {
    width: 100%;
  }

  .img-wrapper img {
    width: 100%;
    height: auto;
    display: block;
  }

  .category {
    width: 43px;
    height: 24px;
    color: #2E2E2E;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 15px 0 0 9px;
  }

  .title {
    width: 120px;
    height: 18px;
    color: #2E2E2E;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 7px 0 0 9px;
  }

  .point {
    height: 24px;
    display: flex;
    align-items: center;
    color: #2E2E2E;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 7px 0 0 9px;
  }

  .point img {
    width: 18px;
    height: 18px;
  }

  .buy {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 55px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 8px;
    background: #00D722;
    color: #FFF;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>