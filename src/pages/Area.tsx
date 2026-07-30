import { Link, useParams } from 'react-router-dom'
import { Container, Section } from '../components/ui'
import { getCity } from '../lib/content'

export default function Area() {
  const { city: citySlug = '', area: areaSlug = '' } = useParams()
  const city = getCity(citySlug)
  const area = city?.areas.find((a) => a.slug === areaSlug)

  if (!city || !area) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink-900">找不到這個區域</h1>
        <Link
          to="/cities"
          className="mt-4 inline-block text-sm text-camel-600 underline underline-offset-4"
        >
          回城市列表
        </Link>
      </Container>
    )
  }

  const rentRows = [
    { label: 'Studio 套房', value: area.rent.studio },
    { label: '一房 1BR', value: area.rent.oneBr },
    { label: '兩房 2BR', value: area.rent.twoBr },
  ].filter((row) => row.value)

  return (
    <>
      <div className="border-b border-sand-200 bg-sand-100/60 py-12">
        <Container>
          <Link
            to={`/cities/${city.slug}`}
            className="text-sm text-camel-600 underline-offset-4 hover:underline"
          >
            ← {city.name}
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            {area.name}
          </h1>
          <p className="mt-1 text-ink-500">{area.nameEn}</p>
          <p className="text-flow mt-4 max-w-3xl text-lg text-ink-500">{area.summary}</p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-3xl">
          {rentRows.length > 0 && (
            <Section title="租金區間（年租，AED）">
              <div className="overflow-x-auto rounded-2xl border border-sand-200 bg-white">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {rentRows.map((row) => (
                      <tr key={row.label} className="border-b border-sand-100 last:border-0">
                        <td className="px-4 py-3 text-ink-700">{row.label}</td>
                        <td className="px-4 py-3 text-right font-medium text-ink-900">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-flow mt-2 text-xs text-ink-500">
                阿聯酋租金習慣以「年」為單位報價，付款次數（一次付清 / 分 2、4、12 期）會直接影響價格，
                分期越多通常總價越高。
              </p>
            </Section>
          )}

          <Section title="通勤">
            <ul className="space-y-2">
              {area.commute.map((item) => (
                <li key={item} className="text-flow flex gap-2 text-sm text-ink-700">
                  <span className="text-camel-500">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="生活機能">
            <ul className="space-y-2">
              {area.amenities.map((item) => (
                <li key={item} className="text-flow flex gap-2 text-sm text-ink-700">
                  <span className="text-camel-500">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="適合誰">
            <div className="flex flex-wrap gap-2">
              {area.suitedFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-sand-100 px-3 py-1.5 text-sm text-ink-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>

          <Section title="氛圍">
            <p className="text-flow text-ink-700">{area.vibe}</p>
          </Section>

          {area.observation && (
            <Section title="慈飛的實地觀察">
              <div className="text-flow rounded-2xl border-l-4 border-camel-500 bg-white p-5 text-ink-700">
                {area.observation}
              </div>
            </Section>
          )}
        </div>
      </Container>
    </>
  )
}
