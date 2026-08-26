<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import type { GridComponentOption, TooltipComponentOption } from 'echarts/components'
import type { LineSeriesOption } from 'echarts/charts'
import type { TrendPoint } from '../types/mes'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

type ChartOption = ComposeOption<GridComponentOption | TooltipComponentOption | LineSeriesOption>

const props = defineProps<{
  points: TrendPoint[]
}>()

const option = computed<ChartOption>(() => ({
  color: ['#0891b2'],
  tooltip: { trigger: 'axis' },
  grid: { top: 24, right: 18, bottom: 28, left: 42 },
  xAxis: {
    type: 'category',
    data: props.points.map((point) => point.time),
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    min: 88,
    max: 100,
    axisLabel: { formatter: '{value}%' },
  },
  series: [
    {
      type: 'line',
      smooth: true,
      symbolSize: 7,
      data: props.points.map((point) => point.yieldRate),
      areaStyle: { color: 'rgba(8, 145, 178, 0.12)' },
    },
  ],
}))
</script>

<template>
  <section class="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <h2 class="text-lg font-semibold text-slate-950">良率趨勢</h2>
    <div class="mt-4 h-56 min-h-0 w-full overflow-hidden sm:h-64">
      <VChart class="h-full min-h-0 w-full" :option="option" autoresize />
    </div>
  </section>
</template>
