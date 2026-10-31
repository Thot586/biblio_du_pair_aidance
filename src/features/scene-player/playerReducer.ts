export type PlayerStatus = 'idle' | 'playing' | 'stepping' | 'ended';

export interface PlayerState {
  step: number;
  elapsedMs: number;
  status: PlayerStatus;
  speed: number;
  /** Tant que la voix lit la légende, l'animation attend à la fin de l'étape. */
  held: boolean;
}

export type PlayerAction =
  | { type: 'toggle' }
  | { type: 'pause' }
  | { type: 'next' }
  | { type: 'previous' }
  | { type: 'goTo'; step: number }
  | { type: 'tick'; deltaMs: number }
  | { type: 'setSpeed'; speed: number }
  | { type: 'setHeld'; held: boolean };

export const INITIAL_PLAYER_STATE: PlayerState = {
  step: 0,
  elapsedMs: 0,
  status: 'idle',
  speed: 1,
  held: false,
};

export function playerReducer(
  state: PlayerState,
  action: PlayerAction,
  durations: readonly number[],
): PlayerState {
  const lastStep = durations.length - 1;

  switch (action.type) {
    case 'toggle':
      return toggle(state);
    case 'pause':
      return { ...state, status: isRunning(state) ? 'idle' : state.status };
    case 'next':
      return state.step < lastStep ? enterStep(state, state.step + 1) : state;
    case 'previous':
      return enterStep(state, Math.max(0, state.step - 1));
    case 'goTo':
      return enterStep(state, Math.min(lastStep, Math.max(0, action.step)));
    case 'setSpeed':
      return { ...state, speed: action.speed };
    case 'setHeld':
      return { ...state, held: action.held };
    case 'tick':
      return tick(state, action.deltaMs, durations);
  }
}

function isRunning(state: PlayerState): boolean {
  return state.status === 'playing' || state.status === 'stepping';
}

function toggle(state: PlayerState): PlayerState {
  if (isRunning(state)) return { ...state, status: 'idle' };
  if (state.status === 'ended') return { ...state, step: 0, elapsedMs: 0, status: 'playing' };
  return { ...state, status: 'playing' };
}

/** Un clic sur Suivant joue l'étape choisie, puis s'arrête pour laisser le temps de lire. */
function enterStep(state: PlayerState, step: number): PlayerState {
  return { ...state, step, elapsedMs: 0, status: 'stepping' };
}

function tick(state: PlayerState, deltaMs: number, durations: readonly number[]): PlayerState {
  if (!isRunning(state)) return state;

  const duration = durations[state.step] ?? 0;
  const elapsedMs = state.elapsedMs + deltaMs * state.speed;
  if (elapsedMs < duration) return { ...state, elapsedMs };
  if (state.held) return { ...state, elapsedMs: duration };
  if (state.status === 'stepping') return { ...state, elapsedMs: duration, status: 'idle' };

  const isLastStep = state.step >= durations.length - 1;
  return isLastStep
    ? { ...state, elapsedMs: duration, status: 'ended' }
    : { ...state, step: state.step + 1, elapsedMs: 0 };
}
