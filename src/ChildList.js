import React, { useEffect, useState } from 'react';
import './App.css';


function ChildList({headerData, setChildId, childId, setHeaderRecordId, headerRecordId}) {
  console.log(headerData);

  function selectChild(idx) {
    let cid = headerData.CHILD[idx];
    setChildId(cid);
    setHeaderRecordId(idx);
  }

  const items = Object.entries(headerData.CHILD).map(([key, value]) => {
    return (
      <div className={headerData._Errors[key]? "ChildErrors" : "NoChildErrors"} onClick={() => selectChild(key)}>{headerData.CHILD[key]}</div>
    );
  })
  return (
      <div className="childList">
          {items}
      </div>
  );
}

export default ChildList;
