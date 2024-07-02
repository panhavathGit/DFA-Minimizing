// src/utils/graphviz.js
export const generateDfaDotString = (dfa, size = "6.4", nodesep = 0.4, ranksep = 0.5) => {
  const { states, alphabet, transitions, startState, finalStates } = dfa;

  let dotString = 'digraph DFA {\n';
  dotString += '  rankdir=LR;\n';
  dotString += `  size="${size}";\n`;  // Adjust graph size
  dotString += '  ratio="compress";\n';  // Compress the graph
  dotString += `  nodesep=${nodesep};\n`;  // Decrease space between nodes
  dotString += `  ranksep=${ranksep};\n`;  // Decrease rank separation

  // Initial state marker (invisible)
  dotString += `  "" [shape=point];\n`;
  dotString += `  "" -> "${startState}";\n`;

  // States
  states.forEach(state => {
    if (finalStates.includes(state)) {
      // Final states with double circle
      dotString += `  "${state}" [shape=doublecircle, width=0.6, height=0.6, fontsize=10];\n`;
    } else {
      // Normal states with single circle
      dotString += `  "${state}" [shape=circle, width=0.6, height=0.6, fontsize=10];\n`;
    }
  });

  // Transitions
  transitions.forEach(({ from, symbol, to }) => {
    dotString += `  "${from}" -> "${to}" [label="${symbol}", fontsize=10];\n`;
  });

  dotString += '}\n';

  return dotString;
};

