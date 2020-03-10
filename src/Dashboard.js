import React, { useEffect, useState } from 'react';
import './App.css';
import './MyDropzone';
import pyodideloader from "./pyodide";
import MyDropzone from "./MyDropzone";


function App({pyodide}) {

  return (

        <div className="Uploader">
          <>
            <MyDropzone pyodide={pyodide} />
          </>
        </div>
  );
}

export default App;
