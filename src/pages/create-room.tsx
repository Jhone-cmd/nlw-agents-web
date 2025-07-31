import { CreateRoomForm } from '@/components/create-room-form'
import { RoomList } from '@/components/room-list'

export function CreateRoom() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />
          <RoomList />
          <footer className="col-span-2 mt-12 text-center text-muted-foreground text-sm">
            <p>Feito com a RocketSeat ©</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
