/** 落地路線圖的時間軸分段 */
export type Phase = 'before' | 'firstMonth' | 'settled' | 'exit'

export const PHASE_ORDER: Phase[] = ['before', 'firstMonth', 'settled', 'exit']

export const PHASE_LABEL: Record<Phase, string> = {
  before: '出發前',
  firstMonth: '抵達首月',
  settled: '安頓之後',
  exit: '離職離境',
}

export const PHASE_DESC: Record<Phase, string> = {
  before: '人還在台灣時就要開始準備的事',
  firstMonth: '落地後 30 天內必須完成的手續',
  settled: '身分穩定後再處理，但拖久會很麻煩',
  exit: '離開阿聯酋前一定要結清的事',
}

export interface Step {
  title: string
  detail?: string
  /** 特別提醒，會用醒目色標出 */
  note?: string
}

export interface CostItem {
  item: string
  amount: string
  note?: string
}

export interface LinkItem {
  label: string
  url: string
}

export interface Topic {
  slug: string
  title: string
  phase: Phase
  /** 一句話結論，卡片和頁首都會用到 */
  summary: string
  /** draft 代表內容尚未完成，會標示「撰寫中」 */
  status: 'draft' | 'ready'
  prerequisites?: string[]
  steps: Step[]
  costs?: CostItem[]
  pitfalls?: string[]
  /** 延伸影片，會在頁面最後獨立成一區 */
  videos?: LinkItem[]
  links?: LinkItem[]
  /** 最後查證日期 YYYY-MM-DD */
  updated: string
}

export interface Area {
  slug: string
  name: string
  nameEn: string
  summary: string
  rent: { studio?: string; oneBr?: string; twoBr?: string }
  commute: string[]
  amenities: string[]
  suitedFor: string[]
  vibe: string
  /** 慈飛的實地觀察，本站差異化重點 */
  observation?: string
}

export interface City {
  slug: string
  name: string
  nameEn: string
  summary: string
  highlights: string[]
  areas: Area[]
  updated: string
}
