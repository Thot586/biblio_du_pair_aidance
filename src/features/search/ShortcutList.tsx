import { SHORTCUTS } from '@/content/shortcuts';
import { LinkRow, LinkRowList } from '@/shared/ui/LinkRow';

/** Les situations fréquentes : on se reconnaît dans une phrase, sans avoir à trouver le mot juste. */
export function ShortcutList() {
  return (
    <LinkRowList>
      {SHORTCUTS.map((shortcut) => (
        <li key={shortcut.to}>
          <LinkRow to={shortcut.to} title={shortcut.label} />
        </li>
      ))}
    </LinkRowList>
  );
}
