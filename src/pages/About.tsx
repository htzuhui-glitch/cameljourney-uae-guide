import Consult from '../components/Consult'
import { Container, PageHeader } from '../components/ui'
import { SITE } from '../lib/site'

export default function About() {
  return (
    <>
      <PageHeader eyebrow="關於" title="關於本站" lead={SITE.tagline} />

      <Container className="py-12">
        <div className="text-flow max-w-3xl space-y-6 text-ink-700">
          <p>
            這個網站是「慈飛。蹲點阿拉伯」的延伸。頻道上講的是生活觀察，這裡放的是真的要動手辦事時
            會用到的東西：流程、費用、順序、以及哪裡容易卡住。
          </p>

          <h2 className="pt-4 text-xl font-semibold text-ink-900">內容原則</h2>
          <ul className="space-y-2">
            <li>· 每一頁都標最後查證日期，並附上官方來源連結。</li>
            <li>· 阿聯酋的簽證與居留規定變動頻繁，本站只做整理，一切以官方公告為準。</li>
            <li>· 不刊登針對特定雇主、公司或個人的評價與負面評論。</li>
          </ul>

          <h2 className="pt-4 text-xl font-semibold text-ink-900">為什麼不做雇主評價</h2>
          <p>
            阿聯酋的 Federal Decree-Law No. 34 of 2021（2024 年經 Federal Law No. 5 修正）將線上誹謗
            列為刑事罪，罰金可達 AED 250,000 至 500,000，並可能併科監禁，外籍人士另有遭驅逐出境的風險。
            法律見解認為，評論一旦從「服務或事實本身」延伸到攻擊名譽，就已經跨線，留言串同樣適用。
          </p>
          <p>
            所以本站改成提供中性的教育性內容——例如簽 offer 前該檢查哪些條款、約滿酬金怎麼算、
            遇到勞資糾紛可以向 MoHRE 申訴——一樣實用，但不指名道姓。
          </p>

          <h2 className="pt-4 text-xl font-semibold text-ink-900">免責聲明</h2>
          <p>
            本站是個人經驗與公開資料的整理，<strong>不構成法律、稅務、移民或投資建議</strong>。
            實際辦理前，請以官方網站、你的雇主 PRO，或合格的專業人士意見為準。
            因採用本站資訊而產生的任何後果，本站不承擔責任。
          </p>

          <h2 className="pt-4 text-xl font-semibold text-ink-900">內容有錯或想補充</h2>
          <p>
            這個網站的內容是開源的。發現資訊過期或有誤，歡迎到 GitHub repo（
            <code className="rounded bg-sand-100 px-1.5 py-0.5 text-sm">{SITE.repo}</code>
            ）開 issue 告訴我。
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <Consult />
        </div>
      </Container>
    </>
  )
}
