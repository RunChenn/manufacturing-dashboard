<script setup lang="ts">
import type { Metric } from '../types/mes'

defineProps<{
  metric: Metric
}>()
</script>

<template>
  <article class="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <p class="text-sm text-slate-500">{{ metric.label }}</p>
    <p class="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">{{ metric.value }}</p>
    <p class="mt-2 text-sm text-slate-500">{{ metric.helper }}</p>
  </article>
</template>
