import React from 'react';
import logo from './logo.svg';
import './App.css';
import runTest, { runTestReject } from "./test";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <div>Click link to execute requests in test function:</div>
        <div
          className="App-link"
          onClick={runTest}
          style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              marginBottom: "16px"
          }}
        >
          Batch Request Files
            <span style={{paddingLeft: "8px", fontSize: "1rem"}}>
                [ test ]
            </span>
        </div>
          <div>Requesting only missing id:</div>

          <div
              className="App-link"
              onClick={runTestReject}
              style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
              }}
          >
              Single Request
              <span style={{paddingLeft: "8px", fontSize: "1rem"}}>
                [ fileid3 ]
            </span>
          </div>
      </header>
    </div>
  );
}

export default App;
