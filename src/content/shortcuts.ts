export interface Shortcut {
  label: string;
  to: string;
}

/** Les situations les plus fréquentes, écrites comme on se les dit à soi-même. */
export const SHORTCUTS: readonly Shortcut[] = [
  { label: 'Je n’ai pas encore de question de recherche', to: '/outils/atelier-question' },
  { label: 'Je ne sais pas où chercher', to: '/outils/quel-outil' },
  { label: 'J’ai trouvé une référence, je veux la mettre en APA', to: '/outils/generateur-apa' },
  {
    label: 'Une IA m’a donné une référence : existe-t-elle ?',
    to: '/outils/verifier-une-reference',
  },
  { label: 'Je ne sais pas quels mots taper', to: '/outils/mes-mots-de-recherche' },
  { label: 'Je dois déclarer mon usage de l’IA', to: '/outils/declaration-ia' },
];
