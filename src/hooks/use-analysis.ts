'use client'

import { useState, useEffect } from 'react'

interface ProjectAnalysis {
  name: string
  architecture: string
  memory: string
  creation: string
  ecosystem: string
  maturity: string
  features: string[]
  advantages: string[]
  disadvantages: string[]
  marketPotential: string
  implementationComplexity: string
}

interface ComparisonData {
  claudeCodeTemplates: ProjectAnalysis
  zanai: ProjectAnalysis
  synergies: string[]
  opportunities: string[]
  recommendations: string[]
}

export function useAnalysis() {
  const [data, setData] = useState<ComparisonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analysis')
        if (!response.ok) {
          throw new Error('Failed to fetch analysis data')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}