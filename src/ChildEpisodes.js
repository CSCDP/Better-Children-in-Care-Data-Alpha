import React, { useEffect, useState } from 'react';
import './App.css';


function ChildEpisodes({episodeData, childId}) {

  /* I know, this is horrible, I should be passing only the records I need
  and this should have been filtered out before.  Fix later */
  var episodes = [];
  for (var key in episodeData.CHILD) {
    if (episodeData.CHILD[key] == childId) {
        console.log("Found Episode for Child:")
        console.log(episodeData.PLACE[key]);
        episodes.push(<div>{episodeData.PLACE[key]}</div>)
    }
  }

  return (
      <div className="childEpisodes">
        {episodes}
      </div>
  );
}

export default ChildEpisodes;
