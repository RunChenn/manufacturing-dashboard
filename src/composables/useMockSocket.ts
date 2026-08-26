import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '../stores/notification.store'

export function useMockSocket() {
  const notifications = useNotificationStore()
  const { connected, items, statusMessage, unreadCount } = storeToRefs(notifications)

  function start() {
    notifications.startMockSocket()
  }

  function stop() {
    notifications.stopMockSocket()
  }

  function useLifecycle() {
    onMounted(start)
    onUnmounted(stop)
  }

  return {
    connected,
    items,
    statusMessage,
    unreadCount,
    start,
    stop,
    useLifecycle,
    reconnect: notifications.reconnectMockSocket,
    markAllRead: notifications.markAllRead,
    clearAll: notifications.clearAll,
  }
}
