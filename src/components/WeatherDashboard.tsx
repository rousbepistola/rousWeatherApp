import './weatherDashboard.css'
import CityCard from './CityCard'
import * as React from 'react'
import utils  from '../utils/utilityFunctions'

function makeUri(homeCity: string, countryCode: string, apiKey: string): string {
    const queryParams = new URLSearchParams({
      q: homeCity,
      countryCode: countryCode,
      apiKey: apiKey,
    });
    console.log(`http://api.openweathermap.org/geo/1.0/direct?${queryParams.toString()}`, "<copy this")
    return `http://api.openweathermap.org/geo/1.0/direct?${queryParams.toString()}`;
}



  

const callHomeWeather = async(homeCity: string = "ottawa")=>{
    const countryCode = 'ca';
    const apiKey = 'e9d16de5e53343477b7d21b6572f0aa0';
    

    const uri = makeUri(homeCity, countryCode, apiKey);
    try {
        const rawData = await fetch(uri)
        const data = await rawData.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

const callWeather = async(lat: number, lon: number)=>{
    const apiKey = 'e9d16de5e53343477b7d21b6572f0aa0';
    const uri = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        const rawData = await fetch(uri)
        const data = await rawData.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

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
    const [homeWeatherData, setHomeWeatherData] = React.useState<weatherDataType>({city: "ottawa", current: 13, low: 12, high: 12, humidity: 50})
    
    React.useEffect(() => {
        if (newCity) {
          setWeatherData((prevState) => {
            return [        
                ...prevState,        
                {          
                    city: newCity,          
                    current: 13,          
                    low: 12,          
                    high: 12,          
                    humidity: 50,        
            },      
        ];
          });
        }
      }, [newCity]);

      React.useEffect(()=>{
        async function getWeather(){
            const realWeatherApi = await callHomeWeather()
            return {
                lat:realWeatherApi[0].lat,
                lon:realWeatherApi[0].lon
            }
        }
        async function getWeatherData(){
            const coordinates = await getWeather()
            const weatherData = await callWeather(coordinates.lat, coordinates.lon)
            console.log(weatherData,"HERE<<<<")
            return weatherData
        }
    
        const getHomeWeatherData = async () => {
            const weatherData = await getWeatherData()
            const homeWeatherInformation = {
                "city": "Ottawa",    
                "current": weatherData.main.temp,    
                "low": weatherData.main.temp_min,    
                "high": weatherData.main.temp_max,    
                "humidity": weatherData.main.humidity,
            }
            setHomeWeatherData(homeWeatherInformation)
        }
    
        getHomeWeatherData()
    },[])
    

    return(
        <>
            <div className='weatherDashboardHomeSectionContainerCity'>
                <p className="homeSectionEntries">Home City: {homeWeatherData.city}</p>
                <p className="homeSectionEntries">Current: {utils.kelvinToCelsius(homeWeatherData.current)}°</p>
                <p className="homeSectionEntries">Low: {utils.kelvinToCelsius(homeWeatherData.low)}°</p>
                <p className="homeSectionEntries">High: {utils.kelvinToCelsius(homeWeatherData.high)}°</p>
                <p className="homeSectionEntries">Humidity: {homeWeatherData.humidity}%</p>
            </div>
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