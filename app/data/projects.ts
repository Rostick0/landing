export type ProjectType = 'web' | 'android'

export type ProjectLinkKind = 'web' | 'rustore' | 'googleplay'

export interface ProjectLink {
  label: string
  url: string
  kind: ProjectLinkKind
}

export interface Project {
  /** Matches the i18n key under `projects.<id>.*` for all display text. */
  id: string
  type: ProjectType
  stack: string[]
  links: ProjectLink[]
  icon: string
  screenshots: string[]
  /** Marks the flagship project referenced from the hero/stats area. */
  flagship?: boolean
}

export const projects: Project[] = [
  {
    id: 'my-financier-web',
    type: 'web',
    stack: ['Nuxt 3 (SSR)', 'Laravel API', 'PostgreSQL', 'Redis', 'OAuth', 'nginx'],
    links: [{ label: 'my-financier.ru', url: 'https://my-financier.ru/', kind: 'web' }],
    icon: '/images/projects/my-financier-web/icon.png',
    screenshots: [
      '/images/projects/my-financier-web/screenshot-1.png',
      '/images/projects/my-financier-web/screenshot-2.png',
      '/images/projects/my-financier-web/screenshot-3.png',
      '/images/projects/my-financier-web/screenshot-4.png',
    ],
    flagship: true
  },
  {
    id: 'my-financier-app',
    type: 'android',
    stack: ['Flutter', 'Riverpod', 'Drift', 'GoRouter', 'Offline-first'],
    links: [
      {
        label: 'RuStore',
        url: 'https://www.rustore.ru/catalog/app/com.myfinansist.my_finansist',
        kind: 'rustore'
      }
    ],
    icon: '/images/projects/my-financier-app/icon.png',
    screenshots: [
      '/images/projects/my-financier-app/screenshot-1.png',
      '/images/projects/my-financier-app/screenshot-2.png',
      '/images/projects/my-financier-app/screenshot-3.png'
    ],
    flagship: true
  },
  {
    id: 'glidespark',
    type: 'android',
    stack: ['Flutter', 'Custom game loop', 'Seeded procedural generation', 'Sync backend'],
    links: [
      {
        label: 'RuStore',
        url: 'https://www.rustore.ru/catalog/app/com.rostislav.glidespark',
        kind: 'rustore'
      }
    ],
    icon: '/images/projects/glidespark/icon.png',
    screenshots: [
      '/images/projects/glidespark/screenshot-1.png',
      '/images/projects/glidespark/screenshot-2.png',
      '/images/projects/glidespark/screenshot-3.png'
    ]
  },
  {
    id: 'sudoku',
    type: 'android',
    stack: ['Flutter', 'Offline mode'],
    links: [
      {
        label: 'RuStore',
        url: 'https://www.rustore.ru/catalog/app/com.rostislav.sudoku',
        kind: 'rustore'
      },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.rostislav.sudoku',
        kind: 'googleplay'
      }
    ],
    icon: '/images/projects/sudoku/icon.png',
    screenshots: [
      '/images/projects/sudoku/screenshot-1.png',
      '/images/projects/sudoku/screenshot-2.png',
      '/images/projects/sudoku/screenshot-3.png'
    ]
  },
  {
    id: 'merge-city',
    type: 'android',
    stack: ['Flutter'],
    links: [
      {
        label: 'RuStore',
        url: 'https://www.rustore.ru/catalog/app/com.rostislav.merge_city',
        kind: 'rustore'
      }
    ],
    icon: '/images/projects/merge-city/icon.png',
    screenshots: [
      '/images/projects/merge-city/screenshot-1.png',
      '/images/projects/merge-city/screenshot-2.png',
      '/images/projects/merge-city/screenshot-3.png'
    ]
  },
  {
    id: 'riddles-puzzles',
    type: 'android',
    stack: ['Flutter', 'JSON content pipeline', 'Rewarded ads'],
    links: [
      {
        label: 'RuStore',
        url: 'https://www.rustore.ru/catalog/app/com.rostislav.zagadki',
        kind: 'rustore'
      }
    ],
    icon: '/images/projects/riddles-puzzles/icon.png',
    screenshots: [
      '/images/projects/riddles-puzzles/screenshot-1.png',
      '/images/projects/riddles-puzzles/screenshot-2.png',
      '/images/projects/riddles-puzzles/screenshot-3.png'
    ]
  }
]
