let searchBtn=document.getElementById('search');

let nameToday=document.getElementById('today-name');
let dateTodayNum=document.getElementById('today-date-num');
let dateToday=document.getElementById('today-date');
let locatin=document.getElementById('location');
let degreeToday=document.getElementById('degreeNum');
let imageToday=document.getElementById('today-weather-img');
let todayCond=document.getElementById('weather-text');
let moistureDegree=document.getElementById('moisture');
let windDegree=document.getElementById('wind');
let direc=document.getElementById('direction');

let nameTomorrow=document.getElementsByClassName('tomorrow-name')
let imgTomorrow=document.getElementsByClassName('tomorrow-img')
let maxDegraa=document.getElementsByClassName('max-degree-tomorrow')
let minDegree=document.getElementsByClassName('min-degree-tomorrow')
let tomorrowCond=document.getElementsByClassName('tomorrow-condition')


// function to fetch data
async function getData(cityName){
    let dataWeather=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
    let data=await dataWeather.json()
    return data;
}

// display today data
function displayTodayData(data) {
    let todayDate=new Date();
    nameToday.innerHTML=todayDate.toLocaleDateString("en-us",{weekday:"long"})
    dateTodayNum.innerHTML=todayDate.getDate()
    dateToday.innerHTML=todayDate.toLocaleDateString("en-us",{month:"long"})

    locatin.innerHTML=data.location.name
    degreeToday.innerHTML=data.current.temp_c +"°C"
    imageToday.setAttribute('src',data.current.condition.icon)
    todayCond.innerHTML=data.current.condition.text
    moistureDegree.innerHTML=data.current.humidity+"%"
    windDegree.innerHTML=data.current.wind_kph +" km/h"
    direc.innerHTML=data.current.wind_dir

}

// display tomorrowData
function displayTomorrowData(data){

    for(let i=0 ;i<2 ;i++){
        let nextDate=new Date(data.forecast.forecastday[i+1].date);
        nameTomorrow[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
        maxDegraa[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c+"°C"
        minDegree[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c+"°C"
        tomorrowCond[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text
   
    }


}
// function to collect all functions 

async function start(city="cairo") {
   let weatherDatat=await getData(city);
   displayTodayData(weatherDatat)
   displayTomorrowData(weatherDatat)
}
start()



// search

searchBtn.addEventListener('keyup',function(){
start(searchBtn.value)


})

