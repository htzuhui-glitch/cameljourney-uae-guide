import { SOCIAL } from '../lib/site'
import SocialIcon from './SocialIcon'

/**
 * 一對一諮詢的入口。目前先用 Instagram 私訊接洽、不公開價格，
 * 等實際有人來問、確認需求樣貌之後再決定要不要放收費方式。
 */
export default function Consult() {
  const instagram = SOCIAL.find((item) => item.id === 'instagram' && item.url)
  if (!instagram) return null

  return (
    <section className="rounded-2xl border border-camel-400 bg-white p-8">
      <p className="text-sm font-medium text-camel-600">一對一諮詢</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink-900">
        想找人陪你把手上這份 offer 看一遍嗎？
      </h2>
      <p className="text-flow mt-3 max-w-2xl text-sm text-ink-700">
        網站上的東西是通則，但每個人的狀況不一樣——薪水這樣拆合不合理、該住哪一區、
        小孩學校怎麼選、合約裡哪幾條要爭取。這些問題查資料查不出來，講三十分鐘會比看三小時清楚。
      </p>
      <p className="text-flow mt-3 max-w-2xl text-sm text-ink-500">
        我人就住在阿布達比，視訊聊。目前採預約制，先私訊跟我說你的狀況，我們再約時間。
      </p>

      <a
        href={instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-camel-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-camel-600"
      >
        <SocialIcon id="instagram" className="h-4 w-4" />
        私訊 Instagram 聊聊
      </a>
    </section>
  )
}
