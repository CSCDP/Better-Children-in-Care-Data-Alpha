import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import Service from "./services";

const serviceContainer = new Service();

function App() {
  const [service, setService] = useState(undefined);

  // useEffect(() => {
  //   pyodideloader().then((p) => {
  //     setPyodide(p);
  //   }).catch((e) => {
  //     console.log("OH NO");
  //   });
  // });

    useEffect( () => {
        const loadService = async () => {
            await serviceContainer.onReady();
            setService(serviceContainer);
        }
        loadService();
    });



  return (
    <div className="App">
      <header className="App-header">
          { service && (
            <Dashboard service={service} />
          )}
          { !service && (
              <h1>Loading python</h1>
          )}
      </header>
    </div>
  );
}

export default App;
