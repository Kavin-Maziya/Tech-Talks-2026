import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Talk Not Found</h1>
      <p className="text-muted-foreground">The Tech Talk you selected doesn't exist or it's past schedule.</p>
      <Link href="/talks" className="text-blue-600 hover:underline">← Back to All Tech Talks</Link>
    </main>
  )
}