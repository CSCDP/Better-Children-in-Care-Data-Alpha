import React, { useCallback, useState } from 'react';
import MyDropzone from "./MyDropzone";
import ChildList from "./ChildList";
// import ChildHeader from "./ChildHeader";
// import ChildEpisodes from "./ChildEpisodes";


function Dashboard({service}) {
  const [data, setData] = useState({});
  const [childId, setChildId] = useState();

  const onFiles = useCallback(async files => {
    const result = await service.loadFiles(files);
    const newData = {...data, ...result}
    setData(newData);
  }, [service, data]);

  const onSelect = id => {
    setChildId(id);
  }

  console.log('DATA', data);

  return (
        <div className="dashboard">
            {!(data.Headers && data.Episodes)  && (
              <MyDropzone onFiles={onFiles}/>
            )}
            {(data.Headers && data.Episodes)  && (
                <>
                <h1>{childId}</h1>
              <div className="dataDisplay">
                <ChildList data={data} onSelect={onSelect} />
                {/*<div className="childData">*/}
                {/*  <ChildHeader*/}
                {/*    headerData={headerData}*/}
                {/*    childId={childId}*/}
                {/*    headerRecordId={headerRecordId}/>*/}
                {/*  <ChildEpisodes*/}
                {/*    episodeData={episodeData}*/}
                {/*    childId={childId}*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
                </>
            )}
        </div>
  );
}

export default Dashboard;
