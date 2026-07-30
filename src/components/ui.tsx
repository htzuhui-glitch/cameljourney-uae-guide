import type { ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  updated,
}: {
  eyebrow?: string
  title: string
  lead?: string
  updated?: string
}) {
  return (
    <div className="border-b border-sand-200 bg-sand-100/60 py-12">
      <Container>
        {eyebrow && (
          <p className="mb-2 text-sm font-medium tracking-wide text-camel-600">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">{title}</h1>
        {lead && <p className="text-flow mt-4 max-w-3xl text-ink-500">{lead}</p>}
        {updated && <LastUpdated date={updated} className="mt-5" />}
      </Container>
    </div>
  )
}

export function LastUpdated({ date, className = '' }: { date: string; className?: string }) {
  return (
    <p className={`text-sm text-ink-500 ${className}`}>
      最後查證：<time dateTime={date}>{date}</time>
    </p>
  )
}

export function DraftBadge() {
  return (
    <span className="rounded-full bg-sand-200 px-2.5 py-0.5 text-xs font-medium text-ink-700">
      撰寫中
    </span>
  )
}

export function Section({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`mt-12 ${className}`}>
      <h2 className="text-xl font-semibold tracking-tight text-ink-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function Placeholder({ what }: { what: string }) {
  return (
    <Container className="py-20">
      <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-100/50 p-10 text-center">
        <p className="text-ink-700">
          <strong>{what}</strong> 的內容還在整理中。
        </p>
        <p className="text-flow mt-2 text-sm text-ink-500">
          架構已經接好了，補上資料檔案就會出現在這裡。
        </p>
      </div>
    </Container>
  )
}
