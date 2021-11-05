import React from 'react';
import logo from './logo.svg';
import './App.css';
import runTest from "./test";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div
          className="App-link"
          onClick={runTest}
          style={{
              cursor: 'pointer',
              textDecoration: 'underline'
          }}
        >
          Batch Request Files - test.ts
        </div>
      </header>
    </div>
  );
}

export default App;
