<script setup lang="ts">
</script>

<template>
  <div class="p-4">
    <div class="text-4xl text-center p-6">
      1 / 1 (日)
    </div>
    <div class="rounded-box bg-base-200 max-w-xl mx-auto mt-3 p-8">
      <img src="https://1.bp.blogspot.com/-ZvxBWXjruCU/UkJMDLIMRwI/AAAAAAAAYQQ/FrNA1aboBX0/s800/shoes_sneaker.png" alt="shoes_sneaker" class="h-20 mx-auto my-6" />
      <div class="text-lg text-center font-bold">
        <p>スニーカー</p>
        <p>¥6200</p>
      </div>
      <select class="select w-full mt-6">
        <option>現金</option>
      </select>
      <button class="btn btn-primary w-full mt-2">支払う</button>
    </div>
    <div class="fixed left-0 bottom-0 w-full bg-base-100/75 backdrop-blur">
      <input type="checkbox" id="walletCheck" class="hidden" />
      <div class="flex items-center text-lg px-6 mt-3">
        <label for="walletCheck" class="flex items-center gap-3 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          Wallet
        </label>
        <div class="ml-auto font-bold">
          合計: ¥100,000
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 h-0 wallet md:h-auto">
        <div v-for="pmt in ['A Card', 'B Point', 'C Club']" class="bg-base-200 px-3 py-6 lg:px-6 rounded-box">
          <div class="text-lg text-center">
            {{ pmt }}
          </div>
          <div class="mt-2">
            <div class="px-3">
              残高: ¥0
            </div>
            <div class="px-3">
              ポイント: ¥0
            </div>
          </div>
          <button class="btn btn-xs btn-primary w-full mt-2">+ チャージ</button>
        </div>
        <div class="bg-base-200 px-3 py-6 lg:px-6 rounded-box">
          <div class="text-lg text-center">
            現金
          </div>
          <div class="mt-2">
            <div class="px-3">
              残高: ¥100,000
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#walletCheck:checked + div label svg {
  @apply rotate-180;
}
#walletCheck:checked ~ .wallet {
  @apply h-auto;
}
</style>
