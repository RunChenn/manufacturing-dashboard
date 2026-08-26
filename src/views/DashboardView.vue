<script setup lang="ts">
import { onMounted } from 'vue';
import { useMockSocket } from '../composables/useMockSocket';
import { usePermission } from '../composables/usePermission';
import AppHeader from '../components/AppHeader.vue';
import MetricCard from '../components/MetricCard.vue';
import NotificationPanel from '../components/NotificationPanel.vue';
import OutputBarChart from '../components/OutputBarChart.vue';
import ProductionLineTable from '../components/ProductionLineTable.vue';
import WorkOrderList from '../components/WorkOrderList.vue';
import YieldTrendChart from '../components/YieldTrendChart.vue';
import { useDashboardStore } from '../stores/dashboard.store';

const dashboard = useDashboardStore();
const socket = useMockSocket();
const { can } = usePermission();

socket.useLifecycle();

onMounted(async () => {
  await dashboard.fetchDashboard();
});
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <AppHeader />

    <main
      class="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 text-slate-950 sm:gap-6 sm:px-5 sm:py-6"
    >
      <section
        class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        <div class="min-w-0">
          <h2 class="mt-1 text-xl font-bold sm:text-2xl">今日生產總覽</h2>
        </div>
        <button
          v-if="can('line:update')"
          class="w-full rounded bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 sm:w-auto"
          type="button"
          @click="dashboard.simulateRealtimeUpdate"
        >
          模擬產線更新
        </button>
      </section>

      <div class="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <MetricCard
          v-for="metric in dashboard.metrics"
          :key="metric.id"
          :metric="metric"
        />
      </div>

      <div class="grid min-h-0 gap-5 sm:gap-6 xl:grid-cols-2">
        <YieldTrendChart :points="dashboard.yieldTrend" />
        <OutputBarChart :lines="dashboard.lines" />
      </div>

      <div class="grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div class="flex min-w-0 flex-col gap-5 sm:gap-6">
          <ProductionLineTable :lines="dashboard.lines" />
          <WorkOrderList :work-orders="dashboard.workOrders" />
        </div>
        <div class="min-w-0">
          <NotificationPanel />
        </div>
      </div>
    </main>
  </div>
</template>
