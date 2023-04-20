import './weatherDashboard.css'
import CityCard from './CityCard'
import * as React from 'react'
import utils  from '../utils/utilityFunctions'

type weatherDataType = {
    "city": string|string,    
    "current": number|string,    
    "low": number|string,    
    "high": number|string,    
    "humidity": number|string,
    "weather": string,
    additionalDetails: any | null
    
}

interface WeatherDashboardProps {
    newCity: string;
}



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
    {    "city": "Toronto",    "current": 280,    "low": 260,    "high": 280,    "humidity": 62, "weather":"Clear", 
    additionalDetails:{
        country:"Canada", feels:"300", sunrise:"1681996261", sunset:"1682046680", description:"sunny day :>",
    }  },  
    {    "city": "Vancouver",    "current": 280,    "low": 260,    "high": 280,    "humidity": 76, "weather":"Clouds", 
    additionalDetails:{
        country:"Canada", feels:"300", sunrise:"1681996261", sunset:"1682046680", description:"sunny day :>",
    }  },  
]    



const WeatherDashboard = ({newCity}:WeatherDashboardProps)=>{
    

    const [weatherData, setWeatherData] = React.useState<weatherDataType[]>(weatherDataApi)
    const [homeWeatherData, setHomeWeatherData] = React.useState<weatherDataType>({city: "ottawa", current: 13, low: 12, high: 12, humidity: 50, weather: "Clouds", additionalDetails:{
        country:"", feels:"", sunrise:"", sunset:"", description:"",
    } })

      //setting initial state for the home dashboard header
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
                "weather": weatherData.weather[0].main,
                "additionalDetails": null
            }
            setHomeWeatherData(homeWeatherInformation)
        }
    
        getHomeWeatherData()
    },[])

    //setting the home dashboard cards state
    React.useEffect(()=>{
        async function getWeather(){
            const realWeatherApi = await callHomeWeather(newCity)
            return {
                lat:realWeatherApi[0].lat,
                lon:realWeatherApi[0].lon
            }
        }
        async function getWeatherData(){
            const coordinates = await getWeather()
            const weatherData = await callWeather(coordinates.lat, coordinates.lon)
            return weatherData
        }
    
        const getHomeWeatherData = async () => {
            const weatherData = await getWeatherData()
            console.log(weatherData,"<<<<HERE")
            const weatherInformation = {
                "city": newCity,    
                "current": weatherData.main.temp,    
                "low": weatherData.main.temp_min,    
                "high": weatherData.main.temp_max,    
                "humidity": weatherData.main.humidity,
                "weather": weatherData.weather[0].main, 
                "additionalDetails": {
                    country: weatherData.sys.country,
                    feels:weatherData.main.feels_like,
                    sunrise:weatherData.sys.sunrise,
                    sunset:weatherData.sys.sunset,
                    description:weatherData.weather[0].description
                }
            }
            setWeatherData((prevState) => {
                return [        
                    ...prevState,        
                    weatherInformation,      
                ];
              
            })
        }
    
        getHomeWeatherData()
    },[newCity])
    

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
                    const {city, current, low, high, humidity, weather} = data
                    const {country, feels, sunrise, sunset, description} = data.additionalDetails
                    return(
                        <CityCard 
                        city = {city} 
                        current={utils.kelvinToCelsius(current)} 
                        low={utils.kelvinToCelsius(low)} 
                        high={utils.kelvinToCelsius(high)} 
                        humidity={humidity} weather={weather} 
                        key={city}
                        additionalDetails={{country, feels, sunrise, sunset, description}}
                        />
                    )
                })}
            </div>
        </>
    )
}


export default WeatherDashboard 