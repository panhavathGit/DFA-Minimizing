// export default DFAMinimizer;
import React from 'react';
import DFADisplay from './DFADisplay';
import { generateDfaDotString } from '../utils/graphviz';
import { Graphviz } from 'graphviz-react';

const minimizeDFA = (dfa) => {
  const { states, alphabet, transitions, startState, finalStates } = dfa;

  // Step 1: Partition states into final and non-final states
  let P = [new Set(finalStates), new Set(states.filter(s =>!finalStates.includes(s)))];
  let W = [new Set(finalStates)];

  // Helper function to check if two sets are equal
  const setsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
  
  // Step 2: Refinement process
  while (W.length > 0) {
    const A = W.pop();
    for (let symbol of alphabet) {
      const X = new Set();
      for (let { from, symbol: sym, to } of transitions) {
        if (sym === symbol && A.has(to)) {
          X.add(from);
        }
      }

      for (let Y of P.slice()) {
        const intersection = new Set([...Y].filter(x => X.has(x)));
        const difference = new Set([...Y].filter(x =>!X.has(x)));

        if (intersection.size > 0 && difference.size > 0) {
          P = P.filter(s =>!setsEqual(s, Y));
          P.push(intersection, difference);

          if (W.some(set => setsEqual(set, Y))) {
            W = W.filter(set =>!setsEqual(set, Y));
            W.push(intersection, difference);
          } else {
            if (intersection.size <= difference.size) {
              W.push(intersection);
            } else {
              W.push(difference);
            }
          }
        }
      }
    }
  }

  // Step 3: Build new DFA from the partitioned sets
  // const stateMap = new Map();
  // P.forEach((set, i) => set.forEach(s => stateMap.set(s, `q${i}`)));

  // const newStates = P.map((_, i) => `q${i}`);
  // // const newStartState = stateMap.get(startState);
  // const newStartState = `q${Array.from(stateMap.values()).indexOf(stateMap.get(startState))}`;

  // Collect new final states ensuring no duplicates
  let newFinalStates = [...new Set(P.flatMap((set, i) => set.has(startState)? [i] : []))];
  newFinalStates = newFinalStates.map(i => `q${i}`);
////test
  const stateMap = new Map();
  P.forEach((set, i) => set.forEach(s => stateMap.set(s, `q${i}`)));

  const newStates = P.map((_, i) => `q${i}`);

  // Find the index of the partition containing the original start state
  const startStateIndex = Array.from(stateMap.values()).indexOf(stateMap.get(startState));

  // Use the index to construct the new start state name
  const newStartState = `q${startStateIndex}`;
///////test end 
  const newTransitionsSet = new Set();

  P.forEach((set, i) => {
    set.forEach(s => {
      alphabet.forEach(symbol => {
        const transition = transitions.find(t => t.from === s && t.symbol === symbol);
        if (transition) {
          const newFrom = stateMap.get(s);
          const newTo = stateMap.get(transition.to);
          if (newFrom && newTo) {
            newTransitionsSet.add(`${newFrom},${symbol},${newTo}`);
          }
        }
      });
    });
  });

  const newTransitions = Array.from(newTransitionsSet).map(t => {
    const [from, symbol, to] = t.split(',');
    return { from, symbol, to };
  });

  return {
    states: newStates,
    alphabet,
    transitions: newTransitions,
    startState: newStartState,
    finalStates: newFinalStates
  };
};

const DFAMinimizer = ({ dfa }) => {
  if (!dfa) return null;

  const minimizedDFA = minimizeDFA(dfa);
  const dotString = generateDfaDotString(minimizedDFA);

  return (
    <div>
      {/* <h1>After Minimized</h1> */}
      <DFADisplay dfaPropDisplay={minimizedDFA} />
      {/* <Graphviz dot={dotString} /> */}
    </div>
  );
};

export default DFAMinimizer;