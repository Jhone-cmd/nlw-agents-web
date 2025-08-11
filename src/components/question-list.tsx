import { GetRoomQuestions } from '@/http/get-room-questions'
import { QuestionItem } from './question-item'

interface QuestionProps {
  roomId: string
}

export function QuestionList({ roomId }: QuestionProps) {
  const { data: questions } = GetRoomQuestions(roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-center font-semibold text-2xl text-foreground sm:text-left">
          Perguntas & Respostas
        </h2>
      </div>

      {questions?.map((question) => {
        return <QuestionItem key={question.id} question={question} />
      })}
    </div>
  )
}
