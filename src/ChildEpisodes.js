import React, { useEffect, useState } from 'react';
import './App.css';


function ChildEpisodes({episodeData, childId}) {

  /* I know, this is horrible, I should be passing only the records I need
  and this should have been filtered out before.  Fix later */

  var episodes = [];
  for (var key in episodeData.CHILD) {
    if (episodeData.CHILD[key] == childId) {
        console.log("Found Episode for Child:")
        console.log(episodeData);
        episodes.push(
          <table>
            <>
            <tbody>
            <tr>
              <th>DCOM:</th><td>{episodeData.DECOM[key]}</td>
              <th>RNE:</th><td>{episodeData.RNE[key]}</td>
            </tr><tr>
              <th>LS:</th><td>{episodeData.LS[key]}</td>
              <th>CIN:</th><td>{episodeData.CIN[key]}</td>
            </tr><tr>
              <th>PLACE:</th><td>{episodeData.PLACE[key]}</td>
              <th>PLACE_PROVIDER:</th><td>{episodeData.PLACE_PROVIDER[key]}</td>
            </tr><tr>
              <th>DEC:</th><td>{episodeData.DEC[key]}</td>
              <th>REC:</th><td>{episodeData.REC[key]}</td>
            </tr><tr>
              <th>REASON_PLACE_CHANGE:</th><td>{episodeData.REASON_PLACE_CHANGE[key]}</td>
              <th>URN:</th><td>{episodeData.URN[key]}</td>
            </tr><tr>
              <th>HOME_POST:</th><td>{episodeData.HOME_POST[key]}</td>
              <th>PL_POST:</th><td>{episodeData.PL_POST[key]}</td>
            </tr>
            </tbody>
            </>
          </table>
        )
    }
  }

  return (
      <div className="childEpisodes">
        <div className="sectionTitle">Child's Episodes</div>
        <div className="episodeList">
          {episodes}
        </div>
      </div>
  );
}

export default ChildEpisodes;
