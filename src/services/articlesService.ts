/**
 * SUG Grappling — Articles Service
 *
 * Reads articles from public.articles. Mobile only renders status='published'
 * rows. Errors and raw responses are logged temporarily so we can verify the
 * Supabase wiring while the admin schema is settling.
 */
import { supabase } from '../lib/supabase';
import type { ArticleRow } from '../types/database';
import type {
  ArticleDetail,
  ArticleSection,
  AuthorInfo,
  NewsArticle,
} from '../types/types';

const ARTICLE_COLUMNS =
  'id, title, category, excerpt, body, cover_image_url, author_name, author_role, author_avatar_url, published_at, featured, status, created_at, updated_at';

// ─── Helpers ─────────────────────────────────────────────────

function pickString(...values: Array<string | null | undefined>): string | undefined {
  for (const v of values) {
    if (typeof v === 'string' && v.trim().length > 0) return v;
  }
  return undefined;
}

// ─── Row → UI mappers ────────────────────────────────────────

export function mapRowToNewsArticle(row: ArticleRow): NewsArticle {
  const publishedAt =
    pickString(row.published_at, row.created_at, row.updated_at) ?? '';

  return {
    id: row.id,
    title: pickString(row.title) ?? 'Untitled Article',
    category: pickString(row.category) ?? 'News',
    image: pickString(row.cover_image_url) ?? '',
    publishedAt,
    excerpt: pickString(row.excerpt) ?? undefined,
    date: publishedAt,
    featured: Boolean(row.featured),
  };
}

export function mapRowToArticleDetail(row: ArticleRow): ArticleDetail {
  const author: AuthorInfo = {
    name: pickString(row.author_name) ?? '',
    role: pickString(row.author_role) ?? '',
    avatar: pickString(row.author_avatar_url) ?? '',
  };

  const sections: ArticleSection[] = [];
  const body = pickString(row.body);
  if (body) {
    for (const paragraph of body.split(/\n{2,}/)) {
      const trimmed = paragraph.trim();
      if (trimmed.length > 0) {
        sections.push({ type: 'paragraph', content: trimmed });
      }
    }
  }

  return {
    id: row.id,
    title: pickString(row.title) ?? 'Untitled Article',
    category: pickString(row.category) ?? 'News',
    heroImage: pickString(row.cover_image_url) ?? '',
    author,
    date:
      pickString(row.published_at, row.created_at, row.updated_at) ?? '',
    readTime: '',
    sections,
    tags: [],
  };
}

// ─── Public API ──────────────────────────────────────────────

export async function listArticles(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(ARTICLE_COLUMNS)
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return ((data ?? []) as ArticleRow[]).map(mapRowToNewsArticle);
}

/**
 * Returns up to 5 published articles ordered newest-first for the
 * Home screen "Latest News" rail.
 */
export async function listLatestArticles(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from('articles')
    .select(ARTICLE_COLUMNS)
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }
  return ((data ?? []) as ArticleRow[]).map(mapRowToNewsArticle);
}

export async function getArticleById(
  id: string,
): Promise<ArticleDetail | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(ARTICLE_COLUMNS)
    .eq('id', id)
    .maybeSingle();

  console.log('[articles raw]', data);
  console.log('[articles error]', error);

  if (error) {
    throw new Error(error.message);
  }
  return data ? mapRowToArticleDetail(data as ArticleRow) : null;
}
