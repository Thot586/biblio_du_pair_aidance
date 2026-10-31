const VIEWPORT_MARGIN_PX = 16;
const GAP_PX = 6;

interface Size {
  width: number;
  height: number;
}

type WordBox = Pick<DOMRect, 'left' | 'top' | 'bottom'>;

/**
 * La bulle s’ouvre sous le mot, au-dessus s’il manque de la place.
 * Si aucun des deux côtés ne suffit, elle se cale en bas de l’écran pour que rien ne soit coupé.
 */
export function bubblePosition(word: WordBox, bubble: Size, viewport: Size) {
  const maxLeft = viewport.width - VIEWPORT_MARGIN_PX - bubble.width;
  const maxTop = viewport.height - VIEWPORT_MARGIN_PX - bubble.height;
  const below = word.bottom + GAP_PX;
  const above = word.top - GAP_PX - bubble.height;

  let top = maxTop;
  if (below <= maxTop) top = below;
  else if (above >= VIEWPORT_MARGIN_PX) top = above;

  return { left: Math.max(VIEWPORT_MARGIN_PX, Math.min(word.left, maxLeft)), top };
}
