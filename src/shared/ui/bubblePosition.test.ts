import { bubblePosition } from './bubblePosition';

const phone = { width: 390, height: 844 };
const smallPhone = { width: 320, height: 568 };
const bubble = { width: 288, height: 250 };
const wordAt = (top: number, left = 100) => ({ left, top, bottom: top + 24 });

describe('bubblePosition', () => {
  it('ouvre la bulle sous le mot quand il reste de la place', () => {
    expect(bubblePosition(wordAt(100), bubble, phone).top).toBe(130);
  });

  it('l’ouvre au-dessus du mot quand elle serait coupée en bas', () => {
    expect(bubblePosition(wordAt(640), bubble, phone).top).toBe(384);
  });

  it('la cale en bas de l’écran quand aucun des deux côtés ne suffit', () => {
    const tallBubble = { width: 288, height: 323 };
    const { top } = bubblePosition(wordAt(280), tallBubble, smallPhone);

    expect(top).toBe(229);
    expect(top + tallBubble.height).toBeLessThanOrEqual(smallPhone.height);
  });

  it('ne passe pas sous la barre collée en haut de l’écran', () => {
    const word = wordAt(290);

    expect(bubblePosition(word, bubble, smallPhone).top).toBe(34);
    expect(bubblePosition(word, bubble, smallPhone, 40).top).toBe(302);
  });

  it('ne déborde pas à droite de l’écran', () => {
    expect(bubblePosition(wordAt(100, 300), bubble, phone).left).toBe(86);
  });

  it('garde une marge à gauche de l’écran', () => {
    expect(bubblePosition(wordAt(100, 4), bubble, phone).left).toBe(16);
  });
});
