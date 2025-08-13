import { NextResponse } from 'next/server'

interface SystemMetrics {
  cpu: number
  memory: number
  disk: number
  network: number
  uptime: string
  activeUsers: number
  responseTime: number
}

interface Alert {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  description: string
  timestamp: string
  resolved: boolean
}

interface LogEntry {
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  message: string
  timestamp: string
  source: string
}

// Simulated system data
const generateSystemMetrics = (): SystemMetrics => ({
  cpu: Math.floor(Math.random() * 100),
  memory: Math.floor(Math.random() * 100),
  disk: Math.floor(Math.random() * 100),
  network: Math.floor(Math.random() * 100),
  uptime: `${Math.floor(Math.random() * 30)}d ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
  activeUsers: Math.floor(Math.random() * 2000) + 500,
  responseTime: Math.floor(Math.random() * 400) + 50
})

const alerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High Disk Usage',
    description: 'Disk usage is above 75% threshold',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resolved: false
  },
  {
    id: '2',
    type: 'error',
    title: 'Database Connection Failed',
    description: 'Unable to connect to primary database',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    resolved: true
  },
  {
    id: '3',
    type: 'info',
    title: 'System Update Available',
    description: 'New version 2.1.0 is available for download',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    resolved: false
  }
]

const generateLogs = (count: number = 20): LogEntry[] => {
  const messages = [
    'System started successfully',
    'User authentication successful',
    'High memory usage detected',
    'Database connection timeout',
    'Backup process completed',
    'New user registered',
    'Disk space running low',
    'System health check passed',
    'API request processed',
    'Cache cleared successfully',
    'Security scan completed',
    'Performance optimization applied',
    'Network connection established',
    'Configuration updated',
    'Service restarted',
    'Memory allocation optimized'
  ]

  const sources = ['system', 'auth', 'database', 'api', 'cache', 'security', 'network']
  const levels: LogEntry['level'][] = ['INFO', 'WARN', 'ERROR', 'DEBUG']

  return Array.from({ length: count }, (_, i) => ({
    level: levels[Math.floor(Math.random() * levels.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date(Date.now() - i * 300000).toISOString(),
    source: sources[Math.floor(Math.random() * sources.length)]
  }))
}

export async function GET() {
  try {
    const metrics = generateSystemMetrics()
    const logs = generateLogs()

    return NextResponse.json({
      metrics,
      alerts,
      logs,
      timestamp: new Date().toISOString(),
      status: 'operational'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch monitoring data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'resolve_alert':
        const alertId = body.alertId
        // In a real implementation, you would update the alert in the database
        return NextResponse.json({
          message: `Alert ${alertId} resolved successfully`,
          timestamp: new Date().toISOString()
        })

      case 'clear_logs':
        // In a real implementation, you would clear old logs
        return NextResponse.json({
          message: 'Logs cleared successfully',
          timestamp: new Date().toISOString()
        })

      case 'system_restart':
        // In a real implementation, you would trigger a system restart
        return NextResponse.json({
          message: 'System restart initiated',
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { 
            error: 'Unknown action',
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    )
  }
}