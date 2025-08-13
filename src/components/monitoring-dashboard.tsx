'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  TrendingDown,
  Users,
  Zap,
  Database,
  Globe,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Server,
  Clock,
  Target,
  Shield,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Settings
} from 'lucide-react'

interface Metric {
  name: string
  value: number
  unit: string
  change: number
  status: 'good' | 'warning' | 'critical'
}

interface Alert {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  description: string
  timestamp: string
  resolved: boolean
}

interface SystemStatus {
  cpu: number
  memory: number
  disk: number
  network: number
  uptime: string
  activeUsers: number
  responseTime: number
}

export function MonitoringDashboard() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 23,
    uptime: '15d 4h 32m',
    activeUsers: 1247,
    responseTime: 145
  })

  const [metrics, setMetrics] = useState<Metric[]>([
    { name: 'CPU Usage', value: 45, unit: '%', change: 2.3, status: 'good' },
    { name: 'Memory', value: 62, unit: '%', change: -1.2, status: 'good' },
    { name: 'Disk Space', value: 78, unit: '%', change: 5.7, status: 'warning' },
    { name: 'Network I/O', value: 23, unit: '%', change: -0.8, status: 'good' },
    { name: 'Response Time', value: 145, unit: 'ms', change: 12.5, status: 'warning' },
    { name: 'Active Users', value: 1247, unit: '', change: 8.3, status: 'good' }
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Disk Usage',
      description: 'Disk usage is above 75% threshold',
      timestamp: '2024-01-20 14:30:00',
      resolved: false
    },
    {
      id: '2',
      type: 'error',
      title: 'Database Connection Failed',
      description: 'Unable to connect to primary database',
      timestamp: '2024-01-20 13:45:00',
      resolved: true
    },
    {
      id: '3',
      type: 'info',
      title: 'System Update Available',
      description: 'New version 2.1.0 is available for download',
      timestamp: '2024-01-20 12:00:00',
      resolved: false
    }
  ])

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 3)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 10)),
        responseTime: Math.max(50, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 20))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'error': return <Badge className="bg-red-600">Erro</Badge>
      case 'warning': return <Badge className="bg-yellow-600">Aviso</Badge>
      case 'info': return <Badge className="bg-blue-600">Info</Badge>
      default: return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Painel de Monitoramento
              </CardTitle>
              <CardDescription>
                Monitoramento em tempo real do sistema e performance
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="1h">1 hora</option>
                <option value="24h">24 horas</option>
                <option value="7d">7 dias</option>
                <option value="30d">30 dias</option>
              </select>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">CPU Usage</p>
                <p className="text-2xl font-bold">{systemStatus.cpu}%</p>
              </div>
              <Cpu className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={systemStatus.cpu} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Memory</p>
                <p className="text-2xl font-bold">{systemStatus.memory}%</p>
              </div>
              <MemoryStick className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={systemStatus.memory} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Disk Space</p>
                <p className="text-2xl font-bold">{systemStatus.disk}%</p>
              </div>
              <HardDrive className="w-8 h-8 text-orange-500" />
            </div>
            <Progress value={systemStatus.disk} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <p className="text-2xl font-bold">{systemStatus.activeUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+8.3%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Métricas de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        metric.status === 'good' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <p className="text-sm text-slate-600">
                          {metric.value}{metric.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {metric.change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      )}
                      <span className={`text-sm ${metric.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alertas do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          {getAlertBadge(alert.type)}
                          {alert.resolved && (
                            <Badge className="bg-green-600">Resolvido</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                      <p className="text-xs text-slate-500 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Logs do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {[
                  { level: 'INFO', message: 'System started successfully', timestamp: '2024-01-20 15:30:00' },
                  { level: 'INFO', message: 'User authentication successful', timestamp: '2024-01-20 15:29:45' },
                  { level: 'WARN', message: 'High memory usage detected', timestamp: '2024-01-20 15:29:30' },
                  { level: 'ERROR', message: 'Database connection timeout', timestamp: '2024-01-20 15:29:15' },
                  { level: 'INFO', message: 'Backup process completed', timestamp: '2024-01-20 15:29:00' },
                  { level: 'INFO', message: 'New user registered', timestamp: '2024-01-20 15:28:45' },
                  { level: 'WARN', message: 'Disk space running low', timestamp: '2024-01-20 15:28:30' },
                  { level: 'INFO', message: 'System health check passed', timestamp: '2024-01-20 15:28:15' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Badge 
                      variant={log.level === 'ERROR' ? 'destructive' : log.level === 'WARN' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {log.level}
                    </Badge>
                    <span className="text-sm flex-1">{log.message}</span>
                    <span className="text-xs text-slate-500">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Informações do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-600">Uptime</p>
              <p className="text-lg">{systemStatus.uptime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Response Time</p>
              <p className="text-lg">{systemStatus.responseTime}ms</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Network</p>
              <p className="text-lg">{systemStatus.network}%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Status</p>
              <Badge className="bg-green-600">Online</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}