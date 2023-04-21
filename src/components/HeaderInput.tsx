import React from 'react';
import './headerInput.css'

interface headerInputProps {
  cityName: string,
  onAddCity: (city: string) => void
}

const HeaderInput = ({cityName, onAddCity }:headerInputProps) => {
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = (e.target as HTMLFormElement).cityName.value;
    onAddCity(city);
    console.log("city added", city);
    (e.target as HTMLFormElement).cityName.value = "";
  };

  return (
    <div className="headerContainer">
      <div className="headerTitleContainer">
        <h1 className="headerTitle">Weather Station</h1>
      </div>
      <div className="headerInputContainer">
        <form onSubmit={handleSubmit}>
          <label>
          <input className="cityInput" pattern="[A-Za-z ]+" placeholder="Enter a city name" type="text" name="cityName" />
          </label>
          <button type="submit">Add City</button>
        </form>
      </div>
    </div>
  );
}

export default HeaderInput;
