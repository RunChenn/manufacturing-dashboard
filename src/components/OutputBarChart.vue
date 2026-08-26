<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption, TooltipComponentOption } from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import type { ProductionLine } from '../types/mes'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

type ChartOption = ComposeOption<GridComponentOption | TooltipComponentOption | BarSeriesOption>

const props = defineProps<{
  lines: ProductionLine[]
}>()

const option = computed<ChartOption>(() => ({
  color: ['#2563eb', '#94a3b8'],
  tooltip: { trigger: 'axis' },
  grid: { top: 24, right: 18, bottom: 28, left: 48 },
  xAxis: {
    type: 'category',
    data: props.lines.map((line) => line.name),
    axisTick: { show: false },
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '產出',
      type: 'bar',
      data: props.lines.map((line) => line.output),
      barMaxWidth: 34,
    },
    {
      name: '目標',
      type: 'bar',
      data: props.lines.map((line) => line.target),
      barMaxWidth: 34,
    },
  ],
}))
</script>

<template>
  <section class="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <h2 class="text-lg font-semibold text-slate-950">產出比較</h2>
    <div class="mt-4 h-56 min-h-0 w-full overflow-hidden sm:h-64">
      <VChart class="h-full min-h-0 w-full" :option="option" autoresize />
    </div>
  </section>
</template>
