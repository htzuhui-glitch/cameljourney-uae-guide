import { useMemo, useState } from 'react'
import { Container, PageHeader } from '../components/ui'
import {
  COST,
  type HousingKey,
  type Tier,
  aed,
  aedToTwd,
  calculate,
  twd,
  twdToAed,
} from '../lib/cost'

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
  { label: '單身省錢型', salaryAed: 12000, housing: 'studio' as HousingKey, tier: 'low' as Tier, adults: 1, children: 0, hasCar: false },
  { label: '單身舒適型', salaryAed: 20000, housing: 'oneBr' as HousingKey, tier: 'mid' as Tier, adults: 1, children: 0, hasCar: true },
  { label: '雙薪無小孩', salaryAed: 32000, housing: 'oneBr' as HousingKey, tier: 'high' as Tier, adults: 2, children: 0, hasCar: true },
  { label: '一家四口', salaryAed: 45000, housing: 'threeBr' as HousingKey, tier: 'mid' as Tier, adults: 2, children: 2, hasCar: true },
]

/** 捲動頁面時滑過數字欄位會改動數值，很容易誤觸，所以捲動前先失焦 */
function blurOnWheel(event: React.WheelEvent<HTMLInputElement>) {
  event.currentTarget.blur()
}

export default function Cost() {
  const [citySlug, setCitySlug] = useState(COST.cities[0].slug)
  const [currency, setCurrency] = useState<'AED' | 'TWD'>('AED')
  const [salaryAed, setSalaryAed] = useState(20000)
  const [housing, setHousing] = useState<HousingKey>('oneBr')
  const [tier, setTier] = useState<Tier>('mid')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [hasCar, setHasCar] = useState(true)
  const [companyHousing, setCompanyHousing] = useState(0)
  const [companyInsurance, setCompanyInsurance] = useState(true)

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setSalaryAed(preset.salaryAed)
    setHousing(preset.housing)
    setTier(preset.tier)
    setAdults(preset.adults)
    setChildren(preset.children)
    setHasCar(preset.hasCar)
  }

  const { rows, total } = useMemo(
    () =>
      calculate({
        citySlug,
        housing,
        tier,
        adults,
        children,
        hasCar,
        companyHousing,
        companyInsurance,
      }),
    [citySlug, housing, tier, adults, children, hasCar, companyHousing, companyInsurance],
  )

  const balance = salaryAed - total
  const salaryShown = currency === 'AED' ? salaryAed : aedToTwd(salaryAed)

  const onSalaryChange = (value: number) => {
    setSalaryAed(currency === 'AED' ? value : twdToAed(value))
  }

  return (
    <>
      <PageHeader
        eyebrow="本站最實用的一頁"
        title="生活成本試算"
        lead="手上有一份 offer，但不知道這個數字在阿聯酋算多還算少？把條件填進去，直接看每個月大概剩多少。薪水可以填台幣或迪拉姆。"
        updated={COST.updated}
      />

      <Container className="py-12">
        <p className="text-flow mb-8 rounded-2xl border border-sand-300 bg-sand-100/60 p-4 text-sm text-ink-700">
          {COST.basisNote}
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
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-ink-900">月薪</span>
                  <div className="flex gap-1 rounded-full bg-sand-100 p-1">
                    {(['AED', 'TWD'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCurrency(option)}
                        className={`rounded-full px-3 py-1 text-xs transition-colors ${
                          currency === option
                            ? 'bg-camel-500 text-white'
                            : 'text-ink-700 hover:text-camel-600'
                        }`}
                      >
                        {option === 'AED' ? '迪拉姆' : '台幣'}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="number"
                  onWheel={blurOnWheel}
                  min={0}
                  step={currency === 'AED' ? 500 : 5000}
                  value={Math.round(salaryShown)}
                  onChange={(e) => onSalaryChange(Number(e.target.value) || 0)}
                  className="mt-2 w-full rounded-lg border border-sand-300 px-3 py-2 text-ink-900 focus:border-camel-400 focus:outline-none"
                />
                <span className="mt-1 block text-xs text-ink-500">
                  {currency === 'AED'
                    ? `約 ${twd(aedToTwd(salaryAed))}／月。阿聯酋沒有個人所得稅，offer 上的數字通常就是實領。`
                    : `約 ${aed(salaryAed)}／月。填你現在的台灣薪水，就能看到同樣的錢在這裡是什麼光景。`}
                </span>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-ink-900">城市</span>
                <select
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-sand-300 bg-white px-3 py-2 text-ink-900 focus:border-camel-400 focus:outline-none"
                >
                  {COST.cities.map((c) => (
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
                  {rows.map((row) => (
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
                      {aed(total)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                className={`mt-6 rounded-xl p-5 ${balance >= 0 ? 'bg-gulf-500/10' : 'bg-clay-500/10'}`}
              >
                <p className="text-sm text-ink-700">每月結餘</p>
                <p
                  className={`mt-1 text-3xl font-semibold ${
                    balance >= 0 ? 'text-gulf-600' : 'text-clay-600'
                  }`}
                >
                  {aed(balance)}
                </p>
                <p className="mt-2 text-sm text-ink-500">
                  約 {twd(aedToTwd(balance))}／月
                  {balance > 0 && <> ・ 一年約 {twd(aedToTwd(balance) * 12)}</>}
                </p>
                {balance < 0 && (
                  <p className="text-flow mt-3 text-sm text-clay-600">
                    這個組合會入不敷出。月薪要談到 {aed(total)}（約 {twd(aedToTwd(total))}）才打平，
                    或是調低租金等級、換小一點的房型、把城市換成沙迦通勤。
                  </p>
                )}
              </div>

              <p className="text-flow mt-5 text-xs text-ink-500">
                以上是<strong className="text-ink-700">參考基準</strong>，不是報價。租金會因為棟別、樓層、家具、
                付款次數（一次付清最便宜）差很多；學費因學校體系差距更大。
                匯率以 1 AED ≈ {COST.fx.twdPerAed} TWD 估算，實際請查即時匯率。
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
