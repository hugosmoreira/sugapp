/**
 * formatArticleDate — Renders an ISO timestamp as a readable date.
 * Returns '' when the input is missing or unparseable.
 */
export function formatArticleDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
