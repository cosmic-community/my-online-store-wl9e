export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg font-semibold text-white mb-2">🛍️ My Online Store</p>
        <p className="text-sm">© {new Date().getFullYear()} My Online Store. All rights reserved.</p>
      </div>
    </footer>
  )
}