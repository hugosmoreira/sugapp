/**
 * SUG Grappling — Articles Service (placeholder)
 *
 * Public API stubs that mirror the Events service shape so screens
 * can be wired in once the Articles table contract is finalized.
 */
import type { ArticleDetail, NewsArticle } from '../types/types';

export async function listArticles(): Promise<NewsArticle[]> {
  return [];
}

export async function getArticleById(
  _id: string,
): Promise<ArticleDetail | null> {
  return null;
}
