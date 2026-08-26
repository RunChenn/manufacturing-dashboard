import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import type { Permission } from '../types/mes'

export function usePermission() {
  const auth = useAuthStore()

  const role = computed(() => auth.user?.role ?? 'viewer')
  const roleLabel = computed(() => ({
    admin: 'Admin',
    engineer: 'Engineer',
    viewer: 'Viewer',
  }[role.value]))

  function can(permission: Permission) {
    return auth.hasPermission(permission)
  }

  return {
    role,
    roleLabel,
    can,
  }
}
