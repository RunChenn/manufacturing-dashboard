import { computed, type Ref } from 'vue'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts'
import type { GridComponentOption, TooltipComponentOption } from 'echarts/components'
import type { ProductionLine, TrendPoint } from '../types/mes'

type YieldTrendOption = ComposeOption<GridComponentOption | TooltipComponentOption | LineSeriesOption>
type OutputBarOption = ComposeOption<GridComponentOption | TooltipComponentOption | BarSeriesOption>

export function useYieldTrendOption(points: Ref<TrendPoint[]>) {
  return computed<YieldTrendOption>(() => ({
    color: ['#0891b2'],
    tooltip: { trigger: 'axis' },
    grid: { top: 24, right: 18, bottom: 28, left: 42 },
    xAxis: {
      type: 'category',
      data: points.value.map((point) => point.time),
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
        data: points.value.map((point) => point.yieldRate),
        areaStyle: { color: 'rgba(8, 145, 178, 0.12)' },
      },
    ],
  }))
}

export function useOutputBarOption(lines: Ref<ProductionLine[]>) {
  return computed<OutputBarOption>(() => ({
    color: ['#2563eb', '#94a3b8'],
    tooltip: { trigger: 'axis' },
    grid: { top: 24, right: 18, bottom: 28, left: 48 },
    xAxis: {
      type: 'category',
      data: lines.value.map((line) => line.name),
      axisTick: { show: false },
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '產出',
        type: 'bar',
        data: lines.value.map((line) => line.output),
        barMaxWidth: 34,
      },
      {
        name: '目標',
        type: 'bar',
        data: lines.value.map((line) => line.target),
        barMaxWidth: 34,
      },
    ],
  }))
}
