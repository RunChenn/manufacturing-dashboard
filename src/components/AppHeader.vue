<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useNotificationStore } from '../stores/notification.store'

const auth = useAuthStore()
const notifications = useNotificationStore()
const router = useRouter()

const roleLabel = computed(() => ({
  admin: 'Admin',
  engineer: 'Engineer',
  viewer: 'Viewer',
}[auth.user?.role ?? 'viewer']))

function logout() {
  auth.logout()
  notifications.stopMockSocket()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
      <div class="min-w-0">
        <p class="text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm">Manufacturing Execution System</p>
        <h1 class="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">製造戰情看板</h1>
      </div>
      <div class="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
        <div class="min-w-0 rounded border border-slate-200 px-3 py-2 text-sm text-slate-600">
          <span class="block truncate">{{ roleLabel }} · {{ auth.user?.name }}</span>
        </div>
        <div class="min-w-0 rounded border px-3 py-2 text-sm" :class="notifications.connected ? 'border-emerald-200 text-emerald-700' : 'border-amber-200 text-amber-700'">
          <span class="block truncate">{{ notifications.statusMessage }}</span>
        </div>
        <div class="rounded border border-slate-200 px-3 py-2 text-sm text-slate-600">
          未讀 <span class="font-bold text-slate-950">{{ notifications.unreadCount }}</span>
        </div>
        <button
          class="rounded bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          type="button"
          @click="logout"
        >
          登出
        </button>
      </div>
    </div>
  </header>
</template>
