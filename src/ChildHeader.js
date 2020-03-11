import React, { useEffect, useState } from 'react';
import './App.css';


function ChildHeader({headerData, childId, headerRecordId}) {
  const dob = headerData.DOB[headerRecordId];
  const sex = headerData.SEX[headerRecordId] == 1 ? "M": "F";
  const eth = headerData.ETHNIC[headerRecordId];

  return (
      <div className="childHeader">
        <table>
          <>
          <tbody>
          <tr>
            <th>CHILD:</th><td>{childId}</td>
            <th>DOB:</th><td>{dob}</td>
          </tr><tr>
            <th>SEX:</th><td>{sex}</td>
            <th>ETHNIC:</th><td>{eth}</td>
          </tr>
          </tbody>
          </>
        </table>
      </div>
  );
}

export default ChildHeader;
