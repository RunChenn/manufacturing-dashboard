<script setup lang="ts">
import { toRef } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { useOutputBarOption } from '../composables/useChartOptions'
import type { ProductionLine } from '../types/mes'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const props = defineProps<{
  lines: ProductionLine[]
}>()

const option = useOutputBarOption(toRef(props, 'lines'))
</script>

<template>
  <section class="rounded border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <h2 class="text-lg font-semibold text-slate-950">產出比較</h2>
    <div class="mt-4 h-56 min-h-0 w-full overflow-hidden sm:h-64">
      <VChart class="h-full min-h-0 w-full" :option="option" autoresize />
    </div>
  </section>
</template>
