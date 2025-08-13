import { NextRequest, NextResponse } from 'next/server'

interface Memory {
  id: string
  content: string
  type: 'short-term' | 'long-term' | 'emotional'
  emotionalWeight: number
  context: string
  tags: string[]
  timestamp: string
  lastAccessed: string
  accessCount: number
  strength: number
}

interface EmotionalContext {
  mood: 'positive' | 'neutral' | 'negative'
  intensity: number
  context: string
  timestamp: string
}

// Mock database
let memories: Memory[] = [
  {
    id: '1',
    content: 'Usuário preferiu templates Python para análise de dados',
    type: 'long-term',
    emotionalWeight: 0.8,
    context: 'Análise de projeto',
    tags: ['python', 'data-science', 'preferência'],
    timestamp: '2024-01-15T10:30:00Z',
    lastAccessed: '2024-01-20T14:20:00Z',
    accessCount: 15,
    strength: 0.9
  },
  {
    id: '2',
    content: 'Erro na configuração do banco de dados - resolvido com timeout aumentado',
    type: 'short-term',
    emotionalWeight: -0.6,
    context: 'Debug session',
    tags: ['erro', 'banco-de-dados', 'timeout'],
    timestamp: '2024-01-19T16:45:00Z',
    lastAccessed: '2024-01-19T16:45:00Z',
    accessCount: 3,
    strength: 0.4
  },
  {
    id: '3',
    content: 'Cliente demonstrou interesse em soluções de API Pix',
    type: 'emotional',
    emotionalWeight: 0.9,
    context: 'Reunião comercial',
    tags: ['pix', 'api', 'cliente', 'oportunidade'],
    timestamp: '2024-01-18T09:15:00Z',
    lastAccessed: '2024-01-20T11:30:00Z',
    accessCount: 8,
    strength: 0.7
  }
]

let emotionalContexts: EmotionalContext[] = [
  {
    mood: 'positive',
    intensity: 0.8,
    context: 'Sucesso na implementação do novo template',
    timestamp: '2024-01-20T14:30:00Z'
  },
  {
    mood: 'negative',
    intensity: 0.6,
    context: 'Frustração com erro de configuração',
    timestamp: '2024-01-19T16:45:00Z'
  },
  {
    mood: 'positive',
    intensity: 0.9,
    context: 'Oportunidade comercial identificada',
    timestamp: '2024-01-18T09:15:00Z'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  let filteredMemories = memories

  if (type) {
    filteredMemories = filteredMemories.filter(m => m.type === type)
  }

  if (search) {
    filteredMemories = filteredMemories.filter(m =>
      m.content.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )
  }

  // Simulate memory strength decay and consolidation
  memories = memories.map(memory => {
    const timeSinceAccess = Date.now() - new Date(memory.lastAccessed).getTime()
    const decayRate = Math.max(0, 1 - timeSinceAccess / (30 * 24 * 60 * 60 * 1000)) // 30 days
    const newStrength = Math.max(0.1, memory.strength * decayRate)
    
    return {
      ...memory,
      strength: newStrength
    }
  })

  return NextResponse.json({
    memories: filteredMemories,
    emotionalContexts,
    stats: {
      total: memories.length,
      shortTerm: memories.filter(m => m.type === 'short-term').length,
      longTerm: memories.filter(m => m.type === 'long-term').length,
      emotional: memories.filter(m => m.type === 'emotional').length,
      avgStrength: memories.reduce((sum, m) => sum + m.strength, 0) / memories.length
    },
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case 'create':
        const newMemory: Memory = {
          id: Math.random().toString(36).substr(2, 9),
          content: data.content,
          type: data.type || 'short-term',
          emotionalWeight: data.emotionalWeight || 0,
          context: data.context || 'User input',
          tags: data.tags || [],
          timestamp: new Date().toISOString(),
          lastAccessed: new Date().toISOString(),
          accessCount: 1,
          strength: 0.1
        }

        memories.unshift(newMemory)
        return NextResponse.json(newMemory, { status: 201 })

      case 'access':
        const memoryId = data.id
        const accessedMemory = memories.find(m => m.id === memoryId)
        
        if (accessedMemory) {
          accessedMemory.accessCount += 1
          accessedMemory.lastAccessed = new Date().toISOString()
          accessedMemory.strength = Math.min(1, accessedMemory.strength + 0.1)
          return NextResponse.json(accessedMemory)
        }
        
        return NextResponse.json({ error: 'Memory not found' }, { status: 404 })

      case 'consolidate':
        const consolidateId = data.id
        const memoryToConsolidate = memories.find(m => m.id === consolidateId)
        
        if (memoryToConsolidate) {
          memoryToConsolidate.type = 'long-term'
          memoryToConsolidate.strength = Math.min(1, memoryToConsolidate.strength + 0.3)
          return NextResponse.json(memoryToConsolidate)
        }
        
        return NextResponse.json({ error: 'Memory not found' }, { status: 404 })

      case 'add_emotional_context':
        const newEmotionalContext: EmotionalContext = {
          mood: data.mood,
          intensity: data.intensity,
          context: data.context,
          timestamp: new Date().toISOString()
        }

        emotionalContexts.unshift(newEmotionalContext)
        return NextResponse.json(newEmotionalContext, { status: 201 })

      case 'search_patterns':
        const searchTerm = data.query.toLowerCase()
        const relevantMemories = memories.filter(m =>
          m.content.toLowerCase().includes(searchTerm) ||
          m.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        )

        // Generate insights based on patterns
        const insights = []
        
        if (relevantMemories.length > 2) {
          const pythonMentions = relevantMemories.filter(m => 
            m.content.toLowerCase().includes('python') || 
            m.tags.includes('python')
          )
          
          if (pythonMentions.length > 0) {
            insights.push({
              type: 'pattern',
              content: 'Padrão identificado: Preferência por Python em projetos de análise de dados',
              confidence: pythonMentions.length / relevantMemories.length
            })
          }

          const emotionalMemories = relevantMemories.filter(m => m.type === 'emotional')
          if (emotionalMemories.length > 0) {
            const avgEmotionalWeight = emotionalMemories.reduce((sum, m) => sum + Math.abs(m.emotionalWeight), 0) / emotionalMemories.length
            if (avgEmotionalWeight > 0.7) {
              insights.push({
                type: 'insight',
                content: 'Alto envolvimento emocional detectado nos temas pesquisados',
                confidence: avgEmotionalWeight
              })
            }
          }
        }

        return NextResponse.json({
          memories: relevantMemories,
          insights,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 400 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const memoryIndex = memories.findIndex(m => m.id === id)
      if (memoryIndex !== -1) {
        memories.splice(memoryIndex, 1)
        return NextResponse.json({ message: 'Memory deleted successfully' })
      }
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 })
    }

    return NextResponse.json({ error: 'Memory ID required' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete memory' },
      { status: 400 }
    )
  }
}