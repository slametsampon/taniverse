// src/utils/format.ts

/**
 * Format tanggal ke dalam format Indonesia: dd-MM-yyyy
 */
export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return value.toString(); // fallback jika invalid

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
