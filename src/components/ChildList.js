import React from 'react';
import '../App.css';


function ChildList({data, onSelect}) {
    const onClick = e => {
        onSelect(e.target.id);
    }
  // function selectChild(idx) {
  //   let cid = headerData.CHILD[idx];
  //   setChildId(cid);
  //   setHeaderRecordId(idx);
  // }

  // const items = Object.entries(headerData.CHILD).map(([key, value]) => {
  //   return (
  //     <div className={headerData._Errors[key]? "ChildErrors" : "NoChildErrors"} onClick={() => selectChild(key)}>{headerData.CHILD[key]}</div>
  //   );
  // })
  return (
      <div className="childList">
          {data.Headers.map(child => (
              <div key={child.CHILD} onClick={onClick} id={child.CHILD}>{child.CHILD}</div>
          ))}
      </div>
  );
}

export default ChildList;
