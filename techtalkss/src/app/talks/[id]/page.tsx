import { notFound } from 'next/navigation'
import { fetchTalkById } from '@/lib/mock-data'
import TopicBadge from '@/components/TopicBadge'
import RegisterForm from '@/components/RegisterForm'

export default async function TalkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const talk = await fetchTalkById(Number(id))

  if (!talk) notFound()

  const date = new Date(talk.scheduledAt).toLocaleString('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <TopicBadge topic={talk.topic} />
        <h1 className="text-3xl font-bold">{talk.title}</h1>
        <p className="text-muted-foreground">{talk.speaker}</p>
        <p className="text-sm">{talk.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{talk.duration} minutes</span>
          <span>{talk.location}</span>
          <span>{date}</span>
          <span>{talk.registrationCount} / {talk.capacity} people registered</span>
        </div>
      </div>

      <RegisterForm talkId={talk.id} title={talk.title} registrationCount={talk.registrationCount}
  capacity={talk.capacity} />
    </main>
  )
}