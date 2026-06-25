// 'use client'

// import { useQuery } from '@tanstack/react-query'
// import { useState } from 'react'
// import { fetchTalks } from '@/lib/mock-data'
// import { TalkTopic } from '@/types'
// import TalkCard from '@/components/TalkCard'
// import { Skeleton } from '@/components/ui/skeleton'
// import RegisterForm from '@/components/RegisterForm'

// const topics: TalkTopic[] = ['Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']

// export default function Home() {
//   const [selected, setSelected] = useState<TalkTopic | null>(null)

//   const { isPending, isError, error, data: talks = [] } = useQuery({
//     queryKey: ['talks'],
//     queryFn: fetchTalks,
//   })

//   const filtered = selected ? talks.filter((t) => t.topic === selected) : talks
  
// if (isPending) {
//     return (
//       <main className="max-w-6xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <Skeleton className="h-64 w-full rounded-xl" />
//           <Skeleton className="h-64 w-full rounded-xl" />
//           <Skeleton className="h-64 w-full rounded-xl" />
//         </div>
//       </main>
//     )
//   }

//   if (isError) {
//     return (
//       <main className="max-w-6xl mx-auto px-4 py-8">
//         <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg">
//           {error.message}
//         </div>
//       </main>
//     )
//   }



//   return (
//     <main className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">TechTalks 2026</h1>

//       <div className="flex flex-wrap gap-2 mb-6">
//         <button
//           onClick={() => setSelected(null)}
//           className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
//             ${!selected ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
//         >
//           All Tech Topics
//         </button>
//         {topics.map((topic) => (
//           <button
//             key={topic}
//             onClick={() => setSelected(topic)}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
//               ${selected === topic ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
//           >
//             {topic}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filtered.map((talk) => (
//           <TalkCard key={talk.id} talk={talk} />
//         ))}
//       </div>
//        <div className="mt-10">
//         <RegisterForm talkId={1} title="Tech Talks 2026" registrationCount={47}
//   capacity={60} />
//       </div>
//     </main>
//   )
// }

'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTalks } from '@/lib/mock-data'
import { Talk, TalkTopic } from '@/types'
import TalkCard from '@/components/TalkCard'
import { Skeleton } from '@/components/ui/skeleton'
import RegisterForm from '@/components/RegisterForm'

const topics: TalkTopic[] = ['Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']

export default function Home() {
  const [topicFilter, setTopicFilter] = useState<TalkTopic | null>(null)
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null)

  const { isPending, isError, error, data: talks = [] } = useQuery({
    queryKey: ['talks'],
    queryFn: fetchTalks,
  })

  const filtered = topicFilter ? talks.filter((t) => t.topic === topicFilter) : talks

  if (isPending) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg">
          {error.message}
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TechTalks 2026</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setTopicFilter(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
            ${!topicFilter ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
        >
          All Tech Topics
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setTopicFilter(topic)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
              ${topicFilter === topic ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((talk) => (
          <TalkCard
            key={talk.id}
            talk={talk}
            isSelected={selectedTalk?.id === talk.id}
            onClick={() => setSelectedTalk(selectedTalk?.id === talk.id ? null : talk)}
          />
        ))}
      </div>

      {selectedTalk && (
        <div className="mt-10">
          <div className="flex items-center justify-between max-w-md mb-3">
            <p className="text-sm text-muted-foreground">
              Registering for: <span className="font-medium text-black">{selectedTalk.title}</span>
            </p>
            <button
              onClick={() => setSelectedTalk(null)}
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              ✕ Close
            </button>
          </div>
          <RegisterForm
            talkId={selectedTalk.id}
            title={selectedTalk.title}
            registrationCount={selectedTalk.registrationCount}
            capacity={selectedTalk.capacity}
          />
        </div>
      )}
    </main>
  )
}