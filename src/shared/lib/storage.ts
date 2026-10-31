/**
 * Accès au stockage du navigateur. Il peut être vide ou bloqué (navigation privée,
 * poste partagé) : le site doit alors fonctionner quand même.
 */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Stockage indisponible : la donnée vit seulement le temps de la page.
  }
}
