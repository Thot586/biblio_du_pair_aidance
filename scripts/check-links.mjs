// Vérifie que les liens externes du contenu répondent encore.
// Beaucoup de sites refusent les robots : seul un 404 ou un 410 prouve qu'un lien est mort.
// Les DOI sont vérifiés auprès de Crossref, car les éditeurs bloquent ce type de contrôle.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src';
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36';
const LINK = /https?:\/\/(?:[^\s'"`)\]<>(]|\([^\s)]*\))+/g;
const IGNORED =
  /\$\{|^https:\/\/adresse|exemple\.|^https:\/\/a\.fr|api\.crossref\.org|\/recherche\?|\/search|\/resultats|\/scholar\?|\?term=|user_query|TRM=|login\?url/;
const DOI_PREFIX = 'https://doi.org/';

function files(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(ts|tsx)$/.test(name) && !name.includes('.test.') ? [path] : [];
  });
}

const links = [
  ...new Set(files(ROOT).flatMap((file) => readFileSync(file, 'utf8').match(LINK) ?? [])),
]
  .map((link) => link.replace(/[.,;]$/, ''))
  .filter((link) => !IGNORED.test(link));

function requestUrl(url) {
  if (!url.startsWith(DOI_PREFIX)) return url;
  return `https://api.crossref.org/works/${encodeURIComponent(url.slice(DOI_PREFIX.length))}`;
}

async function check(url) {
  try {
    const response = await fetch(requestUrl(url), {
      redirect: 'follow',
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/json,*/*' },
      signal: AbortSignal.timeout(20000),
    });
    return response.status;
  } catch {
    return 'injoignable';
  }
}

const results = await Promise.all(links.map(async (url) => ({ url, status: await check(url) })));
const dead = results.filter(({ status }) => status === 404 || status === 410);
const uncertain = results.filter(({ status }) => status !== 200 && !dead.some((d) => d.status === status));

console.log(
  `${results.length} liens vérifiés : ${dead.length} morts, ${uncertain.length} à vérifier dans un navigateur.`,
);
for (const { url, status } of dead) console.log(`MORT        ${status}  ${url}`);
for (const { url, status } of uncertain) console.log(`À VÉRIFIER  ${status}  ${url}`);
process.exitCode = dead.length > 0 ? 1 : 0;
