import { Container, PageHeader } from '../components/ui'
import resources from '../data/zh/resources.json'

export default function Resources() {
  return (
    <>
      <PageHeader
        eyebrow="用得到的連結"
        title="資源連結"
        lead="官方入口網站、台灣駐外單位、以及查資料時真的會用到的工具。優先去官網查，本站只負責幫你找到路。"
        updated={resources.updated}
      />

      <Container className="py-12">
        <div className="max-w-3xl space-y-10">
          {resources.groups.map((group) => (
            <section key={group.title}>
              <h2 className="text-xl font-semibold tracking-tight text-ink-900">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.url} className="rounded-2xl border border-sand-200 bg-white p-4">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-camel-600 underline underline-offset-4 hover:text-camel-500"
                    >
                      {link.label} ↗
                    </a>
                    {link.note && (
                      <p className="text-flow mt-1 text-sm text-ink-500">{link.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
