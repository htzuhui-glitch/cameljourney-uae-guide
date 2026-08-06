import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  COST,
  DEFAULT_INPUT,
  aed,
  aedToTwd,
  calculate,
  twd,
  twdToAed,
} from '../lib/cost'

/**
 * 首頁的快速試算。刻意只留「台幣月薪」和「城市」兩個輸入，
 * 讓還沒打算搬來的人也能三秒鐘得到一個結論，完整版在 /cost。
 */
export default function QuickCost() {
  const [salaryTwd, setSalaryTwd] = useState(60000)
  const [citySlug, setCitySlug] = useState(DEFAULT_INPUT.citySlug)
  const [companyAccommodation, setCompanyAccommodation] = useState(false)

  const { total, city } = useMemo(
    () => calculate({ ...DEFAULT_INPUT, citySlug, companyAccommodation }),
    [citySlug, companyAccommodation],
  )

  const salaryAed = twdToAed(salaryTwd)
  const balance = salaryAed - total
  const enough = balance >= 0

  return (
    <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
      <label className="block">
        <span className="text-sm font-medium text-ink-900">你現在（或想拿到）的月薪是多少？</span>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg text-ink-500">NT$</span>
          <input
            type="range"
            min={30000}
            max={600000}
            step={5000}
            value={Math.min(salaryTwd, 600000)}
            onChange={(e) => setSalaryTwd(Number(e.target.value))}
            aria-label="台幣月薪滑桿"
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-sand-200 accent-[var(--color-camel-500)]"
          />
          {/* 用文字欄位而非 number，才能顯示千分位逗號 */}
          <input
            id="quick-cost-salary"
            type="text"
            inputMode="numeric"
            value={salaryTwd.toLocaleString('zh-TW')}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '')
              setSalaryTwd(digits ? Math.min(Number(digits), 99999999) : 0)
            }}
            aria-label="台幣月薪"
            className="w-28 shrink-0 rounded-lg border border-transparent px-2 py-1 text-right text-lg font-semibold text-ink-900 tabular-nums hover:border-sand-300 focus:border-camel-400 focus:outline-none"
          />
        </div>
        <span className="mt-1 block text-xs text-ink-500">
          滑桿到 60 萬，更高的數字可以直接在右邊輸入。
        </span>
      </label>

      <div className="mt-5 flex flex-wrap gap-2">
        {COST.cities.map((option) => (
          <button
            key={option.slug}
            type="button"
            onClick={() => setCitySlug(option.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              citySlug === option.slug
                ? 'border-camel-500 bg-camel-500 text-white'
                : 'border-sand-300 text-ink-700 hover:border-camel-400'
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>

      <label className="mt-4 flex items-center gap-3">
        <input
          type="checkbox"
          checked={companyAccommodation}
          onChange={(e) => setCompanyAccommodation(e.target.checked)}
          className="h-4 w-4 accent-[var(--color-camel-500)]"
        />
        <span className="text-sm text-ink-700">公司提供宿舍（不用自己付房租）</span>
      </label>

      <div className="mt-6 space-y-3 border-t border-sand-200 pt-6 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-ink-500">你的薪水換算成當地幣別</span>
          <span className="font-medium whitespace-nowrap text-ink-900">{aed(salaryAed)}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-ink-500">
            在{city.name}，單身{companyAccommodation ? '住公司宿舍' : '住一房'}、有車的每月開銷
          </span>
          <span className="font-medium whitespace-nowrap text-ink-900">{aed(total)}</span>
        </div>
      </div>

      <div
        className={`mt-6 rounded-2xl p-5 ${enough ? 'bg-gulf-500/10' : 'bg-clay-500/10'}`}
      >
        {enough ? (
          <>
            <p className="text-sm text-ink-700">這樣的薪水，每個月大概可以存下</p>
            <p className="mt-1 text-3xl font-semibold text-gulf-600">{aed(balance)}</p>
            <p className="text-flow mt-2 text-sm text-ink-500">
              約 {twd(aedToTwd(balance))}／月，一年約 {twd(aedToTwd(balance) * 12)}。
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-ink-700">
              這樣的薪水直接搬過來，每個月會短少 {aed(-balance)}
            </p>
            <p className="text-flow mt-3 text-sm text-ink-700">
              要在{city.name}過上面這種生活，月薪大約要談到
            </p>
            <p className="mt-1 text-3xl font-semibold text-clay-600">{aed(total)}</p>
            <p className="text-flow mt-2 text-sm text-ink-500">
              也就是約 {twd(aedToTwd(total))}／月才打平。這就是為什麼談 offer 不能拿台灣的數字去想。
            </p>
          </>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link
          to="/cost"
          className="rounded-full bg-camel-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-camel-600"
        >
          換成我的真實條件再算一次 →
        </Link>
        <span className="text-xs text-ink-500">可以加上家人、小孩學費、公司住房津貼</span>
      </div>
    </div>
  )
}
