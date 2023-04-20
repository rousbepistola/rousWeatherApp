function kelvinToCelsius(kelvin: number|string) {
  if(typeof kelvin === "string"){
    kelvin = parseInt(kelvin)
  }

  const celsius = (kelvin - 273.15).toFixed(2);
  return celsius;
}

function epochToLocalTime(epochTime:number, countryCode:string) {
  const date = new Date(epochTime * 1000); // convert seconds to milliseconds
  // const options = ;
  return date.toLocaleString(countryCode, { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
}




export default {
    kelvinToCelsius,
    epochToLocalTime
}