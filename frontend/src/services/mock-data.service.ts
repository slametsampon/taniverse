// frontend/src/services/mock-data.service.ts

/**
 * Generic function to fetch mock JSON data from /assets/mock/
 * @param filename - Name of the mock file, e.g. "event.json"
 * @returns Parsed JSON as type T
 */
export async function fetchMockData<T>(filename: string): Promise<T> {
  const path = `/assets/mock/${filename}`;
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error(`Failed to fetch mock data from ${path}`);
  }

  return await res.json();
}
