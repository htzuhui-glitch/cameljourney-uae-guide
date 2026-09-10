import { Container } from '../components/ui'
import { SOCIAL } from '../lib/site'

/**
 * 「阿聯酋求職實戰攻略」訂閱後的交付頁——只給想找工作、還不知道怎麼下手的讀者看。
 *
 * 三個客群、三個獨立頁面之一：這裡只做一件事，下載 PDF。
 * 不放路線圖、生活成本這些站內連結——那些是給已經決定要來、要處理落地雜事的人看的，
 * 跟「還在想要不要投履歷」的人是不同階段，硬塞在一起只會讓人分心。
 * 那批客群的訂閱走 /welcome（見 Welcome.tsx）。
 * 轉機／旅遊客群則是 /thanks（見 Thanks.tsx）。
 *
 * 套用 BareLayout，不含共用頁首導覽列（見 App.tsx 的路由分組）。
 *
 * Kit 表單設定成「送出後導向這一頁」，下載就不必依賴 email 能不能寄到。
 * 換新版攻略時直接覆蓋 public/downloads/ 底下的同一個檔名，連結就不會失效。
 * 這份原檔標題帶 (1)，是系列第一篇，之後有第二篇要另外處理。
 */

const GUIDE = import.meta.env.BASE_URL + 'downloads/uae-job-guide.pdf'

export default function Job() {
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
            謝謝你訂閱。這份求職攻略希望能幫你建立一個清晰的輪廓，
            有勇氣丟出第一份履歷、改好第一個 LinkedIn 檔案。
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
            下載阿聯酋求職實戰攻略
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
                  · <strong>LinkedIn 求職技巧</strong>——超過八成的專業工作是透過這裡找到的，
                  履歷怎麼優化、地點怎麼設定都在裡面。
                </li>
                <li>
                  · <strong>簽證詐騙提醒</strong>——正規公司絕對不會向你收簽證費或押金，
                  這件事務必先知道。
                </li>
                <li>
                  · <strong>合約總包怎麼看</strong>——底薪、房租津貼、醫療保險、返鄉機票，
                  簽約前要確認的都列出來了。
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
              <h2 className="text-base font-semibold text-ink-900">出發前再看兩支影片</h2>
              <p className="mt-2 text-sm text-ink-500">
                攻略裡提到的求職實戰細節，我也拍成影片了，建議出發前先做足功課。
              </p>
              <div className="mt-4 space-y-2.5">
                <a
                  href="https://youtu.be/MzCdzBWY-_s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-camel-600 underline underline-offset-4
                             hover:text-camel-500"
                >
                  求職攻略（上）
                </a>
                <a
                  href="https://youtu.be/MGX73c08Blc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-camel-600 underline underline-offset-4
                             hover:text-camel-500"
                >
                  求職攻略（下）
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-sand-200 bg-white p-6">
              <h2 className="text-base font-semibold text-ink-900">來頻道找我聊</h2>
              <p className="mt-2 text-sm text-ink-500">
                看完還有大大小小的疑問都正常，私訊我都可以。
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
          </aside>
        </div>
      </Container>
    </>
  )
}
