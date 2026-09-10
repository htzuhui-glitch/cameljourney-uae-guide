import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SITE } from '../lib/site'

/**
 * 給訂閱後的單一用途交付頁用（/thanks、/job）。
 *
 * 不套用網站共用的頁首導覽列——那排連結（落地路線圖、生活成本試算…）
 * 是給「落地／工作」客群逛網站用的，轉機讀者或只想要求職 PDF 的人
 * 打開頁面看到這些無關的分類連結，就是在混客群。
 *
 * 這裡只留一條極簡的品牌列，不放任何導覽連結。
 * 頁尾的社群連結、免責聲明由每個頁面自己在內文裡處理。
 */
export default function BareLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <div className="border-b border-sand-200">
        <p className="mx-auto max-w-6xl px-5 py-4 text-sm font-semibold tracking-tight text-ink-900">
          {SITE.name}
        </p>
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
