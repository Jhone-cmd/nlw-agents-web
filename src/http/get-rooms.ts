import { useQuery } from '@tanstack/react-query'
import type { GetRoomsResponse } from './types/get-room-response'

export function getRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(
        'https://nlw-agents-server-production.up.railway.app/rooms'
      )

      const { results } = await response.json()

      const questions: GetRoomsResponse = results

      return questions
    },
  })
}
