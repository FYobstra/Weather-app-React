import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [show, setShow] = useState('hidden');

  const apiKey = '370d912fc60a1cca6e6b369c6e98cc96';
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=es`;

  const searchLocation = (e) => {
    if (e.key === 'Enter'){
      axios.get(url)
      .then ((response) => {
        setData(response.data)
        setLocation("")
        setShow('hidden')
      })
      .catch((error) => {
        setShow('visible')
        console.log(error)
      })
    }
  } 
  
  return (
    <div className="App">
      <div className='container'>
        <div className='search'>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder='Ingrese su ciudad'
        />
        <p id='error' style={{visibility: show}}>La ciudad ingresada no existe</p>
        </div>
        <div className='temperature'>
          <h3>{data.name ? data.name : null}</h3>
          <h1>{data.main ? `${(data.main.temp).toFixed(1)} °C` : null}</h1>
          <p>{data.weather ? data.weather[0].description : null}</p>
        </div>
        {data.name !== undefined &&
        <div className='extras'>
            <li>
              <h4>{data.main ? `${(data.main.feels_like).toFixed(1)} °C` : null}</h4>
              <p>Sens. Term</p>
            </li>
            <li>
              <h4>{data.main? `${(data.main.temp_max).toFixed(1)} °C` : null}</h4>
              <p>Temp Max</p>
            </li>
            <li>
              <h4>{data.wind ? `${(data.main.temp_max).toFixed(1)}km/h` : null }</h4>
              <p>Viento</p>
            </li>
        </div>
        }
      </div>
    </div>
  );
}

export default App;

