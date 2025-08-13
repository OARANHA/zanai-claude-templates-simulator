'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Activity, 
  Zap, 
  MemoryStick, 
  Target,
  TrendingUp,
  Clock,
  Heart,
  Lightbulb,
  Search,
  Filter,
  Star,
  Plus,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  Database,
  Network,
  Cpu,
  BarChart3
} from 'lucide-react'

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

export function HippocampusMemory() {
  const [memories, setMemories] = useState<Memory[]>([
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
  ])

  const [emotionalContexts, setEmotionalContexts] = useState<EmotionalContext[]>([
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
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [newMemory, setNewMemory] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  // Simulate memory consolidation process
  useEffect(() => {
    const interval = setInterval(() => {
      setMemories(prev => prev.map(memory => {
        // Gradually strengthen frequently accessed memories
        const newStrength = Math.min(1, memory.strength + (memory.accessCount * 0.001))
        return {
          ...memory,
          strength: newStrength
        }
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || memory.type === selectedType
    
    return matchesSearch && matchesType
  })

  const getMemoryTypeColor = (type: string) => {
    switch (type) {
      case 'short-term': return 'bg-blue-100 text-blue-800'
      case 'long-term': return 'bg-green-100 text-green-800'
      case 'emotional': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEmotionalColor = (weight: number) => {
    if (weight > 0.5) return 'text-green-600'
    if (weight < -0.5) return 'text-red-600'
    return 'text-gray-600'
  }

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive': return '😊'
      case 'negative': return '😔'
      default: return '😐'
    }
  }

  const accessMemory = (memoryId: string) => {
    setMemories(prev => prev.map(memory => 
      memory.id === memoryId 
        ? { 
            ...memory, 
            accessCount: memory.accessCount + 1,
            lastAccessed: new Date().toISOString(),
            strength: Math.min(1, memory.strength + 0.1)
          }
        : memory
    ))
  }

  const createNewMemory = () => {
    if (!newMemory.trim()) return

    const newMemoryObj: Memory = {
      id: Math.random().toString(36).substr(2, 9),
      content: newMemory,
      type: 'short-term',
      emotionalWeight: 0,
      context: 'User input',
      tags: [],
      timestamp: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      accessCount: 1,
      strength: 0.1
    }

    setMemories(prev => [newMemoryObj, ...prev])
    setNewMemory('')
    setIsCreating(false)
  }

  const consolidateMemory = (memoryId: string) => {
    setMemories(prev => prev.map(memory => 
      memory.id === memoryId 
        ? { 
            ...memory, 
            type: 'long-term' as const,
            strength: Math.min(1, memory.strength + 0.3)
          }
        : memory
    ))
  }

  const getMemoryStats = () => {
    const total = memories.length
    const shortTerm = memories.filter(m => m.type === 'short-term').length
    const longTerm = memories.filter(m => m.type === 'long-term').length
    const emotional = memories.filter(m => m.type === 'emotional').length
    const avgStrength = memories.reduce((sum, m) => sum + m.strength, 0) / total

    return { total, shortTerm, longTerm, emotional, avgStrength }
  }

  const stats = getMemoryStats()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Sistema de Memória Hipocampo
          </CardTitle>
          <CardDescription>
            Sistema avançado de memória com contexto emocional e aprendizado contínuo
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Memory Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Memórias</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{stats.shortTerm}</p>
            <p className="text-sm text-slate-600">Curto Prazo</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MemoryStick className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{stats.longTerm}</p>
            <p className="text-sm text-slate-600">Longo Prazo</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold">{stats.emotional}</p>
            <p className="text-sm text-slate-600">Emocionais</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold">{(stats.avgStrength * 100).toFixed(0)}%</p>
            <p className="text-sm text-slate-600">Força Média</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="memories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="memories">Memórias</TabsTrigger>
          <TabsTrigger value="emotional">Contexto Emocional</TabsTrigger>
          <TabsTrigger value="learning">Aprendizado</TabsTrigger>
        </TabsList>

        <TabsContent value="memories" className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar memórias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Todos Tipos</option>
              <option value="short-term">Curto Prazo</option>
              <option value="long-term">Longo Prazo</option>
              <option value="emotional">Emocional</option>
            </select>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Memória
            </Button>
          </div>

          {isCreating && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <Textarea
                  placeholder="Digite o conteúdo da nova memória..."
                  value={newMemory}
                  onChange={(e) => setNewMemory(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={createNewMemory} disabled={!newMemory.trim()}>
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {filteredMemories.map((memory) => (
              <Card key={memory.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className={getMemoryTypeColor(memory.type)}>
                        {memory.type === 'short-term' ? 'Curto Prazo' :
                         memory.type === 'long-term' ? 'Longo Prazo' : 'Emocional'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Heart className={`w-4 h-4 ${getEmotionalColor(memory.emotionalWeight)}`} />
                        <span className="text-sm">{memory.emotionalWeight.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => accessMemory(memory.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {memory.type === 'short-term' && (
                        <Button size="sm" variant="outline" onClick={() => consolidateMemory(memory.id)}>
                          <MemoryStick className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm mb-3">{memory.content}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {memory.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Força:</span>
                      <div className="flex items-center gap-2">
                        <Progress value={memory.strength * 100} className="h-2 flex-1" />
                        <span className="text-xs">{(memory.strength * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Acessos:</span>
                      <div className="font-mono">{memory.accessCount}</div>
                    </div>
                    <div>
                      <span className="font-medium">Contexto:</span>
                      <div className="text-slate-600">{memory.context}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 mt-2">
                    Criado: {new Date(memory.timestamp).toLocaleString('pt-BR')}
                    {memory.lastAccessed !== memory.timestamp && (
                      <> • Último acesso: {new Date(memory.lastAccessed).toLocaleString('pt-BR')}</>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emotional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Contexto Emocional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emotionalContexts.map((context, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="text-2xl">{getMoodIcon(context.mood)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          className={
                            context.mood === 'positive' ? 'bg-green-600' :
                            context.mood === 'negative' ? 'bg-red-600' : 'bg-gray-600'
                          }
                        >
                          {context.mood === 'positive' ? 'Positivo' :
                           context.mood === 'negative' ? 'Negativo' : 'Neutro'}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Intensidade:</span>
                          <Progress value={context.intensity * 100} className="h-2 w-20" />
                          <span className="text-sm">{(context.intensity * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{context.context}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(context.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Processo de Aprendizado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Consolidação de Memórias</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Reconhecimento de Padrões</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Contexto Emocional</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Recuperação Contextual</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Insights Gerados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Padrão identificado:</strong> Usuários preferem templates Python para projetos de data science
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Oportunidade:</strong> Alto interesse em soluções de API Pix
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Problema recorrente:</strong> Configuração de timeout em conexões de banco de dados
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Tendência:</strong> Aumento na demanda por integrações CLI + Web
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Atividade do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">247</div>
                  <div className="text-sm text-slate-600">Memórias/Hora</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-slate-600">Taxa de Aprendizado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-slate-600">Padrões Identificados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">94%</div>
                  <div className="text-sm text-slate-600">Precisão de Recall</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}