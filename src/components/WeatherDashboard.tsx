import './weatherDashboard.css'
import CityCard from './CityCard'
import * as React from 'react'
import utils  from '../utils/utilityFunctions'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { changeHome } from '../redux/weatherSlice'

const {callHomeWeather, callWeather, kelvinToFahrenheit, kelvinToCelsius } = utils

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
    const dispatch = useAppDispatch()
    const homeWeatherData = useAppSelector((state) => state.weather);

    const [weatherData, setWeatherData] = React.useState<weatherDataType[]>(weatherDataApi)
    const [tempUnit, setTempUnit] = React.useState<string>("C")

    //setting the home dashboard cards state
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
            dispatch(changeHome(homeWeatherInformation))
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
                <p className="homeSectionEntries">Current: {tempUnit === "C" ? kelvinToCelsius(homeWeatherData.current) : kelvinToFahrenheit(homeWeatherData.current)}°</p>
                <p className="homeSectionEntries">Low: {tempUnit === "C" ? kelvinToCelsius(homeWeatherData.low) : kelvinToFahrenheit(homeWeatherData.low)}°</p>
                <p className="homeSectionEntries">High: {tempUnit === "C" ? kelvinToCelsius(homeWeatherData.high) :kelvinToFahrenheit(homeWeatherData.high)}°</p>
                <p className="homeSectionEntries">Humidity: {homeWeatherData.humidity}%</p>
                <button onClick = {()=>{
                    if(tempUnit === "C"){
                        setTempUnit("F")
                    }
                    if(tempUnit === "F"){
                        setTempUnit("C")
                    }
                }}
                >Unit of Measure: {tempUnit}°</button>
            </div>
            <div className="weatherDashboardContainer">
                {weatherData.map((data)=>{
                    const {city, current, low, high, humidity, weather} = data
                    const {country, feels, sunrise, sunset, description} = data.additionalDetails
                    return(
                        <CityCard 
                        city = {city} 
                        current={tempUnit === "C" ? kelvinToCelsius(current) : kelvinToFahrenheit(current)} 
                        low={tempUnit === "C" ? kelvinToCelsius(low) :kelvinToFahrenheit(low)} 
                        high={tempUnit === "C" ? kelvinToCelsius(high) :kelvinToFahrenheit(high)} 
                        humidity={humidity} weather={weather} 
                        key={city}
                        additionalDetails={{country, feels, sunrise, sunset, description}}
                        unitOfMeasure={tempUnit}
                        />
                    )
                })}
            </div>
        </>
    )
}


export default WeatherDashboard 