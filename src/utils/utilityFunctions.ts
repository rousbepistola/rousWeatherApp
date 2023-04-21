function kelvinToCelsius(kelvin: number|string) {
  if(typeof kelvin === "string"){
    kelvin = parseInt(kelvin)
  }

  const celsius = (kelvin - 273.15).toFixed(2);
  return celsius;
}

function kelvinToFahrenheit(kelvin: number | string) {
  if (typeof kelvin === "string") {
    kelvin = parseInt(kelvin);
  }

  const fahrenheit = ((kelvin - 273.15) * 1.8 + 32).toFixed(2);
  return fahrenheit;
}


function epochToLocalTime(epochTime:number, countryCode:string) {
  const date = new Date(epochTime * 1000); // convert seconds to milliseconds
  // const options = ;
  return date.toLocaleString(countryCode, { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
}

function makeUri(homeCity: string, countryCode: string, apiKey: string): string {
  const queryParams = new URLSearchParams({
    q: homeCity.replace(/\s+/g, '+'),    
    countryCode: countryCode,
    apiKey: apiKey,
  });    
  console.log(`http://api.openweathermap.org/geo/1.0/direct?${queryParams.toString()}`, "<copy this")
  return `http://api.openweathermap.org/geo/1.0/direct?${queryParams.toString()}`;
}        

const callHomeWeather = async(homeCity: string = "ottawa")=>{
  const countryCode = 'ca';
  const apiKey: string  = process.env.REACT_APP_API_KEY!;
  

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
  const apiKey = process.env.REACT_APP_API_KEY!;
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
function celsiusToFahrenheit(celsius: number|string) {
  if (typeof celsius === "string") {
    celsius = parseInt(celsius);
  }

  const fahrenheit = ((celsius * 9/5) + 32).toFixed(2);
  return fahrenheit;
}



export default {
    kelvinToCelsius,
    epochToLocalTime, 
    callHomeWeather, 
    callWeather,
    kelvinToFahrenheit,
    celsiusToFahrenheit
}