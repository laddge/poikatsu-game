<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { sumPoints, usePaymentsStore } from '@/stores/payments'
import { items } from '@/assets/items'
import PayDeck from '@/components/parts/PayDeck.vue'

const { cash, wallet } = storeToRefs(usePaymentsStore())
const date = ref(new Date(2023, 0, 1))
const item = items[Math.floor(Math.random() * items.length)]

wallet.value = wallet.value.filter(pay => ['mercury', 'earth', 'mars'].indexOf(pay.id) !== -1)

const totalMoney = computed(() => {
  let res: number = 0
  for (const pay of wallet.value) {
    res += pay.balance
    res += sumPoints(pay)
  }
  res += cash.value
  return res
})
</script>

<template>
  <div class="min-h-screen">
    <div class="p-4">
      <div class="text-4xl text-center p-6">
        {{ date.getMonth() + 1 }} / {{ date.getDate() }} ({{ '日月火水木金土'[date.getDay()] }})
      </div>
      <div class="rounded-box bg-base-200 max-w-xl mx-auto mt-3 p-8">
        <img :src="item.img" :alt="item.img.replace(/.+\/(.+?)\..+(.*)?$/, '$1')" class="h-20 mx-auto my-6" />
        <div class="text-lg text-center font-bold">
          <p>{{ item.name }}</p>
          <p>¥ {{ item.price.toLocaleString() }}</p>
        </div>
        <select class="select w-full mt-6">
          <option>現金</option>
        </select>
        <button class="btn btn-primary w-full mt-2">支払う</button>
      </div>
    </div>
    <div class="sticky top-[100vh]">
      <div class="flex items-center text-lg px-6 mt-3">
        <p>Wallet</p>
        <div class="ml-auto font-bold">
          合計: ¥ {{ totalMoney.toLocaleString() }}
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3">
        <PayDeck v-for="pay in wallet" :pay="pay" :cash="cash" :date="date" :item="item" />
        <PayDeck :cash="cash" :date="date" :item="item" />
      </div>
    </div>
  </div>
</template>
