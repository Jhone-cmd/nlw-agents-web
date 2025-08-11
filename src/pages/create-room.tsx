import { CreateRoomForm } from '@/components/create-room-form'
import { RoomList } from '@/components/room-list'

export function CreateRoom() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Usando flexbox para empilhar os elementos em telas pequenas */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-start">
          <CreateRoomForm />
          <RoomList />
          <footer className="col-span-2 mt-50 text-center text-muted-foreground text-sm">
            <p>Feito com a RocketSeat ©</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
