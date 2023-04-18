import './cityCard.css'

const CityCard = ({city, current, low, high, humidity})=>{

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