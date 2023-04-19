import './cityCard.css'
import * as React from 'react'

type CityCardProps = {
    city:string, current:number, low:number, high:number, humidity:number
}

const CityCard = ({city, current, low, high, humidity}:CityCardProps)=>{

    return(
        <div className="cityCardContainer">
            <h3>{city}</h3>
            <p>Current: {current} Deg C</p>
            <p>Low: {low}</p>
            <p>High: {high}</p>
            <p>Humidity: {humidity}%</p>
        </div>
    )
}

export default CityCard