import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '@/assets/items'

type Point = {
  date: Date
  point: number
}

export type Pay = {
  id: string
  name: string
  desc: string
  balance: number
  points: Point[]
  expiration: number
  returnRate: (date: Date, item: Item) => number
}

export const sumPoints = (pay: Pay): number => {
  const points = pay.points.map(point => point.point)
  if (points) {
    let sum: number = 0
    for (const p of points) {
      sum += p
    }
    return sum
  } else {
    return 0
  }
}

export const usePaymentsStore = defineStore('payments', () => {
  const count = ref(0)

  const cash = ref(100000)

  const wallet = ref<Pay[]>([
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

  const charge = (id: string, amount: number) => {
    const pay = wallet.value.filter(p => p.id == id)[0]
    if (cash.value < amount) return
    cash.value -= amount
    pay.balance += amount
  }

  const expire = (date: Date) => {
    const res = []
    for (const pay of wallet.value) {
      if (pay.expiration != -1) {
        let expired: number = 0
        for (const point of pay.points) {
          if (date.getTime() - point.date.getTime() >= pay.expiration * 86400000) {
            expired += point.point
          }
        }
        res.push({ id: pay.id, expired })
        pay.points = pay.points.filter(point => date.getTime() - point.date.getTime() < pay.expiration * 86400000)
      }
    }
    return res
  }

  return { count, cash, wallet, charge, expire }
})
