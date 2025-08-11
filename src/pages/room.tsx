import { ArrowLeft, Radio } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { QuestionForm } from '@/components/question-form'
import { QuestionList } from '@/components/question-list'
import { Button } from '@/components/ui/button'

type RoomParams = {
  roomId: string
}

export function Room() {
  const { roomId } = useParams<RoomParams>()

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-2 py-6 sm:px-4 sm:py-8">
        <div className="mb-8">
          <div className="b-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Link className="w-full sm:w-auto" to="/">
              <Button
                className="w-full cursor-pointer sm:w-auto"
                variant="outline"
              >
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Link className="w-full sm:w-auto" to={`/rooms/${roomId}/audio`}>
              <Button
                className="flex w-full cursor-pointer items-center gap-2 sm:w-auto"
                variant="secondary"
              >
                <Radio className="size-4" />
                Gravar Áudio
              </Button>
            </Link>
          </div>
          <h1 className="mt-4 mb-2 text-center font-bold text-2xl text-foreground sm:text-left sm:text-3xl">
            Sala de Perguntas
          </h1>
          <p className="text-center text-base text-muted-foreground sm:text-left sm:text-lg">
            Faça perguntas e receba respostas com IA
          </p>
        </div>

        <div className="mb-8">
          <QuestionForm roomId={roomId} />
        </div>

        <QuestionList roomId={roomId} />
      </div>
    </div>
  )
}
