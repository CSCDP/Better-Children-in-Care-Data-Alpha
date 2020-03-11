import React, { useCallback, useState } from 'react';
import MyDropzone from "./MyDropzone";
// import ChildList from "./ChildList";
// import ChildHeader from "./ChildHeader";
// import ChildEpisodes from "./ChildEpisodes";


function Dashboard({service}) {
  const [data, setData] = useState({});

  const onFiles = useCallback((files) => {
    const data = service.loadFiles(files);
    setData(data);
  }, [service]);

  return (
        <div className="dashboard">
            {!data.test  && (
              <MyDropzone onFiles={onFiles}/>
            )}
            {/*{(headerData && episodeData)  && (*/}
            {/*  <div className="dataDisplay">*/}
            {/*    <ChildList*/}
            {/*      headerData={headerData}*/}
            {/*      setChildId={setChildId}*/}
            {/*      childId={childId}*/}
            {/*      setHeaderRecordId={setHeaderRecordId}*/}
            {/*      headerRecordId={headerRecordId}/>*/}
            {/*    <div className="childData">*/}
            {/*      <ChildHeader*/}
            {/*        headerData={headerData}*/}
            {/*        childId={childId}*/}
            {/*        headerRecordId={headerRecordId}/>*/}
            {/*      <ChildEpisodes*/}
            {/*        episodeData={episodeData}*/}
            {/*        childId={childId}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*)}*/}
        </div>
  );
}

export default Dashboard;
