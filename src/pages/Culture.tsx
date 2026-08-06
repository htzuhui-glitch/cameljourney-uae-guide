import { Container, PageHeader } from '../components/ui'
import cultureData from '../data/zh/culture.json'

interface CultureItem {
  title: string
  body: string
}

interface CultureSection {
  title: string
  intro?: string
  items: CultureItem[]
}

const culture = cultureData as {
  updated: string
  lead: string
  sections: CultureSection[]
}

export default function Culture() {
  return (
    <>
      <PageHeader
        eyebrow="不知道會踩雷"
        title="文化與法律"
        lead={culture.lead}
        updated={culture.updated}
      />

      <Container className="py-12">
        <div className="max-w-3xl space-y-12">
          {culture.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight text-ink-900">{section.title}</h2>
              {section.intro && (
                <p className="text-flow mt-2 text-sm text-ink-500">{section.intro}</p>
              )}
              <div className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-sand-200 bg-white p-5"
                  >
                    <h3 className="font-semibold text-ink-900">{item.title}</h3>
                    <p className="text-flow mt-2 text-sm text-ink-700">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
