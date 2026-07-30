import { Link } from 'react-router-dom'
import { Container } from '../components/ui'

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="text-sm font-medium text-camel-600">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-900">找不到這一頁</h1>
      <p className="text-flow mt-3 text-ink-500">網址可能打錯了，或這一頁還沒寫出來。</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-camel-500 px-6 py-3 text-sm font-medium text-white hover:bg-camel-600"
      >
        回首頁
      </Link>
    </Container>
  )
}
