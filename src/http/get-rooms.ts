import { useQuery } from '@tanstack/react-query'
import type { GetRoomsResponse } from './types/get-room-response'

export function getRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')

      const { results } = await response.json()

      const rooms: GetRoomsResponse = results

      return rooms
    },
  })
}
