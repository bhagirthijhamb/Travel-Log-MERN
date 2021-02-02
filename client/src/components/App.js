import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './../API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({})
  const [viewport, setViewport] = useState({
    width: '100vh',
    height: '100vw',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  useEffect(() => {
    // async IIFE
    (async() => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
      setLogEntries(logEntries);
    })();
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/bhagirthi/ckkok7vzi19sj17pim3eyh62m"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {logEntries.map(entry => (
        <>
        <Marker 
          key={entry._id} 
          latitude={entry.latitude} 
          longitude={entry.longitude} 
          offsetLeft={-12} 
          offsetTop={-24}
        >
          {/* <div>{entry.title}</div> */}
          <div
            onClick={() => setShowPopup({
            ...showPopup,
            [entry._id]: true
          })}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="red" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
        </Marker>
        {
          showPopup[entry._id] ? (
          <Popup
            latitude={entry.latitude} 
            longitude={entry.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup({
              ...showPopup,
              [entry._id]: false
            })}
            anchor="top" >
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.comments}</p>
            </div>
          </Popup>
          ) : null
        }
        </>
      ))}
    
    </ReactMapGL>
  );
}

export default App;