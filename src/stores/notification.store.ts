import { defineStore } from 'pinia'
import { mockMesSocket } from '../api/socket.mock'
import type { NotificationItem, SocketStatusEvent } from '../types/mes'
import { useDashboardStore } from './dashboard.store'

interface NotificationState {
  items: NotificationItem[]
  connected: boolean
  statusMessage: string
  unsubscribe: null | (() => void)
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    items: [],
    connected: false,
    statusMessage: '尚未連線',
    unsubscribe: null,
  }),
  getters: {
    unreadCount: (state) => state.items.filter((item) => !item.read).length,
  },
  actions: {
    startMockSocket() {
      if (!this.unsubscribe) {
        this.unsubscribe = mockMesSocket.subscribe((event) => {
          if (event.type === 'notification') {
            this.items.unshift(event.payload)
            this.items = this.items.slice(0, 8)
          }

          if (event.type === 'line-update') {
            useDashboardStore().updateLine(event.payload)
          }

          if (event.type === 'status') {
            this.applySocketStatus(event.payload)
          }
        })
      }

      mockMesSocket.connect()
    },
    stopMockSocket() {
      mockMesSocket.disconnect()

      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    reconnectMockSocket() {
      mockMesSocket.reconnect()
    },
    applySocketStatus(status: SocketStatusEvent) {
      this.connected = status.type === 'connected'
      this.statusMessage = status.message
    },
    markAllRead() {
      this.items = this.items.map((item) => ({ ...item, read: true }))
    },
    clearAll() {
      this.items = []
    },
  },
})
