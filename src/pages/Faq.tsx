import { Container, PageHeader } from '../components/ui'
import faq from '../data/zh/faq.json'

export default function Faq() {
  return (
    <>
      <PageHeader
        eyebrow="快速查詢"
        title="常見問題"
        lead="來訊問最多的幾個問題，先在這裡一次回答。"
        updated={faq.updated}
      />

      <Container className="py-12">
        <div className="max-w-3xl space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-sand-200 bg-white p-5 open:border-camel-400"
            >
              <summary className="cursor-pointer list-none font-medium text-ink-900 marker:hidden">
                <span className="flex items-start gap-3">
                  <span className="text-camel-500 transition-transform group-open:rotate-90">›</span>
                  <span>{item.q}</span>
                </span>
              </summary>
              <p className="text-flow mt-3 pl-6 text-sm text-ink-700">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </>
  )
}
