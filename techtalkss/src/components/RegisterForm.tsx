'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { createRegistration } from '@/lib/mock-data'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  attendeeName: z.string().min(2, 'Name must be at least 2 characters'),
  attendeeEmail: z.string().email('Please enter a valid email'),
  talkId: z.number(),
})

type FormData = z.infer<typeof schema>

interface Props {
  talkId: number
  title: string
  registrationCount: number
  capacity: number
}

export default function RegisterForm({ talkId, title, registrationCount, capacity }: Props) {
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { talkId },
  })

  const mutation = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['talks'] }),
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  //Bonus Check for Capacity Full State
  //Checks if the number of registered people is greater than the Tech Talk Capacity
  // Returns Fully Booked if state is true
  if (registrationCount >= capacity) {
    return (
      <div className="border rounded-xl p-6 max-w-md flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="bg-orange-100 text-orange-800 px-4 py-3 rounded-lg text-sm font-medium">
Fully Booked — {registrationCount} / {capacity} people registered and reached the maximum venue capacity        
</div>
      </div>
    )
  }

  return (
    <div className="border rounded-xl p-6 max-w-md flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold">Register for this Tech Talk</h2>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      {mutation.isSuccess && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg text-sm">
You're now registered as a Guest to our TechTalk! See you there.
        </div>
      )}

      {mutation.isError && (
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg text-sm">
          {mutation.error instanceof Error ? mutation.error.message : 'Something went wrong.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
<Label htmlFor="attendeeName">Attendee Name</Label>          
<Input id="attendeeName" {...register('attendeeName')} />
          {errors.attendeeName && (
            <p className="text-red-600 text-xs">{errors.attendeeName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
<Label htmlFor="attendeeEmail">Attendee Email</Label>
          <Input id="attendeeEmail" type="email" {...register('attendeeEmail')} />
          {errors.attendeeEmail && (
            <p className="text-red-600 text-xs">{errors.attendeeEmail.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition-colors w-full"
        >
          {isSubmitting || mutation.isPending ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  )
}