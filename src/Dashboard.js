import React, { useEffect, useState } from 'react';
import './App.css';
import pyodideloader from "./pyodide";
import './MyDropzone';
import MyDropzone from "./MyDropzone";
import './ChildList';
import ChildList from "./ChildList";
import './ChildHeader';
import ChildHeader from "./ChildHeader";
import './ChildEpisodes';
import ChildEpisodes from "./ChildEpisodes";


function Dashboard({pyodide}) {
  const [readFile, setReadFile] = useState(undefined);
  const [headerData, setHeaderData] = useState(undefined);
  const [episodeData, setEpisodeData] = useState(undefined);
  const [childId, setChildId] = useState(undefined);
  const [headerRecordId, setHeaderRecordId] = useState(undefined);

  return (
        <div className="dashboard">
          <>
            {(!headerData || !episodeData)  && (
              <MyDropzone
                pyodide={pyodide}
                setReadFile={setReadFile}
                readFile={readFile}
                setHeaderData={setHeaderData}
                headerData={headerData}
                setEpisodeData={setEpisodeData}
                episodeData={episodeData}
              />
            )}
            {(headerData && episodeData)  && (
              <div className="dataDisplay">
                <ChildList
                  headerData={headerData}
                  setChildId={setChildId}
                  childId={childId}
                  setHeaderRecordId={setHeaderRecordId}
                  headerRecordId={headerRecordId}/>
                <div className="childData">
                  <ChildHeader
                    headerData={headerData}
                    childId={childId}
                    headerRecordId={headerRecordId}/>
                  <ChildEpisodes
                    episodeData={episodeData}
                    childId={childId}
                  />
                </div>
              </div>
            )}
          </>
        </div>
  );
}

export default Dashboard;
