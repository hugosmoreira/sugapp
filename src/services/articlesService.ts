/**
 * SUG Grappling — Articles Service
 *
 * Reads articles from the public.articles Supabase table and maps rows
 * permissively into the UI types. Uses `select('*')` because the exact
 * schema is admin-driven; missing columns are tolerated.
 *
 * Errors are surfaced verbatim. No mock fallback inside the service.
 */
import { supabase } from '../lib/supabase';
import type { ArticleRow } from '../types/database';
import type {
  ArticleDetail,
  ArticleSection,
  AuthorInfo,
  NewsArticle,
} from '../types/types';

// ─── Helpers ─────────────────────────────────────────────────

function pickString(...values: Array<string | null | undefined>): string | undefined {
  for (const v of values) {
    if (typeof v === 'string' && v.trim().length > 0) return v;
  }
  return undefined;
}

function logError(scope: string, error: unknown) {
  console.error(`[articles] ${scope}`, error);
}

// ─── Row → UI mappers ────────────────────────────────────────

export function mapRowToNewsArticle(row: ArticleRow): NewsArticle {
  const image = pickString(row.hero_image_url, row.image_url) ?? '';
  const publishedAt =
    pickString(row.published_at, row.created_at, row.updated_at) ??
    new Date().toISOString();

  return {
    id: row.id,
    title: pickString(row.title) ?? 'Untitled Article',
    category: pickString(row.category) ?? 'News',
    image,
    publishedAt,
    summary: pickString(row.summary) ?? undefined,
    date: publishedAt,
    featured: Boolean(row.featured),
  };
}

export function mapRowToArticleDetail(row: ArticleRow): ArticleDetail {
  const heroImage = pickString(row.hero_image_url, row.image_url) ?? '';
  const author: AuthorInfo = {
    name: pickString(row.author_name) ?? '',
    role: pickString(row.author_role) ?? '',
    avatar: pickString(row.author_avatar_url) ?? '',
  };

  const sections: ArticleSection[] = [];
  const content = pickString(row.content);
  if (content) {
    for (const paragraph of content.split(/\n{2,}/)) {
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
    heroImage,
    author,
    date:
      pickString(row.published_at, row.created_at, row.updated_at) ??
      new Date().toISOString(),
    readTime: pickString(row.read_time) ?? '',
    sections,
    tags: Array.isArray(row.tags) ? row.tags : [],
  };
}

// ─── Public API ──────────────────────────────────────────────

export async function listArticles(): Promise<NewsArticle[]> {
  const { data, error } = await supabase.from('articles').select('*');

  if (error) {
    logError('listArticles', error);
    throw new Error(error.message);
  }
  console.info('[articles] listArticles rows=', data?.length ?? 0);
  return (data ?? []).map((row) => mapRowToNewsArticle(row as ArticleRow));
}

export async function getArticleById(
  id: string,
): Promise<ArticleDetail | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    logError('getArticleById', error);
    throw new Error(error.message);
  }
  console.info('[articles] getArticleById id=', id, 'found=', Boolean(data));
  return data ? mapRowToArticleDetail(data as ArticleRow) : null;
}
