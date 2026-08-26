import type { DashboardResponse, LoginPayload, LoginResponse, NotificationItem, Permission, UserRole } from '../types/mes'

const wait = (ms = 350) => new Promise((resolve) => window.setTimeout(resolve, ms))

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: ['dashboard:view', 'line:update', 'notification:manage', 'admin:operate'],
  engineer: ['dashboard:view', 'line:update'],
  viewer: ['dashboard:view'],
}

function resolveRole(username: string): UserRole {
  const normalized = username.toLowerCase()

  if (normalized.includes('admin')) return 'admin'
  if (normalized.includes('viewer')) return 'viewer'
  return 'engineer'
}

export async function mockLogin(payload: LoginPayload): Promise<LoginResponse> {
  await wait()

  if (!payload.username || !payload.password) {
    throw new Error('請輸入帳號與密碼')
  }

  const role = resolveRole(payload.username)

  return {
    accessToken: `mock-jwt-token-${role}`,
    user: {
      id: 'u-001',
      name: payload.username,
      role,
      permissions: rolePermissions[role],
    },
  }
}

export async function mockDashboard(): Promise<DashboardResponse> {
  await wait()

  return {
    metrics: [
      { id: 'output', label: '今日產出', value: '2,740', helper: '較昨日 +8.2%' },
      { id: 'yield', label: '平均良率', value: '96.1%', helper: '目標 95.0%' },
      { id: 'orders', label: '工單完成率', value: '78%', helper: '12 / 15 張進行中' },
      { id: 'alerts', label: '未讀異常', value: '3', helper: '含 1 筆高風險' },
    ],
    lines: [
      {
        id: 'line-a',
        name: 'Line A',
        status: 'running',
        workOrder: 'MO-20260826-001',
        output: 1280,
        target: 1500,
        yieldRate: 98.4,
        updatedAt: '13:32',
      },
      {
        id: 'line-b',
        name: 'Line B',
        status: 'warning',
        workOrder: 'MO-20260826-002',
        output: 940,
        target: 1300,
        yieldRate: 94.8,
        updatedAt: '13:31',
      },
      {
        id: 'line-c',
        name: 'Line C',
        status: 'stopped',
        workOrder: 'MO-20260826-003',
        output: 520,
        target: 1100,
        yieldRate: 89.2,
        updatedAt: '13:29',
      },
    ],
    workOrders: [
      { id: 'MO-20260826-001', product: 'AI Server Node', line: 'Line A', progress: 86, dueTime: '16:00', owner: '製造一課' },
      { id: 'MO-20260826-002', product: 'Storage Module', line: 'Line B', progress: 72, dueTime: '17:30', owner: '製造二課' },
      { id: 'MO-20260826-003', product: 'HPC Accelerator Tray', line: 'Line C', progress: 48, dueTime: '18:00', owner: '製造三課' },
    ],
    yieldTrend: [
      { time: '08:00', yieldRate: 95.2 },
      { time: '09:00', yieldRate: 95.8 },
      { time: '10:00', yieldRate: 96.4 },
      { time: '11:00', yieldRate: 95.9 },
      { time: '12:00', yieldRate: 96.8 },
      { time: '13:00', yieldRate: 96.1 },
    ],
  }
}

export function createMockNotification(): NotificationItem {
  const samples = [
    { level: 'warning' as const, title: 'Line B 良率低於門檻', message: '近 10 分鐘平均良率降至 94.8%，請確認測試站資料。' },
    { level: 'critical' as const, title: 'Line C 設備離線', message: '站點 ICT-03 連線中斷，已觸發停線告警。' },
    { level: 'info' as const, title: '工單進度更新', message: 'MO-20260826-001 已完成 86%，預估準時結案。' },
  ]
  const item = samples[Math.floor(Math.random() * samples.length)]

  return {
    id: crypto.randomUUID(),
    ...item,
    createdAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    read: false,
  }
}
