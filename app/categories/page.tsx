import Link from 'next/link'
import { getCategories, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Categories | My Online Store Blog',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Categories</h1>
        <p className="text-lg text-gray-600">Browse posts by category</p>
      </div>
      {categories.length === 0 ? (
        <p className="text-center text-gray-600 py-12">No categories available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const name = getMetafieldValue(category.metadata?.name) || category.title
            const description = getMetafieldValue(category.metadata?.description)

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-gradient-to-br from-blue-50 via-white to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {name}
                </h2>
                {description && <p className="text-sm text-gray-600 line-clamp-3">{description}</p>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}