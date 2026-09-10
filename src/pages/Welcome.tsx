import { Container } from '../components/ui'
import { SITE, SOCIAL } from '../lib/site'

/**
 * 「阿聯酋工作生活指南」訂閱後的歡迎頁——只給打算來阿聯酋工作／長住的讀者看。
 *
 * 三個客群、三個獨立頁面之一：這裡沒有 PDF 可以下載，網站本身就是免費資源，
 * 訂閱後直接帶讀者進站，從最常用的幾頁開始逛。
 * 轉機客群走 /thanks（見 Thanks.tsx），求職 PDF 客群走 /job（見 Job.tsx），
 * 三邊各自獨立，不互相導流。
 *
 * 這頁本來就是要帶人逛網站，所以保留共用頁首導覽列（跟 /thanks、/job 不同，
 * 那兩頁套的是 BareLayout，見 App.tsx 的路由分組）。
 *
 * Kit 表單設定成「送出後導向這一頁」。
 */

const SECTIONS = [
  {
    to: '#/roadmap',
    title: '落地路線圖',
    desc: '來阿聯酋工作要處理的事情分成四個階段。每一關點進去都有可以勾選的步驟清單、費用與時程、以及最容易卡關的地方。',
  },
  {
    to: '#/cost',
    title: '生活成本試算',
    desc: '手上有一份 offer，但不知道這個數字在阿聯酋算多還算少？把條件填進去，直接看每個月大概剩多少。',
  },
  {
    to: '#/cities',
    title: '要住哪一座城市、哪一區',
    desc: '阿布達比和杜拜的房租、通勤、氛圍差很多，先選城市再看區域，比較不會白繞。',
  },
  {
    to: '#/culture',
    title: '文化與法律',
    desc: '不知道會踩雷的地方，先在這裡看過一遍。',
  },
  {
    to: '#/faq',
    title: '常見問題',
    desc: '來訊問最多的幾個問題，先在這裡一次回答。',
  },
  {
    to: '#/resources',
    title: '資源連結',
    desc: '官方入口網站、台灣駐外單位、以及查資料時真的會用到的工具。',
  },
]

export default function Welcome() {
  const instagram = SOCIAL.find((item) => item.id === 'instagram' && item.url)
  const youtube = SOCIAL.find((item) => item.id === 'youtube' && item.url)

  return (
    <>
      <div className="border-b border-sand-200 bg-sand-100/60 py-16">
        <Container>
          <p className="mb-3 text-sm font-medium tracking-wide text-camel-600">訂閱成功</p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            歡迎進站，先從這裡開始
          </h1>
          <p className="text-flow mt-4 max-w-2xl text-ink-500">
            {SITE.tagline}
            這個網站是我把自己落地的整個過程整理下來的，全部免費、持續更新。
          </p>

          <div className="mt-8 rounded-xl border border-sand-200 bg-white p-5">
            <p className="text-sm text-ink-700">
              <strong>我也寄了一封到你信箱</strong>，之後有新內容更新會用這個信箱通知你。
              Gmail 有時候會把它丟到「促銷內容」分頁，順手拖回「主要」就好。
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-14">
        <h2 className="text-xl font-semibold text-ink-900">最常用的幾頁</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <a
              key={s.to}
              href={import.meta.env.BASE_URL + s.to}
              className="group rounded-xl border border-sand-200 bg-white p-6 transition
                         hover:border-camel-400 hover:shadow-sm"
            >
              <h3 className="font-semibold text-ink-900 group-hover:text-camel-600">
                {s.title}
              </h3>
              <p className="text-flow mt-2 text-sm text-ink-500">{s.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-sand-200 bg-sand-50 p-6">
            <h2 className="text-base font-semibold text-ink-900">內容有錯或想補充</h2>
            <p className="text-flow mt-2 text-sm text-ink-700">
              這個網站的內容是開源的。發現資訊過期或有誤，歡迎到 GitHub repo（
              <code className="rounded bg-sand-100 px-1.5 py-0.5 text-xs">{SITE.repo}</code>
              ）開 issue 告訴我。每一頁都標了最後查證日期，阿聯酋的規定變動頻繁，請一切以官方公告為準。
            </p>
          </div>

          <aside className="rounded-xl border border-sand-200 bg-white p-6">
            <h2 className="text-base font-semibold text-ink-900">想找人聊聊你的狀況</h2>
            <p className="mt-2 text-sm text-ink-500">
              每個人的條件不一樣，想針對你自己的情況聊一聊，私訊我都可以。
            </p>
            <div className="mt-4 space-y-2.5">
              {instagram && (
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-camel-600 underline underline-offset-4
                             hover:text-camel-500"
                >
                  Instagram @cameljourney
                </a>
              )}
              {youtube && (
                <a
                  href={youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-camel-600 underline underline-offset-4
                             hover:text-camel-500"
                >
                  YouTube 慈飛蹲點阿拉伯
                </a>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
