import { useQuery } from '@tanstack/react-query'
import { getCurrentAdmin } from '../services/auth/admin'

// Checks whether an admin is currently logged in, for showing admin-only controls on public pages
export function useIsAdmin() {
  const { data } = useQuery({
    queryKey: ['admin-session'],
    queryFn: getCurrentAdmin,
    staleTime: 60_000,
    retry: false,
  })

  return !!data
}
