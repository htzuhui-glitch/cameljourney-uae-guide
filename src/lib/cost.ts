import costData from '../data/zh/cost.json'

export type HousingKey = 'studio' | 'oneBr' | 'twoBr' | 'threeBr'
export type Tier = 'low' | 'mid' | 'high'

export interface CostInput {
  citySlug: string
  housing: HousingKey
  tier: Tier
  adults: number
  children: number
  hasCar: boolean
  /** 公司住房津貼，AED／月 */
  companyHousing: number
  /** 公司直接提供宿舍。勾了就不計房租與水電 */
  companyAccommodation: boolean
  companyInsurance: boolean
}

export interface CostRow {
  label: string
  value: number
  note?: string
  /** 金額為 0 但仍要顯示，用來說明「這項有人幫你出」 */
  alwaysShow?: boolean
}

export const COST = costData
export const TWD_PER_AED = costData.fx.twdPerAed

/** 首頁快速試算用的預設情境：單身、一房、中等租金、有車、公司給保險 */
export const DEFAULT_INPUT: CostInput = {
  citySlug: 'abudhabi',
  housing: 'oneBr',
  tier: 'mid',
  adults: 1,
  children: 0,
  hasCar: true,
  companyHousing: 0,
  companyAccommodation: false,
  companyInsurance: true,
}

export function aed(n: number) {
  return `AED ${Math.round(n).toLocaleString('en-US')}`
}

export function twd(n: number) {
  return `NT$ ${Math.round(n).toLocaleString('zh-TW')}`
}

export function aedToTwd(amount: number) {
  return amount * TWD_PER_AED
}

export function twdToAed(amount: number) {
  return amount / TWD_PER_AED
}

export function getCostCity(slug: string) {
  return costData.cities.find((c) => c.slug === slug) ?? costData.cities[0]
}

/**
 * 算出每月各項支出。回傳的 total 就是「要維持這個生活，月薪至少得有多少」。
 */
export function calculate(input: CostInput) {
  const city = getCostCity(input.citySlug)
  const annualRent = city.rent[input.housing][input.tier]
  const rent = input.companyAccommodation
    ? 0
    : Math.max(0, annualRent / 12 - input.companyHousing)
  // 公司宿舍通常連水電一起包，所以一併歸零
  const utilities = input.companyAccommodation ? 0 : city.utilities[input.housing]
  const transport = input.hasCar ? city.transportCar : city.transportPublic * input.adults
  const insurance = input.companyInsurance ? 0 : costData.insurancePerAdultMonthly * input.adults
  const school = (input.children * city.schoolPerChildAnnual) / 12
  const groceries = city.groceriesPerPersonMonthly * (input.adults + input.children * 0.6)
  const dining = city.diningPerPersonMonthly * input.adults
  const misc = costData.miscPerHouseholdMonthly

  const rows: CostRow[] = [
    {
      label: '房租',
      value: rent,
      note:
        input.companyHousing > 0
          ? `已扣除公司住房津貼 ${aed(input.companyHousing)}`
          : `年租 ${aed(annualRent)}`,
    },
    { label: '水電網路', value: utilities },
    {
      label: '住宿與水電',
      value: 0,
      note: '公司提供宿舍，不計入。是否含水電請跟公司確認',
      alwaysShow: input.companyAccommodation,
    },
    {
      label: '交通',
      value: transport,
      note: input.hasCar ? '含車貸或租車、油錢、保險、過路費' : '大眾運輸月票估算',
    },
    {
      label: '醫療保險',
      value: insurance,
      note: input.companyInsurance ? '公司提供，不計入' : '自費估算',
      alwaysShow: input.companyInsurance,
    },
    {
      label: '小孩學費',
      value: school,
      note: input.children > 0 ? `每人年學費約 ${aed(city.schoolPerChildAnnual)}` : undefined,
    },
    { label: '食材與日用品', value: groceries },
    { label: '外食與社交', value: dining },
    { label: '其他雜支', value: misc, note: '手機、健身房、剪髮、寄回台灣的匯費等' },
  ].filter((row) => row.value > 0 || row.alwaysShow)

  const total = rows.reduce((sum, row) => sum + row.value, 0)

  return { city, rows, total }
}
