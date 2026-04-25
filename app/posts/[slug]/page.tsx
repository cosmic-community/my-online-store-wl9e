// app/posts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories
  const content = getMetafieldValue(post.metadata?.content)
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
            >
              {getMetafieldValue(cat.metadata?.name) || cat.title}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        {title}
      </h1>

      {author && (
        <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 mb-8 group">
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={getMetafieldValue(author.metadata?.name) || author.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </Link>
      )}

      {featuredImage && (
        <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/posts" className="text-blue-600 hover:text-blue-700 font-semibold">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}