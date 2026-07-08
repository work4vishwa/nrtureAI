export const SCREEN_ORDER = ['reviews', 'benchmarking', 'reporting']

export const SCREEN_DATA = {
  reviews: {
    id: 'reviews',
    label: 'Reviews',
    title: 'Review Inbox',
    subtitle: '1,295 total reviews · Elara-ready response queue',
    image: '/screenshots/reviews.png',
    stats: [
      { label: 'Unread', value: '412' },
      { label: 'Avg rating', value: '3.7/5' },
      { label: 'Elara drafts', value: '286' },
    ],
  },
  benchmarking: {
    id: 'benchmarking',
    label: 'Benchmarking',
    title: 'Peer Benchmarking',
    subtitle: 'Snapshot across outlets and timeline trends',
    image: '/screenshots/benchmarking.png',
    stats: [
      { label: 'Total reviews', value: '5' },
      { label: 'Total outlets', value: '3,609' },
      { label: 'Total schedules', value: '331' },
    ],
  },
  reporting: {
    id: 'reporting',
    label: 'Reporting',
    title: 'Quarterly Reports',
    subtitle: '2025 · Q1 reports generated for all tracked outlets',
    image: '/screenshots/reporting.png',
    stats: [
      { label: 'Results', value: '5' },
      { label: 'Year', value: '2025' },
      { label: 'Quarter', value: 'Q1' },
    ],
  },
}
