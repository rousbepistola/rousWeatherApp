function kelvinToCelsius(kelvin: number|string) {
  if(typeof kelvin === "string"){
    kelvin = parseInt(kelvin)
  }
  const celsius = (kelvin - 273.15).toFixed(2);
  return celsius;
}


export default {
    kelvinToCelsius
}