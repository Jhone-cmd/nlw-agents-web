import { ArrowLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { Button } from '@/components/ui/button'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  //const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const { roomId } = useParams<RoomParams>()

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  if (!isRecordingSupported) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <p>Seu navegador não suporta gravação de áudio.</p>
      </div>
    )
  }

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    // if (intervalRef.current) {
    //   clearInterval(intervalRef.current)
    // }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('audio_file', audio, 'audio_file.webm')

    await fetch(
      `https://nlw-agents-server-production.up.railway.app/rooms/${roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }
    recorder.current.start()
  }

  async function startRecording() {
    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    // intervalRef.current = setInterval(() => {
    //   recorder.current?.stop()

    //   createRecorder(audio)
    // }, 5000) // Grava por 5 segundos
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex w-full justify-center p-4">
        <Link className="w-full sm:w-auto" to={`/rooms/${roomId}/`}>
          <Button className="w-full cursor-pointer sm:w-auto" variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Voltar a Sala de Perguntas
          </Button>
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        {isRecording ? (
          <Button onClick={stopRecording}> Encerrar Gravação</Button>
        ) : (
          <Button onClick={startRecording}> Gravar Audio</Button>
        )}
        {isRecording && <p>Gravando...</p>}
      </div>
    </div>
  )
}
