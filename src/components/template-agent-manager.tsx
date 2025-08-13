'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Bot, 
  Code, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Zap,
  Database,
  Play,
  Pause,
  Settings,
  Copy,
  Eye,
  CheckCircle,
  AlertCircle,
  Layers,
  FileText,
  Globe,
  Server,
  BarChart3
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  template: string
  status: 'active' | 'inactive' | 'deploying' | 'error'
  createdAt: string
  lastUsed: string
  capabilities: string[]
  performance: {
    successRate: number
    avgResponseTime: number
    totalRequests: number
  }
}

interface Template {
  id: string
  name: string
  description: string
  framework: string
  type: string
  language: string
  popularity: number
  downloads: number
  createdAt: string
  lastUpdated: string
  tags: string[]
  author: string
}

export function TemplateAgentManager() {
  const [activeTab, setActiveTab] = useState('agents')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFramework, setSelectedFramework] = useState('all')
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false)
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false)

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Data Analyst',
      description: 'Agente especializado em análise de dados e visualização',
      template: 'python-data-science',
      status: 'active',
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20',
      capabilities: ['Data Processing', 'Visualization', 'ML Analysis', 'Report Generation'],
      performance: {
        successRate: 98.5,
        avgResponseTime: 1.2,
        totalRequests: 1247
      }
    },
    {
      id: '2',
      name: 'API Generator',
      description: 'Gera APIs RESTful automaticamente a partir de especificações',
      template: 'nodejs-api',
      status: 'deploying',
      createdAt: '2024-01-10',
      lastUsed: '2024-01-19',
      capabilities: ['API Generation', 'Documentation', 'Testing', 'Deployment'],
      performance: {
        successRate: 95.2,
        avgResponseTime: 0.8,
        totalRequests: 892
      }
    },
    {
      id: '3',
      name: 'Content Creator',
      description: 'Cria conteúdo de marketing e social media',
      template: 'content-creation',
      status: 'inactive',
      createdAt: '2024-01-05',
      lastUsed: '2024-01-18',
      capabilities: ['Content Writing', 'SEO Optimization', 'Social Media', 'Image Generation'],
      performance: {
        successRate: 87.3,
        avgResponseTime: 2.1,
        totalRequests: 567
      }
    }
  ])

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Python Data Science',
      description: 'Template completo para projetos de data science com Python',
      framework: 'python',
      type: 'data-science',
      language: 'Python',
      popularity: 95,
      downloads: 15420,
      createdAt: '2024-01-01',
      lastUpdated: '2024-01-15',
      tags: ['python', 'data-science', 'ml', 'pandas', 'numpy'],
      author: 'Zanai Team'
    },
    {
      id: '2',
      name: 'Node.js API',
      description: 'Template para criação de APIs RESTful com Node.js',
      framework: 'nodejs',
      type: 'api',
      language: 'JavaScript',
      popularity: 88,
      downloads: 12350,
      createdAt: '2024-01-02',
      lastUpdated: '2024-01-14',
      tags: ['nodejs', 'api', 'express', 'rest', 'mongodb'],
      author: 'Zanai Team'
    },
    {
      id: '3',
      name: 'React Web App',
      description: 'Template para aplicações web modernas com React',
      framework: 'react',
      type: 'web-app',
      language: 'TypeScript',
      popularity: 92,
      downloads: 18760,
      createdAt: '2024-01-03',
      lastUpdated: '2024-01-16',
      tags: ['react', 'typescript', 'tailwind', 'nextjs', 'web'],
      author: 'Zanai Team'
    },
    {
      id: '4',
      name: 'Content Creator',
      description: 'Template para criação de conteúdo e marketing',
      framework: 'generic',
      type: 'content',
      language: 'Multi',
      popularity: 76,
      downloads: 8430,
      createdAt: '2024-01-04',
      lastUpdated: '2024-01-12',
      tags: ['content', 'marketing', 'ai', 'writing', 'social-media'],
      author: 'Community'
    }
  ])

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTemplates = templates.filter(template =>
    (template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     template.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFramework === 'all' || template.framework === selectedFramework)
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Ativo</Badge>
      case 'inactive':
        return <Badge variant="secondary">Inativo</Badge>
      case 'deploying':
        return <Badge className="bg-blue-600">Deploying</Badge>
      case 'error':
        return <Badge className="bg-red-600">Erro</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'python':
        return <Database className="w-4 h-4" />
      case 'nodejs':
        return <Server className="w-4 h-4" />
      case 'react':
        return <Globe className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Gerenciamento de Templates e Agentes
          </CardTitle>
          <CardDescription>
            Crie, gerencie e deploy templates e agentes especializados
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar agentes ou templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFramework} onValueChange={setSelectedFramework}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Frameworks</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="nodejs">Node.js</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="generic">Genérico</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="agents">Agentes</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Agentes Disponíveis</h3>
            <Dialog open={isCreateAgentOpen} onOpenChange={setIsCreateAgentOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Agente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Agente</DialogTitle>
                  <DialogDescription>
                    Configure um novo agente especializado
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nome do Agente</label>
                    <Input placeholder="Ex: Analista de Dados" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Descrição</label>
                    <Textarea placeholder="Descreva as funcionalidades do agente" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Template</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Criar Agente</Button>
                    <Button variant="outline" onClick={() => setIsCreateAgentOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bot className="w-5 h-5 text-blue-600" />
                      {agent.name}
                    </CardTitle>
                    {getStatusBadge(agent.status)}
                  </div>
                  <CardDescription>{agent.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm font-medium">Template:</span>
                    <div className="text-sm text-slate-600">{agent.template}</div>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Capacidades:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {agent.capabilities.map((capability, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Sucesso:</span>
                      <div className="text-green-600">{agent.performance.successRate}%</div>
                    </div>
                    <div>
                      <span className="font-medium">Resposta:</span>
                      <div className="text-blue-600">{agent.performance.avgResponseTime}s</div>
                    </div>
                    <div>
                      <span className="font-medium">Requests:</span>
                      <div className="text-purple-600">{agent.performance.totalRequests}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Executar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Templates Disponíveis</h3>
            <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Template</DialogTitle>
                  <DialogDescription>
                    Crie um novo template para ser usado por agentes
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nome do Template</label>
                    <Input placeholder="Ex: Python Web Scraper" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Descrição</label>
                    <Textarea placeholder="Descreva o propósito do template" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Framework</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Framework" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="nodejs">Node.js</SelectItem>
                          <SelectItem value="react">React</SelectItem>
                          <SelectItem value="generic">Genérico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tipo</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="api">API</SelectItem>
                          <SelectItem value="web-app">Web App</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="content">Content</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Linguagem</label>
                    <Input placeholder="Ex: Python, JavaScript, TypeScript" />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Criar Template</Button>
                    <Button variant="outline" onClick={() => setIsCreateTemplateOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getFrameworkIcon(template.framework)}
                      {template.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{template.popularity}</span>
                    </div>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Downloads:</span>
                      <div className="text-blue-600">{template.downloads.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="font-medium">Autor:</span>
                      <div className="text-slate-600">{template.author}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Usar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estatísticas do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{agents.length}</div>
              <div className="text-sm text-slate-600">Agentes Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{templates.length}</div>
              <div className="text-sm text-slate-600">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {agents.reduce((sum, agent) => sum + agent.performance.totalRequests, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Total Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {templates.reduce((sum, template) => sum + template.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Downloads</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}