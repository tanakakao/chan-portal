import type { LucideIcon } from 'lucide-react'

export type ApplicationDefinition = {
  id: string
  projectName: string
  displayName: string
  description: string
  keywords: string[]
  url: string
  icon: LucideIcon
  accent: string
}
