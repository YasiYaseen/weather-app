const currentTemp = document.getElementById('current-temp');
const currentText = document.getElementById('current-text');
const dateTime = document.getElementById('dateTime');
const clocation = document.getElementById('location');
const country = document.getElementById('country');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feelsLike');
const forecastdiv=document.querySelector('.forecast-content');
const degfar =document.querySelector('.deg-far');
const inpcity = document.getElementById('inp-city');
const currentImg =document.getElementById('current-img');



const fetchWeather = async(city)=>{
try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c95cdecb046c4b14b3f14147232012&q=${city}&days=7&aqi=no&alerts=no`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const weather = await response.json();
    return weather;

} catch (error) {
    throw error
}
    
}

const searchWeather =async()=>{
   try {
      const city = inpcity.value;
    const result =await fetchWeather(city);
    setResult(result,"f");
    console.log(result)
   } catch (error) {
    console.log(error.message);
   }
  


}
const setResult = async(result,corf)=>{
    if(corf=="c"){
        currentTemp.innerText =result.current.temp_c;
        degfar.innerHTML="°C";

    }else{
        currentTemp.innerText =result.current.temp_f;
        degfar.innerHTML="°F";

    }
    currentText.innerHTML=result.current.condition.text;
    currentImg.src = result.current.condition.icon;
    



}

inpcity.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){

        searchWeather();
    }
});
