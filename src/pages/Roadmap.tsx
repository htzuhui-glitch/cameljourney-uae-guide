import { Link } from 'react-router-dom'
import { Container, DraftBadge, PageHeader } from '../components/ui'
import { getTopicsByPhase } from '../lib/content'
import { PHASE_DESC, PHASE_LABEL, PHASE_ORDER } from '../lib/types'

export default function Roadmap() {
  const byPhase = getTopicsByPhase()

  return (
    <>
      <PageHeader
        eyebrow="核心頁"
        title="落地路線圖"
        lead="來阿聯酋工作要處理的事情分成四個階段。每一關點進去都有可以勾選的步驟清單、費用與時程、以及最容易卡關的地方。"
      />

      <Container className="py-14">
        <div className="space-y-14">
          {PHASE_ORDER.map((phase, index) => (
            <section key={phase}>
              <div className="flex items-baseline gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-camel-500 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-ink-900">
                    {PHASE_LABEL[phase]}
                  </h2>
                  <p className="text-flow text-sm text-ink-500">{PHASE_DESC[phase]}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {byPhase[phase].map((topic) => (
                  <Link
                    key={topic.slug}
                    to={`/roadmap/${topic.slug}`}
                    className="group rounded-2xl border border-sand-200 bg-white p-5 transition-colors hover:border-camel-400"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-ink-900 group-hover:text-camel-600">
                        {topic.title}
                      </h3>
                      {topic.status === 'draft' && <DraftBadge />}
                    </div>
                    <p className="text-flow mt-2 text-sm text-ink-500">{topic.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
