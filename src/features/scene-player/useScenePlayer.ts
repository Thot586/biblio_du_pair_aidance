import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { usePrefersReducedMotion } from '@/features/preferences/usePrefersReducedMotion';
import { INITIAL_PLAYER_STATE, playerReducer, type PlayerAction } from './playerReducer';
import type { SceneFrame, SceneStep } from './types';

export function useScenePlayer(steps: readonly SceneStep[]) {
  const durations = useMemo(() => steps.map((step) => step.durationMs), [steps]);
  const reducer = useCallback(
    (state: typeof INITIAL_PLAYER_STATE, action: PlayerAction) =>
      playerReducer(state, action, durations),
    [durations],
  );
  const [state, dispatch] = useReducer(reducer, INITIAL_PLAYER_STATE);
  const reducedMotion = usePrefersReducedMotion();
  const lastTimestamp = useRef<number | null>(null);

  const isRunning = state.status === 'playing' || state.status === 'stepping';

  useEffect(() => {
    if (!isRunning) {
      lastTimestamp.current = null;
      return undefined;
    }
    let frameId = 0;
    const onFrame = (timestamp: number) => {
      const previous = lastTimestamp.current ?? timestamp;
      lastTimestamp.current = timestamp;
      dispatch({ type: 'tick', deltaMs: timestamp - previous });
      frameId = requestAnimationFrame(onFrame);
    };
    frameId = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  const duration = durations[state.step] ?? 1;
  const hasStarted = isRunning || state.elapsedMs > 0;
  const frame: SceneFrame = {
    step: state.step,
    // Avant la lecture, et si les mouvements sont réduits, l'image de l'étape est déjà complète.
    progress: reducedMotion || !hasStarted ? 1 : Math.min(1, state.elapsedMs / duration),
  };

  return { state, frame, dispatch, isRunning };
}
