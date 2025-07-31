import { ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getRooms } from '@/http/get-rooms'
import { dayjs } from '@/lib/dayjs'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function RoomList() {
  const { data, isLoading, isError } = getRooms()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas Recentes</CardTitle>
        <CardDescription>
          Acesso Rápido para as salas criadas recentemente.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">Carregando Salas...</p>
          </div>
        )}

        {(isError || data?.length === 0) && (
          <p className="text-muted-foreground text-sm">
            Nenhuma sala encontrada.
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
  )
}
