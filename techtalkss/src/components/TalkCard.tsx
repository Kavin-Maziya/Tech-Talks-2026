
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Talk } from '@/types'
import TopicBadge from './TopicBadge'

interface Props {
  talk: Talk
  isSelected?: boolean
  onClick?: () => void
}

export default function TalkCard({ talk, isSelected = false, onClick }: Props) {
  const date = new Date(talk.scheduledAt).toLocaleString('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <Card
      onClick={onClick}
      className={`flex flex-col gap-2 p-4 cursor-pointer transition-all
        ${isSelected
          ? 'ring-2 ring-orange-500 shadow-md'
          : 'hover:shadow-md hover:ring-1 hover:ring-gray-200'
        }`}
    >
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold">{talk.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{talk.speaker}</p>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-2">
        <TopicBadge topic={talk.topic} />

        <p className="text-sm text-muted-foreground">{talk.description}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span>{talk.duration} minutes</span>
          <span>{talk.location}</span>
          <span>{date}</span>
          <span>{talk.registrationCount} / {talk.capacity} people registered</span>
        </div>

        {onClick && (
          <p className={`text-xs font-medium mt-1 transition-colors ${isSelected ? 'text-orange-500' : 'text-gray-400'}`}>
            {isSelected ? '✓ Selected — scroll down to register' : 'Click to register'}
          </p>
        )}
      </CardContent>
    </Card>
  )
}