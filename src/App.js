import React, { useEffect, useState } from 'react';
import './App.css';
// import pyodideloader from "./pyodide";
import Dashboard from "./components/Dashboard";
import service from "./services";

function App() {
  // const [pyodide, setPyodide] = useState();

  // useEffect(() => {
  //   pyodideloader().then((p) => {
  //     setPyodide(p);
  //   }).catch((e) => {
  //     console.log("OH NO");
  //   });
  // });

  return (
    <div className="App">
      <header className="App-header">
          <Dashboard service={service} />
      </header>
    </div>
  );
}

export default App;
