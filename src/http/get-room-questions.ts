import { useQuery } from '@tanstack/react-query'
import type { GetRoomQuestionResponse } from './types/get-room-question-response'

export function GetRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      )

      const { results } = await response.json()

      const questions: GetRoomQuestionResponse = results

      return questions
    },
  })
}
