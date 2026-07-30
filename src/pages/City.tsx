import { Link, useParams } from 'react-router-dom'
import { Container, LastUpdated } from '../components/ui'
import { getCity } from '../lib/content'

export default function City() {
  const { city: slug = '' } = useParams()
  const city = getCity(slug)

  if (!city) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink-900">找不到這座城市</h1>
        <Link
          to="/cities"
          className="mt-4 inline-block text-sm text-camel-600 underline underline-offset-4"
        >
          回城市列表
        </Link>
      </Container>
    )
  }

  return (
    <>
      <div className="border-b border-sand-200 bg-sand-100/60 py-12">
        <Container>
          <Link to="/cities" className="text-sm text-camel-600 underline-offset-4 hover:underline">
            ← 城市與區域
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            {city.name}
          </h1>
          <p className="mt-1 text-ink-500">{city.nameEn}</p>
          <p className="text-flow mt-4 max-w-3xl text-lg text-ink-500">{city.summary}</p>
          <LastUpdated date={city.updated} className="mt-5" />
        </Container>
      </div>

      <Container className="py-12">
        {city.highlights.length > 0 && (
          <ul className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {city.highlights.map((item) => (
              <li
                key={item}
                className="text-flow rounded-2xl border border-sand-200 bg-white p-4 text-sm text-ink-700"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold tracking-tight text-ink-900">區域介紹</h2>
        <p className="text-flow mt-2 max-w-2xl text-sm text-ink-500">
          租金區間是找房時的參考範圍，實際價格會因為棟別、樓層、家具、付款次數而差很多。
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {city.areas.map((area) => (
            <Link
              key={area.slug}
              to={`/cities/${city.slug}/${area.slug}`}
              className="group rounded-2xl border border-sand-200 bg-white p-5 transition-colors hover:border-camel-400"
            >
              <h3 className="font-semibold text-ink-900 group-hover:text-camel-600">{area.name}</h3>
              <p className="text-xs text-ink-500">{area.nameEn}</p>
              <p className="text-flow mt-3 text-sm text-ink-500">{area.summary}</p>
              {area.rent.oneBr && (
                <p className="mt-4 text-xs text-camel-600">一房年租 {area.rent.oneBr}</p>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
