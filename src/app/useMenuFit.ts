import { type RefObject, useLayoutEffect } from 'react';

/**
 * Le menu ne reste collé en haut de l'écran que s'il tient sur une seule rangée.
 * Selon la police et la taille du texte choisies, ses liens peuvent passer à la ligne : la barre
 * collée prendrait alors trop de place. On le note sur `<html>` (voir tokens.css et Header.module.css).
 */
export function useMenuFit(menu: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const element = menu.current;
    if (!element || typeof ResizeObserver === 'undefined') return undefined;

    const root = document.documentElement;
    const check = () => {
      const rows = new Set(Array.from(element.children, (link) => (link as HTMLElement).offsetTop));
      root.toggleAttribute('data-menu-wrapped', rows.size > 1);
    };

    const observer = new ResizeObserver(check);
    observer.observe(element);
    check();
    return () => {
      observer.disconnect();
      root.removeAttribute('data-menu-wrapped');
    };
  }, [menu]);
}
