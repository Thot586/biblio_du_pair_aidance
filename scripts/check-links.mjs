// Vérifie que les liens externes du contenu répondent encore.
// Certains sites refusent les robots : un code 403 ou 202 ne prouve pas que le lien est mort.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36';
const LINK = /https?:\/\/[^\s'"`)\]<>]+/g;
const IGNORED = /exemple\.fr|a\.fr|exemple\.com|\.test\.|api\.crossref\.org|\/recherche\?|\/search|\/resultats|\/scholar\?|\?term=|user_query|TRM=|login\?url/;

function files(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(ts|tsx)$/.test(name) && !name.includes('.test.') ? [path] : [];
  });
}

const links = [...new Set(files(ROOT).flatMap((file) => readFileSync(file, 'utf8').match(LINK) ?? []))]
  .map((link) => link.replace(/[.,;]$/, ''))
  .filter((link) => !IGNORED.test(link));

async function check(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*' },
      signal: AbortSignal.timeout(20000),
    });
    return response.status;
  } catch {
    return 'injoignable';
  }
}

const results = await Promise.all(links.map(async (url) => ({ url, status: await check(url) })));
const dead = results.filter(({ status }) => status === 404 || status === 410 || status === 'injoignable');
const blocked = results.filter(({ status }) => [202, 403, 405, 429, 503].includes(status));

console.log(`${results.length} liens vérifiés, ${dead.length} morts, ${blocked.length} à vérifier à la main.`);
for (const { url, status } of dead) console.log(`MORT      ${status}  ${url}`);
for (const { url, status } of blocked) console.log(`À VÉRIFIER ${status}  ${url}`);
process.exitCode = dead.length > 0 ? 1 : 0;
