/**
 * Validates icon URLs by attempting to load them as images.
 * Returns the first URL that successfully loads, or null if none work.
 */
export async function findWorkingIconUrl(urls: string[]): Promise<string | null> {
  for (const url of urls) {
    const works = await testIconUrl(url);
    if (works) return url;
  }
  return null;
}

function testIconUrl(url: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
