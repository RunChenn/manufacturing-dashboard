import { defineStore } from 'pinia'
import { getDashboard } from '../api/dashboard.api'
import type { Metric, ProductionLine, TrendPoint, WorkOrder } from '../types/mes'

interface DashboardState {
  metrics: Metric[]
  lines: ProductionLine[]
  workOrders: WorkOrder[]
  yieldTrend: TrendPoint[]
  loading: boolean
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    metrics: [],
    lines: [],
    workOrders: [],
    yieldTrend: [],
    loading: false,
  }),
  getters: {
    warningCount: (state) => state.lines.filter((line) => line.status !== 'running').length,
  },
  actions: {
    async fetchDashboard() {
      this.loading = true

      try {
        const response = await getDashboard()
        this.metrics = response.metrics
        this.lines = response.lines
        this.workOrders = response.workOrders
        this.yieldTrend = response.yieldTrend
      } finally {
        this.loading = false
      }
    },
    updateLine(payload: Pick<ProductionLine, 'id' | 'output' | 'yieldRate' | 'updatedAt'>) {
      this.lines = this.lines.map((line) => (
        line.id === payload.id
          ? { ...line, output: payload.output, yieldRate: payload.yieldRate, updatedAt: payload.updatedAt }
          : line
      ))
    },
    simulateRealtimeUpdate() {
      this.lines = this.lines.map((line) => ({
        ...line,
        output: line.status === 'stopped' ? line.output : line.output + Math.floor(Math.random() * 20),
        updatedAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
      }))
    },
  },
})
