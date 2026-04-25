// app/authors/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 text-center">
        {avatar && (
          <img
            src={`${avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
            alt={name}
            width={150}
            height={150}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-6 ring-4 ring-blue-50"
          />
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{name}</h1>
        {bio && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{bio}</p>}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Posts by {name}
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-600 py-8">No posts by this author yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/authors" className="text-blue-600 hover:text-blue-700 font-semibold">
          ← Back to all authors
        </Link>
      </div>
    </div>
  )
}