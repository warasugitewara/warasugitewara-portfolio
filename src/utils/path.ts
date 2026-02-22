/**
 * Get the data file URL with proper base path
 * @param fileName - File name relative to public/data/ (e.g., 'profile.json')
 * @returns Full URL including base path
 */
export const getDataUrl = (fileName: string): string => {
  const basePath = import.meta.env.BASE_URL || '/';
  return `${basePath}data/${fileName}`;
};
