import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'

type GetRoomsApiResponse = Array<{
  id: string
  name: string
  questionsCount: number
  createdAt: string
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')

      const { results } = await response.json()

      const rooms: GetRoomsApiResponse = results

      return rooms
    },
  })
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />
          <Card>
            <CardHeader>
              <CardTitle>Salas Recentes</CardTitle>
              <CardDescription>
                Acesso Rápido para as salas criadas recentemente.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {isLoading && (
                <p className="text-muted-foreground text-sm">
                  Carregando Salas...
                </p>
              )}

              {data?.map((room) => {
                return (
                  <Link
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                    key={room.id}
                    to={`/rooms/${room.id}`}
                  >
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="font-medium">{room.name}</h3>

                      <div className="flex items-center gap-2">
                        <Badge className="text-xs" variant="outline">
                          {dayjs(room.createdAt).toNow()}
                        </Badge>
                        <Badge className="text-xs" variant="secondary">
                          {room.questionsCount} pergunta(s)
                        </Badge>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-sm">
                      Entrar
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    // <div>
    //   <div>Create Room</div>

    //   {isLoading && <p>Carregando...</p>}

    //   <div className="flex flex-col gap-1">
    //     {data?.map((room) => {
    //       return (
    //         <Link key={room.id} to={`/room/${room.id}`}>
    //           {room.name}
    //         </Link>
    //       )
    //     })}
    //   </div>
    // </div>
  )
}
