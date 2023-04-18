import React from 'react';
import './headerInput.css'

const HeaderInput = ({ onAddCity }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.elements.cityName.value;
    onAddCity(city);
    console.log("city added", city);
  };

  return (
    <div className="headerContainer">
      <div className="headerTitleContainer">
        <h1 className="headerTitle">Weather Station</h1>
      </div>
      <div className="headerInputContainer">
        <form onSubmit={handleSubmit}>
          <label>
            City Name:
            <input className="cityInput" placeholder="Enter a city name" type="text" name="cityName" />
          </label>
          <button type="submit">Add City</button>
        </form>
      </div>
    </div>
  );
}

export default HeaderInput;
