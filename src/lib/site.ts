export const SITE = {
  name: '慈飛。蹲點阿拉伯',
  subtitle: '阿聯酋工作生活指南',
  tagline: '要來阿聯酋工作，該辦什麼、花多少、住哪裡，一次講清楚。',
  repo: 'cameljourney-uae-guide',
}

/**
 * 社群連結。網址留空的項目不會顯示，填上去就會自動出現在頁尾。
 */
export const SOCIAL: { label: string; url: string }[] = [
  { label: 'YouTube', url: 'https://www.youtube.com/@htzuhui' },
  { label: 'Instagram', url: 'https://www.instagram.com/cameljourney/' },
  { label: 'Facebook', url: '' },
]

export const NAV = [
  { to: '/roadmap', label: '落地路線圖' },
  { to: '/cost', label: '生活成本試算' },
  { to: '/cities', label: '城市與區域' },
  { to: '/culture', label: '文化與法律' },
  { to: '/faq', label: '常見問題' },
  { to: '/resources', label: '資源連結' },
]
