import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, DraftBadge, LastUpdated, Section } from '../components/ui'
import { getTopic } from '../lib/content'
import { PHASE_LABEL } from '../lib/types'

/** 勾選狀態存在瀏覽器本機，換裝置不會同步，但夠用且不需要登入 */
function useChecklist(slug: string, total: number) {
  const key = `checklist:${slug}`
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved) as boolean[]
        setChecked(Array.from({ length: total }, (_, i) => parsed[i] ?? false))
      } else {
        setChecked(Array(total).fill(false))
      }
    } catch {
      setChecked(Array(total).fill(false))
    }
  }, [key, total])

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = prev.map((v, i) => (i === index ? !v : v))
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        // 無痕模式寫不進去就算了，不影響閱讀
      }
      return next
    })
  }

  const reset = () => {
    setChecked(Array(total).fill(false))
    try {
      localStorage.removeItem(key)
    } catch {
      // 同上
    }
  }

  return { checked, toggle, reset }
}

export default function RoadmapTopic() {
  const { slug = '' } = useParams()
  const topic = getTopic(slug)
  const { checked, toggle, reset } = useChecklist(slug, topic?.steps.length ?? 0)

  if (!topic) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink-900">找不到這個主題</h1>
        <Link
          to="/roadmap"
          className="mt-4 inline-block text-sm text-camel-600 underline underline-offset-4"
        >
          回落地路線圖
        </Link>
      </Container>
    )
  }

  const done = checked.filter(Boolean).length
  const progress = topic.steps.length ? Math.round((done / topic.steps.length) * 100) : 0

  return (
    <>
      <div className="border-b border-sand-200 bg-sand-100/60 py-12">
        <Container>
          <Link
            to="/roadmap"
            className="text-sm text-camel-600 underline-offset-4 hover:underline"
          >
            ← 落地路線圖
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-camel-500 px-3 py-1 text-xs font-medium text-white">
              {PHASE_LABEL[topic.phase]}
            </span>
            {topic.status === 'draft' && <DraftBadge />}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            {topic.title}
          </h1>
          <p className="text-flow mt-4 max-w-3xl text-lg text-ink-500">{topic.summary}</p>
          <LastUpdated date={topic.updated} className="mt-5" />
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-3xl">
          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <Section title="開始之前先確認">
              <ul className="space-y-2">
                {topic.prerequisites.map((item) => (
                  <li key={item} className="text-flow flex gap-2 text-ink-700">
                    <span className="text-camel-500">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {topic.steps.length > 0 && (
            <Section title="步驟清單">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand-200">
                  <div
                    className="h-full rounded-full bg-camel-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="shrink-0 text-sm text-ink-500">
                  {done} / {topic.steps.length}
                </span>
                {done > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="shrink-0 text-sm text-ink-500 underline underline-offset-4 hover:text-camel-600"
                  >
                    清除
                  </button>
                )}
              </div>

              <ol className="space-y-3">
                {topic.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-sand-200 bg-white p-4 transition-colors"
                  >
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={checked[index] ?? false}
                        onChange={() => toggle(index)}
                        className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-camel-500)]"
                      />
                      <div className="min-w-0">
                        <p
                          className={`font-medium ${
                            checked[index] ? 'text-ink-500 line-through' : 'text-ink-900'
                          }`}
                        >
                          {index + 1}. {step.title}
                        </p>
                        {step.detail && (
                          <p className="text-flow mt-1 text-sm text-ink-500">{step.detail}</p>
                        )}
                        {step.note && (
                          <p className="text-flow mt-2 rounded-lg bg-sand-100 px-3 py-2 text-sm text-clay-600">
                            {step.note}
                          </p>
                        )}
                      </div>
                    </label>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {topic.costs && topic.costs.length > 0 && (
            <Section title="費用與時程">
              <div className="overflow-x-auto rounded-2xl border border-sand-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-sand-200 bg-sand-100/60">
                    <tr>
                      <th className="px-4 py-3 font-medium text-ink-700">項目</th>
                      <th className="px-4 py-3 font-medium text-ink-700">金額／時間</th>
                      <th className="px-4 py-3 font-medium text-ink-700">說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topic.costs.map((cost) => (
                      <tr key={cost.item} className="border-b border-sand-100 last:border-0">
                        <td className="px-4 py-3 text-ink-900">{cost.item}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-ink-700">{cost.amount}</td>
                        <td className="px-4 py-3 text-ink-500">{cost.note ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {topic.pitfalls && topic.pitfalls.length > 0 && (
            <Section title="最常卡關的地方">
              <ul className="space-y-3">
                {topic.pitfalls.map((item) => (
                  <li
                    key={item}
                    className="text-flow rounded-2xl border border-sand-200 bg-white p-4 text-sm text-ink-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {topic.videos && topic.videos.length > 0 && (
            <Section title="延伸影片">
              <ul className="space-y-3">
                {topic.videos.map((video) => (
                  <li key={video.url}>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4 transition-colors hover:border-camel-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clay-500/10 text-clay-600"
                      >
                        ▶
                      </span>
                      <span className="text-flow text-sm text-ink-700 group-hover:text-camel-600">
                        {video.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {topic.links && topic.links.length > 0 && (
            <Section title="官方與參考連結">
              <ul className="space-y-2">
                {topic.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-camel-600 underline underline-offset-4 hover:text-camel-500"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </Container>
    </>
  )
}
