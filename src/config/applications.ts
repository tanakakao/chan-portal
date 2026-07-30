import { BrainCircuit, GitFork, Microscope } from 'lucide-react'
import type { ApplicationDefinition } from '../types/application'

const DEFAULT_URLS = {
  bochan: 'http://127.0.0.1:5173',
  malchan: 'http://127.0.0.1:5174',
  cauchan: 'http://127.0.0.1:5175',
} as const

export const applications: ApplicationDefinition[] = [
  {
    id: 'bayesian-optimization',
    projectName: 'bochan',
    displayName: 'ベイズ最適化',
    description: '実験条件の探索、候補提案、能動学習を行います。',
    keywords: ['条件探索', '多目的最適化', '能動学習'],
    url: import.meta.env.VITE_BOCHAN_URL ?? DEFAULT_URLS.bochan,
    icon: Microscope,
    accent: 'blue',
  },
  {
    id: 'machine-learning',
    projectName: 'malchan',
    displayName: '機械学習',
    description: '予測モデルの作成、モデル比較、説明、逆解析を行います。',
    keywords: ['モデル作成', '可視化・説明', '逆解析'],
    url: import.meta.env.VITE_MALCHAN_URL ?? DEFAULT_URLS.malchan,
    icon: BrainCircuit,
    accent: 'green',
  },
  {
    id: 'causal-analysis',
    projectName: 'cauchan',
    displayName: '因果分析',
    description: '因果構造の探索・編集と、因果効果の推定を行います。',
    keywords: ['因果探索', '因果グラフ', '効果推定'],
    url: import.meta.env.VITE_CAUCHAN_URL ?? DEFAULT_URLS.cauchan,
    icon: GitFork,
    accent: 'violet',
  },
]
