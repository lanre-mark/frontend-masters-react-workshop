import * as React from 'react';
import { useEffect } from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMachine } from '@xstate/react';
import { ProgressCircle } from '../ProgressCircle';

import { timerMachine } from './timerMachine';
import { assign } from 'xstate';

const tick = assign({
  elapsed: (context) => context.elapsed + context.interval
});
const addMinute = assign({
  duration: (context) => context.duration + 60,
});
const reset = assign({
  duration: 60,
  elapsed: 0,
})

export const Timer = () => {
  const [state, send] = useMachine(timerMachine, { actions: {tick, addMinute, reset} });

  const { duration, elapsed, interval } = state.context;

  // Add a useEffect(...) here to send a TICK event on every `interval`
  // ...
  useEffect(() => {
    const intervalId = setInterval(() => {
      send('TICK');
    }, interval * 1000);

    return () => clearInterval(intervalId);
  }, [state.value]);

  return (
    <div
      className="timer"
      data-state={state.value}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 03</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.value}</div>
        <div className="elapsed" onClick={() => send({ type: 'TOGGLE' })}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {state.value !== 'running' && (
            <button onClick={() => send('RESET')}>Reset</button>
          )}

          {state.value === 'running' && (
            <button onClick={() => send('ADD_MINUTE')}>+ 1:00</button>
          )}
        </div>
      </div>
      <div className="actions">
        {state.value === 'running' && (
          <button onClick={() => send({ type: 'TOGGLE' })} title="Pause timer">
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}

        {(state.value === 'paused' || state.value === 'idle') && (
          <button onClick={() => send({ type: 'TOGGLE' })} title="Start timer">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};
