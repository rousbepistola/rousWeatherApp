import './App.css';
import HeaderInput from './components/HeaderInput';
import WeatherDashboard from './components/WeatherDashboard.jsx'
import React, { useState } from 'react';


function App() {

  const [cityName, setCityName] = useState('');

  return (
    <div className="App">
      <HeaderInput 
      onAddCity={(city)=>{
          setCityName(city)
      }} 
      cityName={cityName}/>
      <WeatherDashboard newCity = {cityName}/>
    </div>
  );
}

export default App;
