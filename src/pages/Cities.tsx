import { Link } from 'react-router-dom'
import { Container, PageHeader } from '../components/ui'
import { getCities } from '../lib/content'

export default function Cities() {
  const cities = getCities()

  return (
    <>
      <PageHeader
        eyebrow="城市與區域"
        title="要住哪一座城市、哪一區"
        lead="阿聯酋不是一個生活圈。阿布達比和杜拜的房租、通勤、氛圍差很多，先選城市再看區域，比較不會白繞。這裡只做中性的區域介紹，不做評分。"
      />

      <Container className="py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={`/cities/${city.slug}`}
              className="group rounded-2xl border border-sand-200 bg-white p-6 transition-colors hover:border-camel-400"
            >
              <h2 className="text-lg font-semibold text-ink-900 group-hover:text-camel-600">
                {city.name}
              </h2>
              <p className="text-sm text-ink-500">{city.nameEn}</p>
              <p className="text-flow mt-3 text-sm text-ink-500">{city.summary}</p>
              <p className="mt-4 text-xs text-camel-600">
                收錄 {city.areas.length} 個區域 →
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
