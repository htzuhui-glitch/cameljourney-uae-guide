import { Link } from 'react-router-dom'
import QuickCost from '../components/QuickCost'
import SocialIcon from '../components/SocialIcon'
import { Container } from '../components/ui'
import { getTopicsByPhase } from '../lib/content'
import { SITE, SOCIAL } from '../lib/site'
import { PHASE_DESC, PHASE_LABEL, PHASE_ORDER } from '../lib/types'

const ENTRIES = [
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
  {
    to: '/roadmap',
    title: '落地路線圖',
    desc: '真的要來了，從還在台灣、到抵達首月、到安頓下來，每一關該辦什麼、找誰辦、要多久。',
  },
  {
    to: '/faq',
    title: '常見問題',
    desc: '所得稅、駕照、要從台灣帶什麼、約滿酬金怎麼算，被問最多的幾題。',
  },
]

/** 把游標送到試算的薪水欄位。手機上會順便捲過去，桌機上則是直接可以打字 */
function focusQuickCost() {
  const input = document.getElementById('quick-cost-salary') as HTMLInputElement | null
  if (!input) return
  input.scrollIntoView({ behavior: 'smooth', block: 'center' })
  input.focus()
  input.select()
}

export default function Home() {
  const byPhase = getTopicsByPhase()
  const socials = SOCIAL.filter((item) => item.url)

  return (
    <>
      <section className="border-b border-sand-200 bg-linear-to-b from-sand-100 to-sand-50 py-16">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="lg:pt-4">
              <p className="text-sm font-medium tracking-wide text-camel-600">{SITE.name}</p>
              <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-ink-900 sm:text-5xl">
                來阿聯酋工作，
                <br />
                要知道的每一件事
              </h1>
              <p className="text-flow mt-5 max-w-xl text-lg text-ink-500">
                簽證怎麼辦、房子怎麼租、駕照怎麼考、家人怎麼接過來、一個月要花多少錢——
                這裡把來阿聯酋工作要跑的每一關，整理成可以照著走的清單。
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-sand-300 bg-white/60 p-5">
                  <p className="text-sm font-semibold text-camel-600">已經要出發了</p>
                  <p className="text-flow mt-1.5 text-sm text-ink-700">
                    拿到 offer、準備打包的人，從落地路線圖開始。四個階段十個關卡，
                    照順序走不會漏掉，也不會白跑一趟。
                  </p>
                  <Link
                    to="/roadmap"
                    className="mt-3 inline-block text-sm font-medium text-camel-600 underline-offset-4 hover:underline"
                  >
                    看落地路線圖 →
                  </Link>
                </div>

                <div className="rounded-2xl border border-sand-300 bg-white/60 p-5">
                  <p className="text-sm font-semibold text-camel-600">只是好奇</p>
                  <p className="text-flow mt-1.5 text-sm text-ink-700">
                    還沒有計畫也沒關係。填你現在的台灣月薪，三秒鐘就知道同樣的錢在這裡
                    能過什麼樣的生活。
                  </p>
                  <button
                    type="button"
                    onClick={focusQuickCost}
                    className="mt-3 text-sm font-medium text-camel-600 underline-offset-4 hover:underline"
                  >
                    填我的薪水試算 →
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-ink-700 lg:pt-4">
                先玩玩看：你的薪水在阿聯酋是什麼光景？
              </p>
              <QuickCost />
            </div>
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
          <h2 className="text-xl font-semibold tracking-tight text-ink-900">
            真的要來了？四個階段，十個關卡
          </h2>
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

        {socials.length > 0 && (
          <section className="mt-16 rounded-2xl border border-sand-200 bg-white p-8">
            <h2 className="text-xl font-semibold tracking-tight text-ink-900">
              想看阿聯酋的日常長什麼樣子
            </h2>
            <p className="text-flow mt-2 max-w-2xl text-sm text-ink-500">
              這個網站放的是要動手辦事時查得到的資訊；頻道上講的是住在這裡真實的樣子。兩邊搭著看。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-camel-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-camel-600"
                >
                  <SocialIcon id={item.id} className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  )
}
