import { useMemo, useState } from 'react'
import { Container, PageHeader } from '../components/ui'
import cost from '../data/zh/cost.json'

type HousingKey = 'studio' | 'oneBr' | 'twoBr' | 'threeBr'
type Tier = 'low' | 'mid' | 'high'

const HOUSING: { key: HousingKey; label: string }[] = [
  { key: 'studio', label: 'Studio 套房' },
  { key: 'oneBr', label: '一房' },
  { key: 'twoBr', label: '兩房' },
  { key: 'threeBr', label: '三房' },
]

const TIERS: { key: Tier; label: string; hint: string }[] = [
  { key: 'low', label: '經濟', hint: '舊社區、離市區遠、屋況普通' },
  { key: 'mid', label: '中等', hint: '一般上班族最常選的範圍' },
  { key: 'high', label: '高檔', hint: '新大樓、海景、熱門地段' },
]

const PRESETS = [
  { label: '單身省錢型', salary: 12000, housing: 'studio' as HousingKey, tier: 'low' as Tier, adults: 1, children: 0, hasCar: false },
  { label: '單身舒適型', salary: 20000, housing: 'oneBr' as HousingKey, tier: 'mid' as Tier, adults: 1, children: 0, hasCar: true },
  { label: '雙薪無小孩', salary: 32000, housing: 'oneBr' as HousingKey, tier: 'high' as Tier, adults: 2, children: 0, hasCar: true },
  { label: '一家四口', salary: 45000, housing: 'threeBr' as HousingKey, tier: 'mid' as Tier, adults: 2, children: 2, hasCar: true },
]

function aed(n: number) {
  return `AED ${Math.round(n).toLocaleString('en-US')}`
}

/** 捲動頁面時滑過數字欄位會改動數值，很容易誤觸，所以捲動前先失焦 */
function blurOnWheel(event: React.WheelEvent<HTMLInputElement>) {
  event.currentTarget.blur()
}

export default function Cost() {
  const [citySlug, setCitySlug] = useState(cost.cities[0].slug)
  const [salary, setSalary] = useState(20000)
  const [housing, setHousing] = useState<HousingKey>('oneBr')
  const [tier, setTier] = useState<Tier>('mid')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [hasCar, setHasCar] = useState(true)
  const [companyHousing, setCompanyHousing] = useState(0)
  const [companyInsurance, setCompanyInsurance] = useState(true)

  const city = cost.cities.find((c) => c.slug === citySlug) ?? cost.cities[0]

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setSalary(preset.salary)
    setHousing(preset.housing)
    setTier(preset.tier)
    setAdults(preset.adults)
    setChildren(preset.children)
    setHasCar(preset.hasCar)
  }

  const result = useMemo(() => {
    const annualRent = city.rent[housing][tier]
    const rent = Math.max(0, annualRent / 12 - companyHousing)
    const utilities = city.utilities[housing]
    const transport = hasCar ? city.transportCar : city.transportPublic * adults
    const insurance = companyInsurance ? 0 : cost.insurancePerAdultMonthly * adults
    const school = (children * city.schoolPerChildAnnual) / 12
    const groceries = city.groceriesPerPersonMonthly * (adults + children * 0.6)
    const dining = city.diningPerPersonMonthly * adults
    const misc = cost.miscPerHouseholdMonthly

    const rows = [
      { label: '房租', value: rent, note: companyHousing > 0 ? `已扣除公司住房津貼 ${aed(companyHousing)}` : `年租 ${aed(annualRent)}` },
      { label: '水電網路', value: utilities },
      { label: '交通', value: transport, note: hasCar ? '含車貸或租車、油錢、保險、過路費' : '大眾運輸月票估算' },
      { label: '醫療保險', value: insurance, note: companyInsurance ? '公司提供，不計入' : '自費估算' },
      { label: '小孩學費', value: school, note: children > 0 ? `每人年學費約 ${aed(city.schoolPerChildAnnual)}` : undefined },
      { label: '食材與日用品', value: groceries },
      { label: '外食與社交', value: dining },
      { label: '其他雜支', value: misc, note: '手機、健身房、剪髮、寄回台灣的匯費等' },
    ].filter((row) => row.value > 0)

    const total = rows.reduce((sum, row) => sum + row.value, 0)
    const balance = salary - total

    return { rows, total, balance }
  }, [city, housing, tier, adults, children, hasCar, companyHousing, companyInsurance, salary])

  const twd = result.balance * cost.fx.twdPerAed

  return (
    <>
      <PageHeader
        eyebrow="本站最實用的一頁"
        title="生活成本試算"
        lead="手上有一份 offer，但不知道這個數字在阿聯酋算多還算少？把條件填進去，直接看每個月大概剩多少。"
        updated={cost.updated}
      />

      <Container className="py-12">
        <p className="text-flow mb-8 rounded-2xl border border-sand-300 bg-sand-100/60 p-4 text-sm text-ink-700">
          {cost.basisNote}
        </p>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* 輸入區 */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-sand-200 bg-white p-6">
              <p className="text-sm font-medium text-ink-900">先試試看情境</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="rounded-full border border-sand-300 px-3 py-1.5 text-sm text-ink-700 transition-colors hover:border-camel-400 hover:text-camel-600"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5 rounded-2xl border border-sand-200 bg-white p-6">
              <label className="block">
                <span className="text-sm font-medium text-ink-900">月薪（AED，稅前即實領）</span>
                <input
                  type="number"
                  onWheel={blurOnWheel}
                  min={0}
                  step={500}
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value) || 0)}
                  className="mt-2 w-full rounded-lg border border-sand-300 px-3 py-2 text-ink-900 focus:border-camel-400 focus:outline-none"
                />
                <span className="mt-1 block text-xs text-ink-500">
                  阿聯酋沒有個人所得稅，offer 上的數字通常就是實領。
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink-900">城市</span>
                <select
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-sand-300 bg-white px-3 py-2 text-ink-900 focus:border-camel-400 focus:outline-none"
                >
                  {cost.cities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <span className="text-sm font-medium text-ink-900">房型</span>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {HOUSING.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setHousing(option.key)}
                      className={`rounded-lg border px-2 py-2 text-sm transition-colors ${
                        housing === option.key
                          ? 'border-camel-500 bg-camel-500 text-white'
                          : 'border-sand-300 text-ink-700 hover:border-camel-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-ink-900">租金等級</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {TIERS.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setTier(option.key)}
                      title={option.hint}
                      className={`rounded-lg border px-2 py-2 text-sm transition-colors ${
                        tier === option.key
                          ? 'border-camel-500 bg-camel-500 text-white'
                          : 'border-sand-300 text-ink-700 hover:border-camel-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-ink-500">
                  {TIERS.find((t) => t.key === tier)?.hint}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-ink-900">大人</span>
                  <input
                    type="number"
                    onWheel={blurOnWheel}
                    min={1}
                    max={4}
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))}
                    className="mt-2 w-full rounded-lg border border-sand-300 px-3 py-2 text-ink-900 focus:border-camel-400 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-ink-900">小孩（就學中）</span>
                  <input
                    type="number"
                    onWheel={blurOnWheel}
                    min={0}
                    max={5}
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-2 w-full rounded-lg border border-sand-300 px-3 py-2 text-ink-900 focus:border-camel-400 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-ink-900">公司住房津貼（AED／月）</span>
                <input
                  type="number"
                  onWheel={blurOnWheel}
                  min={0}
                  step={500}
                  value={companyHousing}
                  onChange={(e) => setCompanyHousing(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-2 w-full rounded-lg border border-sand-300 px-3 py-2 text-ink-900 focus:border-camel-400 focus:outline-none"
                />
                <span className="mt-1 block text-xs text-ink-500">
                  很多 offer 會把薪水拆成 basic + housing + transport，這裡填 housing 那一項。
                </span>
              </label>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasCar}
                    onChange={(e) => setHasCar(e.target.checked)}
                    className="h-4 w-4 accent-[var(--color-camel-500)]"
                  />
                  <span className="text-sm text-ink-700">會養車（阿布達比幾乎必備）</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={companyInsurance}
                    onChange={(e) => setCompanyInsurance(e.target.checked)}
                    className="h-4 w-4 accent-[var(--color-camel-500)]"
                  />
                  <span className="text-sm text-ink-700">公司提供醫療保險（法定要求）</span>
                </label>
              </div>
            </div>
          </div>

          {/* 結果區 */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-sand-200 bg-white p-6">
              <table className="w-full text-sm">
                <tbody>
                  {result.rows.map((row) => (
                    <tr key={row.label} className="border-b border-sand-100">
                      <td className="py-3 align-top">
                        <p className="text-ink-900">{row.label}</p>
                        {row.note && <p className="mt-0.5 text-xs text-ink-500">{row.note}</p>}
                      </td>
                      <td className="py-3 text-right align-top whitespace-nowrap text-ink-700">
                        {aed(row.value)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b-2 border-sand-300">
                    <td className="py-3 font-semibold text-ink-900">每月支出合計</td>
                    <td className="py-3 text-right font-semibold whitespace-nowrap text-ink-900">
                      {aed(result.total)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                className={`mt-6 rounded-xl p-5 ${
                  result.balance >= 0 ? 'bg-gulf-500/10' : 'bg-clay-500/10'
                }`}
              >
                <p className="text-sm text-ink-700">每月結餘</p>
                <p
                  className={`mt-1 text-3xl font-semibold ${
                    result.balance >= 0 ? 'text-gulf-600' : 'text-clay-600'
                  }`}
                >
                  {aed(result.balance)}
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  約新台幣 {Math.round(twd).toLocaleString('zh-TW')} 元／月
                  {result.balance > 0 && (
                    <> ・ 一年約 {Math.round(twd * 12).toLocaleString('zh-TW')} 元</>
                  )}
                </p>
                {result.balance < 0 && (
                  <p className="text-flow mt-3 text-sm text-clay-600">
                    這個組合會入不敷出。可以試著調低租金等級、換小一點的房型，或把城市換成沙迦通勤。
                  </p>
                )}
              </div>

              <p className="text-flow mt-5 text-xs text-ink-500">
                以上是<strong className="text-ink-700">參考基準</strong>，不是報價。租金會因為棟別、樓層、家具、
                付款次數（一次付清最便宜）差很多；學費因學校體系差距更大。
                匯率以 1 AED ≈ {cost.fx.twdPerAed} TWD 估算，實際請查即時匯率。
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
