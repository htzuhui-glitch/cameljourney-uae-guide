import { Link } from 'react-router-dom'
import { Container } from '../components/ui'
import { getTopicsByPhase } from '../lib/content'
import { SITE } from '../lib/site'
import { PHASE_DESC, PHASE_LABEL, PHASE_ORDER } from '../lib/types'

const ENTRIES = [
  {
    to: '/roadmap',
    title: '落地路線圖',
    desc: '從還在台灣、到抵達首月、到安頓下來，每一關該辦什麼、找誰辦、要多久。',
  },
  {
    to: '/cost',
    title: '生活成本試算',
    desc: '輸入手上的 offer 和家庭狀況，直接算出每月大概能存下多少、換成台幣是多少。',
  },
  {
    to: '/cities',
    title: '城市與區域',
    desc: '阿布達比、杜拜、沙迦怎麼選；各城市的區域介紹、租金區間與通勤時間。',
  },
  {
    to: '/culture',
    title: '文化與法律',
    desc: '齋戒月、酒精、公共行為、社交禮儀——不知道會踩雷的那些事。',
  },
]

export default function Home() {
  const byPhase = getTopicsByPhase()

  return (
    <>
      <section className="border-b border-sand-200 bg-linear-to-b from-sand-100 to-sand-50 py-20">
        <Container>
          <p className="text-sm font-medium tracking-wide text-camel-600">{SITE.name}</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-ink-900 sm:text-5xl">
            {SITE.subtitle}
          </h1>
          <p className="text-flow mt-5 max-w-2xl text-lg text-ink-500">{SITE.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/roadmap"
              className="rounded-full bg-camel-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-camel-600"
            >
              從落地路線圖開始
            </Link>
            <Link
              to="/cost"
              className="rounded-full border border-sand-300 px-6 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-camel-400 hover:text-camel-600"
            >
              先算算這份 offer 夠不夠
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {ENTRIES.map((entry) => (
            <Link
              key={entry.to}
              to={entry.to}
              className="group rounded-2xl border border-sand-200 bg-white p-6 transition-colors hover:border-camel-400"
            >
              <h2 className="text-lg font-semibold text-ink-900 group-hover:text-camel-600">
                {entry.title}
              </h2>
              <p className="text-flow mt-2 text-sm text-ink-500">{entry.desc}</p>
            </Link>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-ink-900">四個階段，十個關卡</h2>
          <p className="text-flow mt-2 max-w-2xl text-sm text-ink-500">
            來阿聯酋工作要辦的事很多，但都有先後順序。照這條時間軸走，不會漏掉也不會白跑。
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PHASE_ORDER.map((phase) => (
              <div key={phase} className="rounded-2xl border border-sand-200 bg-white p-5">
                <p className="text-sm font-semibold text-camel-600">{PHASE_LABEL[phase]}</p>
                <p className="text-flow mt-1 text-xs text-ink-500">{PHASE_DESC[phase]}</p>
                <ul className="mt-4 space-y-1.5">
                  {byPhase[phase].map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        to={`/roadmap/${topic.slug}`}
                        className="text-sm text-ink-700 underline-offset-4 hover:text-camel-600 hover:underline"
                      >
                        {topic.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  )
}
