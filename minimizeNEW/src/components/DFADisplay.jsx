import React from 'react';
import { Graphviz } from 'graphviz-react';
import { generateDfaDotString } from '../utils/graphviz';

const DFADisplay = ({ dfaPropDisplay }) => {
  if (!dfaPropDisplay) return null;

  const { states, alphabet, transitions, startState, finalStates } = dfaPropDisplay;

  // Generate dot string for Graphviz
  const dotString = generateDfaDotString(dfaPropDisplay);

  // Inline CSS styles (if needed)
  const styles = {
    transitionTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    tableCell: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'center',
    },
    stateOutput: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    graph: {
      backgroundColor: '#fff',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
    },
  };

  // Create a table structure for transitions
  const transitionTable = (
    <table style={styles.transitionTable}>
      <thead>
        <tr>
          <th>State</th>
          {alphabet.map((symbol, index) => (
            <th key={index} style={styles.tableCell}>{symbol}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {states.map((state, rowIndex) => (
          <tr key={rowIndex}>
            <td style={styles.tableCell}>{state}</td>
            {alphabet.map((symbol, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`} style={styles.tableCell}>
                {transitions.find(t => t.from === state && t.symbol === symbol)?.to || '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="result">
      <div className="State-Output">
        <h3>DFA Details</h3>
        <p>
          <strong>States:</strong> {states.join(', ')}
        </p>
        <p>
          <strong>Alphabet:</strong> {alphabet.join(', ')}
        </p>
        <p>
          <strong>Start State:</strong> {startState}
        </p>
        <p>
          <strong>Final States:</strong> {finalStates.join(', ')}
        </p>
        {transitionTable}
      </div>

      <div className="graph">
        <Graphviz dot={dotString} />
      </div>
    </div>
  );
};

export default DFADisplay;



