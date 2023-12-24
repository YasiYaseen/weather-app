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
const giphy=document.getElementById('giphy');

let resultvar;

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
    resultvar = result;
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
 feelsLike.innerHTML=result.current.feelslike_c+" °C";
    }else{
        currentTemp.innerText =result.current.temp_f;
        degfar.innerHTML="°F";
        feelsLike.innerHTML=result.current.feelslike_f+" °F";

    }
    currentText.innerHTML=result.current.condition.text;
    currentImg.src = result.current.condition.icon;
    clocation.innerHTML=result.location.name;
    country.innerHTML=result.location.country;
    dateTime.innerHTML=result.location.localtime;
    humidity.innerHTML=result.current.humidity;
    
   const forecast=result.forecast.forecastday;

    createForecastChildren(forecast,corf);
    addgiphy(result.current.condition.text);

}
const createForecastChildren = (forecast,corf)=>{
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
while(forecastdiv.firstChild){
    forecastdiv.firstChild.remove();
}
forecast.forEach((weekday) => {
  const fdiv =document.createElement('div');
  const dayspan =document.createElement('span');
  const iconImg = document.createElement('img');
  const mintempspan =document.createElement('span');
  const maxtempspan =document.createElement('span');

  fdiv.classList.add('d-flex');
  dayspan.classList.add('day');
  const date =new Date(weekday.date);
  const day = date.getDay();
  dayspan.innerHTML= weekdays[day];
  fdiv.appendChild(dayspan);
  iconImg.src=weekday.day.condition.icon;
  fdiv.appendChild(iconImg);
  if(corf=="c"){
    mintempspan.innerHTML=weekday.day.mintemp_c+" °C";
  }else{
    mintempspan.innerHTML=weekday.day.mintemp_f+" °F";

  }
  fdiv.appendChild(mintempspan);

  if(corf=="c"){
    maxtempspan.innerHTML=weekday.day.maxtemp_c+" °C";
  }else{
    maxtempspan.innerHTML=weekday.day.maxtemp_f+" °F";

  }
  fdiv.appendChild(maxtempspan);

  forecastdiv.appendChild(fdiv);


});
}
const addgiphy=async (text)=>{
    const checkingResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=G1s4N2o4hPyrNvLZxTc2trQ3kI3X0iNx&q=${text}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
    const parsedchecking =await checkingResponse.json();
    const totalgiphs =parsedchecking.pagination.total_count;
    const offset =Math.floor(Math.random()*totalgiphs) ;
    const imageresponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=G1s4N2o4hPyrNvLZxTc2trQ3kI3X0iNx&q=${text}&limit=1&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`);
    const parsedresponse =await imageresponse.json();
   
    giphy.src =parsedresponse.data[0].images.original.url;
    console.log(parsedresponse);
}


inpcity.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){

        searchWeather();
    }
});
