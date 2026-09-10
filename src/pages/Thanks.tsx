import { Container } from '../components/ui'
import { SOCIAL } from '../lib/site'

/**
 * 「阿布達比轉機攻略」訂閱後的感謝頁——只給轉機／旅遊讀者看。
 *
 * 這是兩個客群裡的其中一個：轉機讀者要的是攻略 PDF，不是落地工作的內容，
 * 所以這一頁刻意不放路線圖、生活成本這些工作向的連結，避免混淆。
 * 工作／落地客群的訂閱走另一個獨立頁面（見 ThanksWork.tsx）。
 *
 * Kit 表單設定成「送出後導向這一頁」，下載就不必依賴 email 能不能寄到，
 * 信件掉進垃圾郵件匣也不會擋住任何人拿到攻略。
 *
 * 換新版攻略時直接覆蓋 public/downloads/ 底下的同一個檔名，連結就不會失效。
 */

const GUIDE = import.meta.env.BASE_URL + 'downloads/abudhabi-2days-guide.pdf'

export default function Thanks() {
  const instagram = SOCIAL.find((item) => item.id === 'instagram' && item.url)
  const youtube = SOCIAL.find((item) => item.id === 'youtube' && item.url)

  return (
    <>
      <div className="border-b border-sand-200 bg-sand-100/60 py-16">
        <Container>
          <p className="mb-3 text-sm font-medium tracking-wide text-camel-600">訂閱成功</p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            攻略在這裡，直接下載
          </h1>
          <p className="text-flow mt-4 max-w-2xl text-ink-500">
            謝謝你訂閱。這份攻略裡的每個地方我都自己去過，希望你這兩天玩得順。
          </p>

          <a
            href={GUIDE}
            download
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-camel-600 px-7 py-4
                       text-base font-semibold text-sand-50 shadow-sm transition
                       hover:bg-camel-500 focus-visible:outline focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-camel-600"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 11 5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
            下載阿布達比 2 天 1 夜攻略
          </a>

          <p className="mt-4 text-sm text-ink-500">PDF ・ 手機和電腦都能看</p>
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="text-flow space-y-6 text-ink-700">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">先看這幾頁</h2>
              <ul className="mt-4 space-y-2">
                <li>
                  · <strong>行前必看</strong>——eSIM、叫車、支付、服裝，四件出發前先處理掉的事。
                </li>
                <li>
                  · <strong>清真寺服裝規定</strong>——這是最多人在門口被攔下來的地方，尤其女生的頭巾。
                </li>
                <li>
                  · <strong>兩天行程</strong>——每個景點都附 Google 地圖和中文訂票連結，點了直接開。
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-sand-200 bg-sand-50 p-5">
              <p className="text-sm text-ink-700">
                <strong>我也寄了一封到你信箱</strong>，方便你之後回頭找。
                Gmail 有時候會把它丟到「促銷內容」分頁，順手拖回「主要」就好。
                如果完全沒收到，直接私訊我，我手動寄給你。
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-sand-200 bg-white p-6">
              <h2 className="text-base font-semibold text-ink-900">來頻道找我聊</h2>
              <p className="mt-2 text-sm text-ink-500">
                行程排好了想找人確認一下，或是有什麼想問的，私訊我都可以。
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
            </div>

            <div className="rounded-xl bg-ink-900 p-6 text-sand-100">
              <p className="text-sm leading-relaxed">
                攻略裡部分訂票連結是聯盟連結，透過連結購買不會增加你的費用，
                但會給我一點點支持，讓這類免費內容可以繼續做下去。謝謝你。
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
