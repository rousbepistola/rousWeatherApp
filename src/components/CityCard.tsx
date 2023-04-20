import './cityCard.css'
import * as React from 'react'
import utils  from '../utils/utilityFunctions'

type CityCardProps = {
    city: string,
    current: number | string,
    low: number | string,
    high: number | string,
    humidity: number | string,
    weather: string,
    additionalDetails:any
}

const CityCard = ({ city, current, low, high, humidity, weather, additionalDetails }: CityCardProps) => {
    const [showDetails, setShowDetails] = React.useState(false);

    const toggleDetails = () => {
        console.log(showDetails)
        setShowDetails(!showDetails);
    }

    return (
        <div className="cityCardContainer" onClick={toggleDetails}>
            <h3>{city.toUpperCase()}</h3>
            <p><span>Current</span> {current} Deg C</p>
            <p><span>Low</span> {low}</p>
            <p><span>High</span> {high}</p>
            <p><span>Humidity</span> {humidity}%</p>
            <div>
                {weather === "Snow" && <img src="https://ssl.gstatic.com/onebox/weather/128/snow.png" alt="" />}
                {weather === "Clear" && <img src="https://ssl.gstatic.com/onebox/weather/128/sunny.png" alt="" />}
                {weather === "Rain" && <img src="https://ssl.gstatic.com/onebox/weather/128/rain.png " alt="" />}
                {weather === "Clouds" && <img src="https://ssl.gstatic.com/onebox/weather/128/cloudy.png" alt="" />}
            </div>
            {showDetails && 
            <div className="detailsCard">
                {weather === "Snow" && <img src="https://ssl.gstatic.com/onebox/weather/128/snow.png" alt="" />}
                {weather === "Clear" && <img src="https://ssl.gstatic.com/onebox/weather/128/sunny.png" alt="" />}
                {weather === "Rain" && <img src="https://ssl.gstatic.com/onebox/weather/128/rain.png " alt="" />}
                {weather === "Clouds" && <img src="https://ssl.gstatic.com/onebox/weather/128/cloudy.png" alt="" />}
                <p><span>Country </span> {additionalDetails.country}</p>
                <p><span>Feels Like </span> {utils.kelvinToCelsius(additionalDetails.feels)}</p>
                <p><span>Sunrise </span> {utils.epochToLocalTime(additionalDetails.sunrise, additionalDetails.country)}</p>
                <p><span>Sunset </span> {utils.epochToLocalTime(additionalDetails.sunset, additionalDetails.country)}</p>
                <p><span>Description </span> {additionalDetails.description}</p>
            </div>}
        </div>
    )
}

export default CityCard
