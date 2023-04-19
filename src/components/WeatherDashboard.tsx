import './weatherDashboard.css'
import CityCard from './CityCard'
import * as React from 'react'


let weatherDataApi = [  
    {    "city": "Toronto",    "current": 17,    "low": 12,    "high": 22,    "humidity": 62  },  
    {    "city": "Vancouver",    "current": 14,    "low": 9,    "high": 17,    "humidity": 76  },  
    {    "city": "Montreal",    "current": 10,    "low": 5,    "high": 15,    "humidity": 70  },  
    {    "city": "Calgary",    "current": 8,    "low": 3,    "high": 13,    "humidity": 50  },  
    {    "city": "Edmonton",    "current": 5,    "low": 0,    "high": 10,    "humidity": 45  },  
    {    "city": "Ottawa",    "current": 12,    "low": 7,    "high": 18,    "humidity": 68  },  
    {    "city": "Halifax",    "current": 9,    "low": 4,    "high": 14,    "humidity": 82  },  
    {    "city": "Quebec City",    "current": 6,    "low": 1,    "high": 11,    "humidity": 60  },  
    {    "city": "Winnipeg",    "current": 2,    "low": -3,    "high": 8,    "humidity": 40  },  
    {    "city": "Victoria",    "current": 13,    "low": 8,    "high": 18,    "humidity": 80  }
]

type weatherDataType = {
    "city": string,    
    "current": number,    
    "low": number,    
    "high": number,    
    "humidity": number
}

interface WeatherDashboardProps {
    newCity: string;
  }

const WeatherDashboard = ({newCity}:WeatherDashboardProps)=>{

    const [weatherData, setWeatherData] = React.useState<weatherDataType[]>(weatherDataApi)
    
    React.useEffect(() => {
        if (newCity) {
          setWeatherData((prevState) => {
            return [        ...prevState,        {          city: newCity,          current: 13,          low: 12,          high: 12,          humidity: 50,        },      ];
          });
        }
      }, [newCity]);

    return(
        <>
            <h2>Weather Dashboard</h2>
            <div className="weatherDashboardContainer">
                {weatherData.map((data)=>{
                    const {city, current, low, high, humidity} = data
                    return(
                        <CityCard city = {city} current={current} low={low} high={high} humidity={humidity}/>
                    )
                })}
            </div>
        </>
    )
}


export default WeatherDashboard 