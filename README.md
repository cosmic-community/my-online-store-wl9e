# My Online Store Blog

![App Preview](https://imgix.cosmicjs.com/4656d4c0-4090-11f1-8d30-073df91da89f-autopilot-photo-1551183053-bf91a1d81141-1777112382456.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive blog application for My Online Store, built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 📝 Dynamic blog posts with rich content and featured images
- 👤 Author profiles with bios and avatars
- 🏷️ Category-based content organization
- 🔍 Dynamic routing for individual posts, authors, and categories
- ⚡ Server-side rendering with Next.js 16 App Router
- 📱 Fully responsive mobile-first design
- 🎨 Beautiful UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69ec950f5437d81e2f17977b&clone_repository=69ec95c25437d81e2f1797a8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Cosmic SDK** - Content management
- **Bun** - Package manager and runtime

## Getting Started

### Prerequisites

- Bun installed on your system
- A Cosmic account and bucket

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)

4. Run the development server:
```bash
bun run dev
```

## Cosmic SDK Examples

### Fetching Posts
```typescript
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post
```typescript
const response = await cosmic.objects
  .findOne({ type: 'posts', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three content types:
- **Posts**: Blog articles with title, content, featured image, author, and categories
- **Authors**: Writer profiles with name, bio, and avatar
- **Categories**: Content classifications with name and description

## Deployment Options

Deploy to Vercel, Netlify, or any platform that supports Next.js. Set your environment variables in the platform's dashboard.

<!-- README_END -->