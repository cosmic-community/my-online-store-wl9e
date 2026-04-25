import Link from 'next/link'
import { getAuthors } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Authors | My Online Store Blog',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Authors</h1>
        <p className="text-lg text-gray-600">Meet the writers behind our blog</p>
      </div>
      {authors.length === 0 ? (
        <p className="text-center text-gray-600 py-12">No authors available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => {
            const name = getMetafieldValue(author.metadata?.name) || author.title
            const bio = getMetafieldValue(author.metadata?.bio)
            const avatar = author.metadata?.avatar

            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group text-center"
              >
                {avatar && (
                  <img
                    src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                    alt={name}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all"
                  />
                )}
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {name}
                </h2>
                {bio && <p className="text-sm text-gray-600 line-clamp-3">{bio}</p>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}