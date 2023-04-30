import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '@/assets/items'

type Point = {
  date: Date
  point: number
}

type Payment = {
  id: string
  name: string
  desc: string
  balance: number
  points: Point[]
  expiration: number
  returnRate: (date: Date, item: Item) => number
}

export const usePaymentsStore = defineStore('payments', () => {
  const payments = ref<Payment[]>([
    {
      id: 'mercury',
      name: 'Mercuryポイント',
      desc: '普段は1%還元、毎週水曜日は3%還元、ポイントの失効は無し',
      balance: 0,
      points: [],
      expiration: -1,
      returnRate: (date, _) => {
        if (date.getDay() == 3) {
          return 0.03
        } else {
          return 0.01
        }
      },
    },
    {
      id: 'venus',
      name: 'Venusカード',
      desc: '普段は0.5%還元、毎月1が付く日は5%還元、ポイントの失効は無し',
      balance: 0,
      points: [],
      expiration: -1,
      returnRate: (date, _) => {
        if (date.getDate().toString().indexOf('1') !== -1) {
          return 0.05
        } else {
          return 0.005
        }
      },
    },
    {
      id: 'earth',
      name: 'Earthポイント',
      desc: '普段は0.5%還元、毎月0か5が付く日は5%還元、ポイントの失効は無し',
      balance: 0,
      points: [],
      expiration: -1,
      returnRate: (date, _) => {
        if (date.getDate().toString().indexOf('0') !== -1 || date.getDate().toString().indexOf('5') !== -1) {
          return 0.05
        } else {
          return 0.005
        }
      },
    },
    {
      id: 'mars',
      name: 'Marsクラブ',
      desc: '常に3%還元、100日後に失効',
      balance: 0,
      points: [],
      expiration: 100,
      returnRate: (_, __) => 0.03,
    },
    {
      id: 'jupiter',
      name: 'Jupiterカード',
      desc: '1~999円: 0.5%, 1,000~9999円: 2%, 10,000円~: 5% の割合で還元、100日後に失効',
      balance: 0,
      points: [],
      expiration: 100,
      returnRate: (_, item) => {
        if (item.price < 1000) {
          return 0.005
        } else if (item.price < 10000) {
          return 0.02
        } else {
          return 0.05
        }
      },
    },
    {
      id: 'saturn',
      name: 'Saturnポイント',
      desc: '普段は2%還元、7月は10%還元、50日後に失効',
      balance: 0,
      points: [],
      expiration: 50,
      returnRate: (date, _) => {
        if (date.getMonth() == 6) {
          return 0.1
        } else {
          return 0.02
        }
      },
    },
    {
      id: 'uranus',
      name: 'Uranusクラブ',
      desc: '1~9,999円: 2%, 10,000円~: 10% の割合で還元、50日後に失効',
      balance: 0,
      points: [],
      expiration: 50,
      returnRate: (_, item) => {
        if (item.price < 10000) {
          return 0.02
        } else {
          return 0.1
        }
      },
    },
    {
      id: 'neptune',
      name: 'Neptuneカード',
      desc: '常に50%還元、15日後に失効',
      balance: 0,
      points: [],
      expiration: 15,
      returnRate: (_, __) => 0.5,
    },
  ])

  const expire = (date: Date) => {
    const res = []
    for (const payment of payments.value) {
      if (payment.expiration != -1) {
        let expired: number = 0
        for (const point of payment.points) {
          if (date.getTime() - point.date.getTime() >= payment.expiration * 86400000) {
            expired += point.point
          }
        }
        res.push({ id: payment.id, expired })
        payment.points = payment.points.filter(point => date.getTime() - point.date.getTime() < payment.expiration * 86400000)
      }
    }
    return res
  }

  return { payments, expire }
})
