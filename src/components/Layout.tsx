import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { NAV, SITE, SOCIAL } from '../lib/site'

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight text-ink-900 group-hover:text-camel-600">
            {SITE.name}
          </span>
          <span className="hidden text-sm text-ink-500 sm:inline">{SITE.subtitle}</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-camel-500 text-white'
                    : 'text-ink-700 hover:bg-sand-100 hover:text-camel-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="開關選單"
          className="ml-auto rounded-lg border border-sand-200 px-3 py-1.5 text-sm text-ink-700 lg:hidden"
        >
          {open ? '關閉' : '選單'}
        </button>
      </div>

      {open && (
        <nav className="border-t border-sand-200 bg-sand-50 px-5 pb-4 lg:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm ${
                  isActive ? 'bg-camel-500 text-white' : 'text-ink-700 hover:bg-sand-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

function Footer() {
  const socials = SOCIAL.filter((item) => item.url)

  return (
    <footer className="mt-20 border-t border-sand-200 bg-sand-100">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-sm font-semibold text-ink-900">
          {SITE.name} — {SITE.subtitle}
        </p>

        {socials.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-sand-300 px-4 py-1.5 text-sm text-ink-700 transition-colors hover:border-camel-400 hover:text-camel-600"
              >
                {item.label} ↗
              </a>
            ))}
          </div>
        )}

        <p className="text-flow mt-5 max-w-3xl text-sm text-ink-500">
          本站是個人經驗與公開資料的整理，<strong className="text-ink-700">不是法律、稅務或移民建議</strong>。
          阿聯酋的簽證與居留規定變動頻繁，實際辦理前請以官方網站或你的雇主 PRO 提供的資訊為準。
          每一頁都標有最後查證日期，看到日期太舊請當作參考而非依據。
        </p>
        <p className="mt-4 text-sm text-ink-500">
          <Link to="/about" className="underline underline-offset-4 hover:text-camel-600">
            關於本站
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
