import {
  BarChart3,
  Bot,
  Circle,
  Globe,
  Inbox,
  LineChart,
  MessageSquare,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'

/**
 * Central icon registry. Data files reference icons by string name;
 * importing named icons here keeps the bundle tree-shakeable
 * (avoid `import * as Icons from 'lucide-react'`).
 */
const iconMap = {
  BarChart3,
  Bot,
  Globe,
  Inbox,
  LineChart,
  MessageSquare,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
}

/** Resolve an icon by name with a safe fallback. */
export function getIcon(name) {
  return iconMap[name] ?? Circle
}
