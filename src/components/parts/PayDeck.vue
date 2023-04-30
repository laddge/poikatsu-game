<script setup lang="ts">
import { ref } from 'vue'
import { sumPoints, usePaymentsStore } from '@/stores/payments'
import type { Pay } from '@/stores/payments'
import type { Item } from '@/assets/items'
import { ModalsContainer, VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  pay?: Pay
  cash: number
  date: Date
  item: Item
}>()

const { charge } = usePaymentsStore()
const chargeModal = ref(false)
const chargeAmount = ref(null)
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
    <button v-if="props.pay" @click="chargeModal = true" :disabled="cash < 1000" class="btn btn-xs btn-primary w-full mt-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>チャージ</button>
    <VueFinalModal
      v-if="props.pay"
      v-model="chargeModal"
      class="flex justify-center items-center"
      content-class="max-w-xl w-full mx-4 p-8 bg-base-100 rounded-box"
    >
      <div class="text-xl text-center font-bold">
        {{ props.pay.name }}
      </div>
      <div class="alert alert-warning shadow my-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>一度チャージしたら戻せません。</span>
        </div>
      </div>
      <div class="text-lg text-center mb-3">
        ¥<input type="number" v-model="chargeAmount" class="input input-bordered mx-3 text-right w-16" />,000
      </div>
      <div class="flex">
        <button @click="charge(props.pay.id, chargeAmount ? chargeAmount * 1000 : 0); chargeModal = false; chargeAmount = null" :disabled="!chargeAmount || chargeAmount * 1000 > cash" class="btn btn-primary ml-auto">
          チャージする
        </button>
      </div>
    </VueFinalModal>
    <ModalsContainer />
  </div>
</template>
