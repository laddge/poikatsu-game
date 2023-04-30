<script setup lang="ts">
import { sumPoints } from '@/stores/payments'
import type { Pay } from '@/stores/payments'
import type { Item } from '@/assets/items'

const props = defineProps<{
  pay?: Pay
  cash: number
  date: Date
  item: Item
}>()
</script>

<template>
  <div class="bg-base-200 px-3 py-6 lg:px-6 rounded-box">
    <div class="w-full text-center tooltip before:max-w-[45vw] before:md:max-w-[23vw]" :data-tip="props.pay ? props.pay.desc : null">
      <button class="btn btn-ghost text-lg normal-case">{{ props.pay ? props.pay.name : '現金' }}</button>
    </div>
    <div class="mt-2">
      <div class="px-3">
        残高: ¥ {{ props.pay ? props.pay.balance.toLocaleString() : cash.toLocaleString() }}
      </div>
      <div v-if="props.pay" class="px-3">
        ポイント: ¥ {{ sumPoints(props.pay).toLocaleString() }}
      </div>
      <div v-if="props.pay" class="px-3">
        還元率: {{ props.pay.returnRate(date, item) * 100 }}%
      </div>
    </div>
    <button v-if="props.pay" class="btn btn-xs btn-primary w-full mt-2">+ チャージ</button>
  </div>
</template>
