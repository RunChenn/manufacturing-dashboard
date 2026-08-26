export type ProductionLineStatus = 'running' | 'warning' | 'stopped'
export type UserRole = 'admin' | 'engineer' | 'viewer'
export type Permission = 'dashboard:view' | 'line:update' | 'notification:manage' | 'admin:operate'

export interface UserProfile {
  id: string
  name: string
  role: UserRole
  permissions: Permission[]
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: UserProfile
}

export interface Metric {
  id: string
  label: string
  value: string
  helper: string
}

export interface ProductionLine {
  id: string
  name: string
  status: ProductionLineStatus
  workOrder: string
  output: number
  target: number
  yieldRate: number
  updatedAt: string
}

export interface WorkOrder {
  id: string
  product: string
  line: string
  progress: number
  dueTime: string
  owner: string
}

export interface NotificationItem {
  id: string
  level: 'info' | 'warning' | 'critical'
  title: string
  message: string
  createdAt: string
  read: boolean
}

export interface TrendPoint {
  time: string
  yieldRate: number
}

export interface DashboardResponse {
  metrics: Metric[]
  lines: ProductionLine[]
  workOrders: WorkOrder[]
  yieldTrend: TrendPoint[]
}

export interface SocketStatusEvent {
  type: 'connected' | 'disconnected' | 'reconnecting'
  message: string
}

export type MockSocketEvent =
  | { type: 'notification'; payload: NotificationItem }
  | { type: 'line-update'; payload: Pick<ProductionLine, 'id' | 'output' | 'yieldRate' | 'updatedAt'> }
  | { type: 'status'; payload: SocketStatusEvent }
