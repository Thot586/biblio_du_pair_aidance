/**
 * Copie avec mise en forme : une référence APA perd ses italiques si elle est copiée
 * en texte brut. Word et Google Docs lisent la version HTML.
 */
export async function copyRichText(html: string, plainText: string): Promise<boolean> {
  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' }),
        }),
      ]);
      return true;
    }
  } catch {
    // On tente la copie en texte brut ci-dessous.
  }
  return copyPlainText(plainText);
}

export async function copyPlainText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
