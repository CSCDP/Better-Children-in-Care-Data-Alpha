import React, { useEffect, useState } from 'react';
import './App.css';
import './MyDropzone';
import pyodideloader from "./pyodide";
import MyDropZone from "./MyDropzone";


function App() {

  return (

        <div className="Uploader">
          <>
            <MyDropzone pyodide={pyodide} />
          </>
        </div>
      </>
  );
}

export default App;
