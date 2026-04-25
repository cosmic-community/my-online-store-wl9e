// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 mb-12 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{name}</h1>
        {description && <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">{description}</p>}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Posts in {name}
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-600 py-8">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/categories" className="text-blue-600 hover:text-blue-700 font-semibold">
          ← Back to all categories
        </Link>
      </div>
    </div>
  )
}