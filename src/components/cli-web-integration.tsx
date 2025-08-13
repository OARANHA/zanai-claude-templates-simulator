'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { 
  Terminal, 
  Globe, 
  RefreshCw, 
  Settings, 
  Play, 
  Pause,
  CheckCircle,
  AlertCircle,
  Zap,
  Database,
  Code,
  Users,
  BarChart3,
  Shield,
  Download,
  Upload
} from 'lucide-react'

interface CLICommand {
  id: string
  command: string
  description: string
  status: 'idle' | 'running' | 'completed' | 'error'
  output?: string
  webSync: boolean
}

interface WebAction {
  id: string
  name: string
  description: string
  cliCommand: string
  status: 'idle' | 'running' | 'completed' | 'error'
  progress: number
}

export function CLIWebIntegration() {
  const [cliCommands, setCliCommands] = useState<CLICommand[]>([
    {
      id: '1',
      command: 'zanai agent create --name "data-analyst" --template python',
      description: 'Criar agente analista de dados',
      status: 'completed',
      output: 'Agente "data-analyst" criado com sucesso\nID: agent_12345\nTemplate: Python 3.9\nStatus: Ativo',
      webSync: true
    },
    {
      id: '2',
      command: 'zanai template generate --framework nextjs --type api',
      description: 'Gerar template API Next.js',
      status: 'running',
      webSync: true
    },
    {
      id: '3',
      command: 'zanai config set --key theme --value dark',
      description: 'Configurar tema dark',
      status: 'idle',
      webSync: false
    }
  ])

  const [webActions, setWebActions] = useState<WebAction[]>([
    {
      id: '1',
      name: 'Deploy Agent',
      description: 'Fazer deploy de agente para produção',
      cliCommand: 'zanai deploy --agent data-analyst --env production',
      status: 'completed',
      progress: 100
    },
    {
      id: '2',
      name: 'Monitor Performance',
      description: 'Monitorar performance do sistema',
      cliCommand: 'zanai monitor --metrics cpu,memory,network',
      status: 'running',
      progress: 75
    },
    {
      id: '3',
      name: 'Export Configuration',
      description: 'Exportar configuração atual',
      cliCommand: 'zanai config export --format yaml',
      status: 'idle',
      progress: 0
    }
  ])

  const [activeTab, setActiveTab] = useState('cli')
  const [customCommand, setCustomCommand] = useState('')

  const executeCommand = (commandId: string) => {
    setCliCommands(prev => prev.map(cmd => 
      cmd.id === commandId 
        ? { ...cmd, status: 'running' as const }
        : cmd
    ))

    // Simulate command execution
    setTimeout(() => {
      setCliCommands(prev => prev.map(cmd => 
        cmd.id === commandId 
          ? { 
              ...cmd, 
              status: 'completed' as const,
              output: `Comando executado com sucesso!\n${cmd.command}\nStatus: Concluído\nTimestamp: ${new Date().toISOString()}`
            }
          : cmd
      ))
    }, 2000)
  }

  const executeWebAction = (actionId: string) => {
    setWebActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: 'running' as const }
        : action
    ))

    // Simulate progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setWebActions(prev => prev.map(action => 
        action.id === actionId 
          ? { ...action, progress }
          : action
      ))

      if (progress >= 100) {
        clearInterval(interval)
        setWebActions(prev => prev.map(action => 
          action.id === actionId 
            ? { ...action, status: 'completed' as const }
            : action
        ))
      }
    }, 200)
  }

  const syncWithWeb = (commandId: string) => {
    setCliCommands(prev => prev.map(cmd => 
      cmd.id === commandId 
        ? { ...cmd, webSync: !cmd.webSync }
        : cmd
    ))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'running':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Concluído</Badge>
      case 'running':
        return <Badge className="bg-blue-600">Executando</Badge>
      case 'error':
        return <Badge className="bg-red-600">Erro</Badge>
      default:
        return <Badge variant="outline">Aguardando</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Integração CLI + Web Interface
          </CardTitle>
          <CardDescription>
            Demonstração da integração perfeita entre linha de comando e interface web
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cli">CLI Commands</TabsTrigger>
          <TabsTrigger value="web">Web Actions</TabsTrigger>
          <TabsTrigger value="sync">Sincronização</TabsTrigger>
        </TabsList>

        <TabsContent value="cli" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Comandos CLI
              </CardTitle>
              <CardDescription>
                Execute comandos CLI e veja os resultados em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite um comando personalizado..."
                  value={customCommand}
                  onChange={(e) => setCustomCommand(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Play className="w-4 h-4 mr-2" />
                  Executar
                </Button>
              </div>

              <div className="space-y-3">
                {cliCommands.map((command) => (
                  <div key={command.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(command.status)}
                        <div>
                          <div className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {command.command}
                          </div>
                          <div className="text-sm text-slate-600 mt-1">
                            {command.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(command.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => syncWithWeb(command.id)}
                        >
                          <RefreshCw className={`w-4 h-4 ${command.webSync ? 'text-green-500' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => executeCommand(command.id)}
                          disabled={command.status === 'running'}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {command.output && (
                      <div className="bg-slate-900 text-green-400 p-3 rounded text-sm font-mono">
                        <pre>{command.output}</pre>
                      </div>
                    )}

                    {command.webSync && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Globe className="w-4 h-4" />
                        Sincronizado com interface web
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="web" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Ações Web
              </CardTitle>
              <CardDescription>
                Ações da interface web que geram comandos CLI automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {webActions.map((action) => (
                  <Card key={action.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{action.name}</CardTitle>
                        {getStatusBadge(action.status)}
                      </div>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <span className="font-medium">CLI Command:</span>
                        <div className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded mt-1">
                          {action.cliCommand}
                        </div>
                      </div>

                      {action.status === 'running' && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progresso</span>
                            <span>{action.progress}%</span>
                          </div>
                          <Progress value={action.progress} className="h-2" />
                        </div>
                      )}

                      <Button
                        className="w-full"
                        onClick={() => executeWebAction(action.id)}
                        disabled={action.status === 'running'}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Executar Ação
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Status de Sincronização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CLI ↔ Web</span>
                    <Badge className="bg-green-600">Ativo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Configurações</span>
                    <Badge className="bg-green-600">Sincronizadas</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Agentes</span>
                    <Badge className="bg-blue-600">Sincronizando</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Templates</span>
                    <Badge className="bg-green-600">Sincronizados</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Última sincronização</h4>
                  <p className="text-sm text-slate-600">
                    {new Date().toLocaleString('pt-BR')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configurações de Integração
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-sync</span>
                    <Button variant="outline" size="sm">Ativar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Intervalo de sync</span>
                    <Button variant="outline" size="sm">5s</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notificações</span>
                    <Button variant="outline" size="sm">Ativar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Log detalhado</span>
                    <Button variant="outline" size="sm">Desativar</Button>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Forçar Sincronização
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Métricas de Integração
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-slate-600">Comandos CLI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">892</div>
                  <div className="text-sm text-slate-600">Ações Web</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">99.8%</div>
                  <div className="text-sm text-slate-600">Taxa de Sinc</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">12ms</div>
                  <div className="text-sm text-slate-600">Latência</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}