import { getCollection } from 'astro:content';
export async function getAllCategories() {
  const posts = await getCollection('blog');
  return Array.from(
    new Set(
      posts
        .map((post) => post.data.categories || [])
        .flat()
        .sort()
    )
  );
}

// Función para normalizar categorías
export function normalizeCategory(category: string | undefined) {
  return category?.trim().toLowerCase().replace(/\s+/g, '_'); // Convierte a minúsculas y reemplaza espacios por "_"
}
