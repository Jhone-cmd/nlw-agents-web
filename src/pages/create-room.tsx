import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsApiResponse = {
  id: string
  name: string
}

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')

      const result: GetRoomsApiResponse[] = await response.json()

      return result
    },
  })
  return (
    <div>
      <div>Create Room</div>

      {isLoading && <p>Carregando...</p>}

      <div>
        {data?.map((room) => {
          return <p key={room.id}>{room.name}</p>
        })}
      </div>
      <Link className="underline" to="/room">
        acessar sala
      </Link>
    </div>
  )
}
