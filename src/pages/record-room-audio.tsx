import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router'
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

  const { roomId } = useParams<RoomParams>()

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('audio_file', audio, 'audio_file.webm')

    await fetch(`http://localhost:3333/rooms/${roomId}/audio`, {
      method: 'Post',
      body: formData,
    })
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Seu navegador não suporta gravação.')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    // recorder.current.onstart = () => {
    //   console.log('gravação iniciada')
    // }

    // recorder.current.onstop = () => {
    //   console.log('gravação encerrada')
    // }

    recorder.current.start()
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {' '}
      {isRecording ? (
        <Button className="cursor-pointer" onClick={stopRecording}>
          {' '}
          Encerrar Gravação
        </Button>
      ) : (
        <Button className="cursor-pointer" onClick={startRecording}>
          {' '}
          Gravar Audio
        </Button>
      )}
    </div>
  )
}
