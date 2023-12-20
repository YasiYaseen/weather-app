const fetchWeather = async(city)=>{

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=c95cdecb046c4b14b3f14147232012&q=${city}&aqi=no`);
    const weather = await response.json();
    console.log(weather.);
}