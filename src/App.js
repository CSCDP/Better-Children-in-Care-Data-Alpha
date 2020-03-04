import React, { useEffect, useState } from 'react';
import './App.css';
import './Dashboard';
import pyodideloader from "./pyodide";
import Dashboard from "./Dashboard";



window.registerPyodide = (pyodide) => {

}


function App() {
  const [pyodide, setPyodide] = useState();

  useEffect(() => {
    pyodideloader().then((p) => {
      setPyodide(p);
    }).catch((e) => {
      console.log("OH NO");
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        { pyodide && (
            <>
              <Dashboard pyodide={pyodide} />

            </>
        )}
        { !pyodide && (
            <div>Loading Python...</div>
        )}
      </header>
    </div>
  );
}

export default App;
