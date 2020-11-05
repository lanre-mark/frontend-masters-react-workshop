import { createMachine, assign } from 'xstate';

// Parameterize the assign actions here:
// const tick = assign({
//   elapsed: (context) => context.elapsed + context.interval
// });
// const addMinute = assign({
//   duration: (context) => context.duration + 60,
// });
// const reset = assign({
//   duration: 60,
//   elapsed: 0,
// })

// const tick = () => {}
// const addMinute = () => {}
// const reset = () => {}

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      // Parameterize this action:
      entry: 'reset',
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        // On the TICK event, the context.elapsed should be incremented by context.interval
        // ...
        TICK: {
          actions: 'tick'
        },
        TOGGLE: 'paused',
        ADD_MINUTE: {
          // Parameterize this action:
          actions: 'addMinute'
        },
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  },
}, {
  actions: {
    addMinute: () => {},
    tick: () => {},
    reset: () => {} 
  }
});
