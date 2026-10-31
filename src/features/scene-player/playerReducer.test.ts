import { INITIAL_PLAYER_STATE, playerReducer, type PlayerState } from './playerReducer';

const durations = [1000, 2000, 1000] as const;
const reduce = (state: PlayerState, action: Parameters<typeof playerReducer>[1]) =>
  playerReducer(state, action, durations);

describe('playerReducer', () => {
  it('démarre à l’arrêt, sans lecture automatique', () => {
    expect(INITIAL_PLAYER_STATE.status).toBe('idle');
    expect(reduce(INITIAL_PLAYER_STATE, { type: 'tick', deltaMs: 500 })).toEqual(
      INITIAL_PLAYER_STATE,
    );
  });

  it('passe seul à l’étape suivante pendant la lecture', () => {
    const playing = reduce(INITIAL_PLAYER_STATE, { type: 'toggle' });
    const after = reduce(playing, { type: 'tick', deltaMs: 1000 });
    expect(after.step).toBe(1);
    expect(after.elapsedMs).toBe(0);
    expect(after.status).toBe('playing');
  });

  it('se termine sur la dernière étape, puis Revoir repart du début', () => {
    const atEnd: PlayerState = { ...INITIAL_PLAYER_STATE, step: 2, status: 'playing' };
    const ended = reduce(atEnd, { type: 'tick', deltaMs: 1000 });
    expect(ended.status).toBe('ended');
    expect(ended.step).toBe(2);

    const restarted = reduce(ended, { type: 'toggle' });
    expect(restarted).toMatchObject({ step: 0, elapsedMs: 0, status: 'playing' });
  });

  it('s’arrête après une seule étape quand on clique sur Suivant', () => {
    const stepped = reduce(INITIAL_PLAYER_STATE, { type: 'next' });
    expect(stepped).toMatchObject({ step: 1, status: 'stepping' });

    const finished = reduce(stepped, { type: 'tick', deltaMs: 2000 });
    expect(finished).toMatchObject({ step: 1, elapsedMs: 2000, status: 'idle' });
  });

  it('applique la vitesse choisie', () => {
    const fast = reduce(
      { ...INITIAL_PLAYER_STATE, status: 'playing', speed: 1.5 },
      { type: 'tick', deltaMs: 100 },
    );
    expect(fast.elapsedMs).toBe(150);
  });

  it('attend la fin de la voix avant de changer d’étape', () => {
    const held: PlayerState = { ...INITIAL_PLAYER_STATE, status: 'playing', held: true };
    const waiting = reduce(held, { type: 'tick', deltaMs: 5000 });
    expect(waiting).toMatchObject({ step: 0, elapsedMs: 1000, status: 'playing' });

    const released = reduce(reduce(waiting, { type: 'setHeld', held: false }), {
      type: 'tick',
      deltaMs: 16,
    });
    expect(released.step).toBe(1);
  });

  it('ne dépasse jamais les bornes de l’animation', () => {
    expect(reduce(INITIAL_PLAYER_STATE, { type: 'previous' }).step).toBe(0);
    expect(reduce(INITIAL_PLAYER_STATE, { type: 'goTo', step: 99 }).step).toBe(2);
    const last = { ...INITIAL_PLAYER_STATE, step: 2 };
    expect(reduce(last, { type: 'next' }).step).toBe(2);
  });
});
