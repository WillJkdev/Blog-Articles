// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// import { glob } from 'astro/loaders';
// 2. Define your collection(s)
const blog = defineCollection({
  // loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    categories: z.array(z.string()).optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = { blog };
