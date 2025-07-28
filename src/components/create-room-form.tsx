import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { createRoom } from '@/http/create-room'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const createRoomSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Por favor, preencha com pelos menos 5 caracteres.' }),
  description: z.string(),
})

type CreateRoomSchemaData = z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
  const { mutateAsync: create_room } = createRoom()
  const createRoomForm = useForm<CreateRoomSchemaData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function handleCreateRoom({ name, description }: CreateRoomSchemaData) {
    await create_room({ name, description })
    createRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Sala</CardTitle>
        <CardDescription>
          {' '}
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da Sala</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sala..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Digite a descrição da sala..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button className="w-full cursor-pointer" type="submit">
              Criar Sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
