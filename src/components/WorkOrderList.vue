<script setup lang="ts">
import type { WorkOrder } from '../types/mes'

defineProps<{
  workOrders: WorkOrder[]
}>()
</script>

<template>
  <section class="rounded border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-4 py-4 sm:px-5">
      <h2 class="text-lg font-semibold text-slate-950">工單進度</h2>
    </div>
    <div class="divide-y divide-slate-100">
      <article v-for="order in workOrders" :key="order.id" class="px-4 py-4 sm:px-5">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div class="min-w-0">
            <p class="break-all font-semibold text-slate-950">{{ order.id }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ order.product }} · {{ order.line }} · {{ order.owner }}</p>
          </div>
          <p class="text-sm font-semibold text-slate-700 sm:shrink-0">{{ order.progress }}%</p>
        </div>
        <div class="mt-3 h-2 overflow-hidden rounded bg-slate-100">
          <div class="h-full rounded bg-cyan-600" :style="{ width: `${order.progress}%` }"></div>
        </div>
        <p class="mt-2 text-xs text-slate-500">預計完成 {{ order.dueTime }}</p>
      </article>
    </div>
  </section>
</template>
