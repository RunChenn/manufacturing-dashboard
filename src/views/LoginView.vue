<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const auth = useAuthStore()
const router = useRouter()
const username = ref('engineer')
const password = ref('demo1234')

async function submit() {
  await auth.login(username.value, password.value)
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-slate-100 px-4 py-8 text-slate-950 sm:px-5 sm:py-10">
    <form class="w-full max-w-sm rounded border border-slate-200 bg-white p-5 shadow-sm sm:p-6" @submit.prevent="submit">
      <p class="text-sm font-medium text-cyan-700">MES Demo</p>
      <h1 class="mt-2 text-2xl font-bold">登入製造戰情看板</h1>
      <div class="mt-5 rounded border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
        角色示範：輸入 admin / engineer / viewer 會取得不同權限。
      </div>

      <label class="mt-6 block text-sm font-medium text-slate-700" for="username">帳號</label>
      <input
        id="username"
        v-model="username"
        class="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
        type="text"
      />

      <label class="mt-4 block text-sm font-medium text-slate-700" for="password">密碼</label>
      <input
        id="password"
        v-model="password"
        class="mt-2 w-full rounded border border-slate-300 px-3 py-2 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
        type="password"
      />

      <p v-if="auth.error" class="mt-4 rounded bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ auth.error }}</p>

      <button
        class="mt-6 w-full rounded bg-slate-950 px-4 py-2 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        :disabled="auth.loading"
      >
        {{ auth.loading ? '登入中...' : '登入' }}
      </button>
    </form>
  </main>
</template>
