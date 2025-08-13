'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useAnalysis } from '@/hooks/use-analysis'
import { 
  Brain, 
  Cpu, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Rocket,
  Lightbulb,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  ArrowRight,
  Merge,
  Sparkles
} from 'lucide-react'

export function ComparisonAnalysis() {
  const { data, loading, error } = useAnalysis()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">Erro ao carregar análise: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const getMaturityScore = (maturity: string) => {
    switch (maturity) {
      case 'Alta - produção estável': return 90
      case 'Em desenvolvimento': return 40
      default: return 50
    }
  }

  const getComplexityScore = (complexity: string) => {
    switch (complexity) {
      case 'Médio - bem documentado': return 60
      case 'Alto - tecnologia nova': return 85
      default: return 50
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Análise Comparativa Profunda
          </CardTitle>
          <CardDescription>
            Comparação detalhada entre Claude Code Templates e Zanai
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="synergies">Sinergias</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Claude Code Templates */}
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    {data.claudeCodeTemplates.name}
                  </CardTitle>
                  <Badge className="bg-blue-600">Estabelecido</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Arquitetura:</span>
                    <p className="text-slate-600">{data.claudeCodeTemplates.architecture}</p>
                  </div>
                  <div>
                    <span className="font-medium">Memória:</span>
                    <p className="text-slate-600">{data.claudeCodeTemplates.memory}</p>
                  </div>
                  <div>
                    <span className="font-medium">Criação:</span>
                    <p className="text-slate-600">{data.claudeCodeTemplates.creation}</p>
                  </div>
                  <div>
                    <span className="font-medium">Ecossistema:</span>
                    <p className="text-slate-600">{data.claudeCodeTemplates.ecosystem}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Maturidade</span>
                    <span>{getMaturityScore(data.claudeCodeTemplates.maturity)}%</span>
                  </div>
                  <Progress value={getMaturityScore(data.claudeCodeTemplates.maturity)} className="h-2" />
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Vantagens
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {data.claudeCodeTemplates.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-green-500" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Desvantagens
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {data.claudeCodeTemplates.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Zanai */}
            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    {data.zanai.name}
                  </CardTitle>
                  <Badge className="bg-purple-600">Inovador</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Arquitetura:</span>
                    <p className="text-slate-600">{data.zanai.architecture}</p>
                  </div>
                  <div>
                    <span className="font-medium">Memória:</span>
                    <p className="text-slate-600">{data.zanai.memory}</p>
                  </div>
                  <div>
                    <span className="font-medium">Criação:</span>
                    <p className="text-slate-600">{data.zanai.creation}</p>
                  </div>
                  <div>
                    <span className="font-medium">Ecossistema:</span>
                    <p className="text-slate-600">{data.zanai.ecosystem}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Inovação</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Vantagens
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {data.zanai.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-purple-500" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Desvantagens
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {data.zanai.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Comparação de Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Claude Code Templates</h4>
                  <div className="space-y-2">
                    {data.claudeCodeTemplates.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Zanai</h4>
                  <div className="space-y-2">
                    {data.zanai.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-purple-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="synergies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Merge className="w-5 h-5" />
                Sinergias Estratégicas
              </CardTitle>
              <CardDescription>
                Como combinar o melhor dos dois projetos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.synergies.map((synergy, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{synergy}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Oportunidades de Mercado
              </CardTitle>
              <CardDescription>
                Potenciais oportunidades identificadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {data.opportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm flex-1">{opportunity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Recomendações Estratégicas
              </CardTitle>
              <CardDescription>
                Plano de ação recomendado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}