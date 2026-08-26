<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store'
import { useNotificationStore } from '../stores/notification.store'

const auth = useAuthStore()
const notifications = useNotificationStore()

const levelClass = {
  info: 'border-cyan-200 bg-cyan-50 text-cyan-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  critical: 'border-rose-200 bg-rose-50 text-rose-800',
}
</script>

<template>
  <section class="rounded border border-slate-200 bg-white shadow-sm">
    <div class="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <h2 class="text-lg font-semibold text-slate-950">即時通知</h2>
      <div class="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3">
        <button class="rounded border border-cyan-200 px-2 py-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-900" type="button" @click="notifications.reconnectMockSocket">
          重連
        </button>
        <button
          v-if="auth.hasPermission('notification:manage')"
          class="rounded border border-cyan-200 px-2 py-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
          type="button"
          @click="notifications.markAllRead"
        >
          已讀
        </button>
        <button
          v-if="auth.hasPermission('admin:operate')"
          class="rounded border border-rose-200 px-2 py-1.5 text-sm font-semibold text-rose-700 hover:text-rose-900"
          type="button"
          @click="notifications.clearAll"
        >
          清空
        </button>
      </div>
    </div>
    <div class="max-h-[420px] space-y-3 overflow-y-auto p-4 sm:p-5 xl:max-h-[520px]">
      <article
        v-for="item in notifications.items"
        :key="item.id"
        class="rounded border p-3"
        :class="levelClass[item.level]"
      >
        <div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <p class="font-semibold">{{ item.title }}</p>
          <span class="shrink-0 text-xs">{{ item.createdAt }}</span>
        </div>
        <p class="mt-1 text-sm leading-6">{{ item.message }}</p>
      </article>
      <p v-if="notifications.items.length === 0" class="py-8 text-center text-sm text-slate-500">目前沒有通知</p>
    </div>
  </section>
</template>
