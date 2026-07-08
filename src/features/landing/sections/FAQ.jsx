import { useMemo } from 'react'
import { Section } from '@/components/ui/Section'
import { Accordion } from '@/components/ui/Accordion'
import faqs from '@/data/faqs.json'

export function FAQ() {
  const grouped = useMemo(() => {
    const map = new Map()
    for (const faq of faqs) {
      const list = map.get(faq.category) ?? []
      list.push(faq)
      map.set(faq.category, list)
    }
    return [...map.entries()]
  }, [])

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Frequently asked questions"
      description="Everything you need to know about Nrture.ai. Can't find an answer? Reach out to our team."
    >
      <div className="mx-auto max-w-3xl space-y-10">
        {grouped.map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              {category}
            </h3>
            <Accordion items={items} allowMultiple />
          </div>
        ))}
      </div>
    </Section>
  )
}
