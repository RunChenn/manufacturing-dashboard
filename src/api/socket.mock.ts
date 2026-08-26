import { createMockNotification } from './mock'
import type { MockSocketEvent, ProductionLine } from '../types/mes'

type Listener = (event: MockSocketEvent) => void

const lineIds = ['line-a', 'line-b', 'line-c']

export class MockMesSocket {
  private listeners = new Set<Listener>()
  private intervalId: number | null = null
  private reconnectId: number | null = null
  private connected = false

  connect() {
    if (this.connected) return

    this.connected = true
    this.emit({ type: 'status', payload: { type: 'connected', message: 'Mock WebSocket 已連線' } })
    this.emit({ type: 'notification', payload: createMockNotification() })
    this.intervalId = window.setInterval(() => this.emitRandomEvent(), 4500)
  }

  disconnect() {
    this.connected = false

    if (this.intervalId) {
      window.clearInterval(this.intervalId)
      this.intervalId = null
    }

    if (this.reconnectId) {
      window.clearTimeout(this.reconnectId)
      this.reconnectId = null
    }

    this.emit({ type: 'status', payload: { type: 'disconnected', message: 'Mock WebSocket 已斷線' } })
  }

  reconnect() {
    this.disconnect()
    this.emit({ type: 'status', payload: { type: 'reconnecting', message: '正在重新連線...' } })
    this.reconnectId = window.setTimeout(() => this.connect(), 1200)
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private emit(event: MockSocketEvent) {
    this.listeners.forEach((listener) => listener(event))
  }

  private emitRandomEvent() {
    if (!this.connected) return

    if (Math.random() > 0.35) {
      this.emit({ type: 'notification', payload: createMockNotification() })
      return
    }

    const lineId = lineIds[Math.floor(Math.random() * lineIds.length)]
    const payload: Pick<ProductionLine, 'id' | 'output' | 'yieldRate' | 'updatedAt'> = {
      id: lineId,
      output: 600 + Math.floor(Math.random() * 900),
      yieldRate: Number((91 + Math.random() * 8).toFixed(1)),
      updatedAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
    }

    this.emit({ type: 'line-update', payload })
  }
}

export const mockMesSocket = new MockMesSocket()
