
import './App.css';
import React, { useEffect, useState } from "react";
import weather from './components/weather';
export default function App() {

  const [lat, setLat] = useState([]);
  const [long, setLlong] = useState([]);
  const [data, setDate] = useState([]);
  
  useEffect(() => {
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLlong(position.coords.longitude);
    });

    await fetch( '${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}$units=metric$APPID=${process.env.REACT_APP_API_KEY}')
    .then(res => res.json())
    .then(result => {
      setDate(result)
        console.log(result);
    });
  }
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <weather weatherData={data}/>
      ): (
       <div></div>
      )}

    </div>
  );
}

