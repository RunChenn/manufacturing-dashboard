<script setup lang="ts">
import type { ProductionLine } from '../types/mes'

defineProps<{
  lines: ProductionLine[]
}>()

const statusLabel = {
  running: '生產中',
  warning: '異常',
  stopped: '停線',
}

const statusClass = {
  running: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  stopped: 'bg-rose-100 text-rose-800',
}
</script>

<template>
  <section class="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 px-4 py-4 sm:px-5">
      <h2 class="text-lg font-semibold text-slate-950">產線狀態</h2>
    </div>

    <div class="divide-y divide-slate-100 md:hidden">
      <article v-for="line in lines" :key="line.id" class="p-4">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="font-semibold text-slate-950">{{ line.name }}</p>
            <p class="mt-1 break-all text-sm text-slate-500">{{ line.workOrder }}</p>
          </div>
          <span class="shrink-0 rounded px-2 py-1 text-xs font-semibold" :class="statusClass[line.status]">
            {{ statusLabel[line.status] }}
          </span>
        </div>
        <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt class="text-slate-500">產出 / 目標</dt>
            <dd class="mt-1 font-semibold text-slate-900">{{ line.output.toLocaleString() }} / {{ line.target.toLocaleString() }}</dd>
          </div>
          <div>
            <dt class="text-slate-500">良率</dt>
            <dd class="mt-1 font-semibold text-slate-900">{{ line.yieldRate }}%</dd>
          </div>
          <div class="col-span-2">
            <dt class="text-slate-500">更新時間</dt>
            <dd class="mt-1 font-semibold text-slate-900">{{ line.updatedAt }}</dd>
          </div>
        </dl>
      </article>
    </div>

    <div class="hidden overflow-x-auto md:block">
      <table class="w-full min-w-[760px] text-left text-sm">
        <thead class="bg-slate-50 text-slate-500">
          <tr>
            <th class="px-5 py-3 font-medium">產線</th>
            <th class="px-5 py-3 font-medium">狀態</th>
            <th class="px-5 py-3 font-medium">工單</th>
            <th class="px-5 py-3 font-medium">產出 / 目標</th>
            <th class="px-5 py-3 font-medium">良率</th>
            <th class="px-5 py-3 font-medium">更新</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="line in lines" :key="line.id">
            <td class="px-5 py-4 font-medium text-slate-950">{{ line.name }}</td>
            <td class="px-5 py-4">
              <span class="rounded px-2 py-1 text-xs font-semibold" :class="statusClass[line.status]">
                {{ statusLabel[line.status] }}
              </span>
            </td>
            <td class="px-5 py-4 text-slate-600">{{ line.workOrder }}</td>
            <td class="px-5 py-4 text-slate-600">{{ line.output.toLocaleString() }} / {{ line.target.toLocaleString() }}</td>
            <td class="px-5 py-4 text-slate-600">{{ line.yieldRate }}%</td>
            <td class="px-5 py-4 text-slate-600">{{ line.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
