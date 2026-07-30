import type { City, Phase, Topic } from './types'
import { PHASE_ORDER } from './types'

/**
 * 內容依語言分目錄存放（src/data/zh、src/data/en）。
 * 這裡用一次 glob 掃進所有語言，之後要加英文只要補檔案，程式不用改。
 */
export type Locale = 'zh' | 'en'

export const DEFAULT_LOCALE: Locale = 'zh'

const topicModules = import.meta.glob<{ default: Topic }>('../data/*/roadmap/*.json', {
  eager: true,
})

const cityModules = import.meta.glob<{ default: City }>('../data/*/cities/*.json', {
  eager: true,
})

function localeOf(path: string): Locale {
  return path.split('/data/')[1].split('/')[0] as Locale
}

function collect<T>(modules: Record<string, { default: T }>, locale: Locale): T[] {
  return Object.entries(modules)
    .filter(([path]) => localeOf(path) === locale)
    .map(([, mod]) => mod.default)
}

export function getTopics(locale: Locale = DEFAULT_LOCALE): Topic[] {
  const topics = collect<Topic>(topicModules, locale)
  return topics.sort(
    (a, b) => PHASE_ORDER.indexOf(a.phase) - PHASE_ORDER.indexOf(b.phase),
  )
}

export function getTopic(slug: string, locale: Locale = DEFAULT_LOCALE): Topic | undefined {
  return getTopics(locale).find((t) => t.slug === slug)
}

export function getTopicsByPhase(locale: Locale = DEFAULT_LOCALE): Record<Phase, Topic[]> {
  const grouped = { before: [], firstMonth: [], settled: [], exit: [] } as Record<Phase, Topic[]>
  for (const topic of getTopics(locale)) grouped[topic.phase].push(topic)
  return grouped
}

export function getCities(locale: Locale = DEFAULT_LOCALE): City[] {
  return collect<City>(cityModules, locale)
}

export function getCity(slug: string, locale: Locale = DEFAULT_LOCALE): City | undefined {
  return getCities(locale).find((c) => c.slug === slug)
}
