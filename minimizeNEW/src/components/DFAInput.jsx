import React, { useState } from 'react';

const DFAInput = ({ onubmit }) => {
  const [states, setStates] = useState('');
  const [alphabet, setAlphabet] = useState('');
  const [transitions, setTransitions] = useState('');
  const [startState, setStartState] = useState('');
  const [finalStates, setFinalStates] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const dfa = {
      states: states.split(',').map(s => s.trim()),
      alphabet: alphabet.split(',').map(s => s.trim()),
      transitions: transitions.split('\n').map((transition) => {
        const [from, symbol, to] = transition.split(',').map(s => s.trim());
        return { from, symbol, to };
      }),
      startState: startState.trim(),
      finalStates: finalStates.split(',').map(s => s.trim())
    };
    onubmit(dfa);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.info}>
        <label style={styles.label}>
          States (comma-separated):
          <input
            type="text"
            value={states}
            onChange={(e) => setStates(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Alphabet (comma-separated):
          <input
            type="text"
            value={alphabet}
            onChange={(e) => setAlphabet(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Transitions (one per line, format: from,symbol,to):
          <textarea
            value={transitions}
            onChange={(e) => setTransitions(e.target.value)}
            style={styles.textarea}
          />
        </label>
        <br />
        <label style={styles.label}>
          Start State:
          <input
            type="text"
            value={startState}
            onChange={(e) => setStartState(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Final States (comma-separated):
          <input
            type="text"
            value={finalStates}
            onChange={(e) => setFinalStates(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
      </div>
      <button type="submit" style={styles.button}>Submit DFA</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  info: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #14db64',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default DFAInput;
