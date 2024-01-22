

async function getWeather(city) {
  
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3b713f4f07074dfaa3f214506241201&q=${city}&days=3`)
    let weather = await response.json()
    
    var city = weather.location.name

    console.log(weather.location.localtime);
    let date = new Date(weather.location.localtime)

    var monthIndex = date.getMonth()
    var dayIndex = date.getDay()
    var dayOfMonth = date.getDate()
    var hourIndex = date.getHours()


    var Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
    var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    var day = Days[dayIndex]
    var month = Months[monthIndex]



    var weatherDays = weather.forecast.forecastday
    for (let index = 0; index < weatherDays.length; index++) {

        var hour = weatherDays[index].hour[hourIndex]
        var date1 = new Date(hour.time)
        var dayIndex1 = date1.getDay()
        var day1 = Days[dayIndex1]
        if(index==0){

            var direction
    
            switch (hour.wind_dir) {
                case "N":
                    direction = "North"
                    break;
                case "NNE":
                    direction = "North-Northeast"
                    break;
                case "NE":
                    direction = "Northeast"
                    break;
                case "ENE":
                    direction = "East-Northeast"
                    break;
                case "E":
                    direction = "East"
                    break;
                case "ESE":
                    direction = "East-Southeast"
                    break;
                case "SE":
                    direction = "Southeast"
                    break;
                case "SSE":
                    direction = "South-Southeast"
                    break;
                case "S":
                    direction = "South"
                    break;
                case "SSW":
                    direction = "South-Southwest"
                    break;
                case "SW":
                    direction = "Southwest"
                    break;
                case "WSW":
                    direction = "West-Southwest"
                    break;
                case "W":
                    direction = "West"
                    break;
                case "WNW":
                    direction = "West-Northwest"
                    break;
                case "NW":
                    direction = "Northwest"
                    break;
                case "NNW":
                    direction = "North-Northwest"
                    break;
                default:
                    direction = "Unknown direction"
                    break;
            }
            document.getElementById("velocity-dir").innerHTML = direction
            document.getElementById("date").innerHTML = dayOfMonth + " " + month
            document.getElementById("location-name").innerHTML = city
            document.getElementById("velocity").innerHTML = hour.vis_km + "Km/h"
            document.getElementsByClassName("day-name")[index].innerHTML = day1
            document.getElementsByClassName("temp-c")[index].innerHTML = hour.temp_c + `<sup>o</sup>C`
            document.getElementsByClassName("status")[index].innerHTML = hour.condition.text
            document.getElementsByClassName("icon")[index].setAttribute("src", hour.condition.icon)
        }else{

            document.getElementsByClassName("temp-f")[index-1].innerHTML = weatherDays[index].day.mintemp_c + `<sup>o</sup>`
            document.getElementsByClassName("day-name")[index].innerHTML = day1
            document.getElementsByClassName("temp-c")[index].innerHTML = weatherDays[index].day.maxtemp_c + `<sup>o</sup>C`
            document.getElementsByClassName("status")[index].innerHTML = weatherDays[index].day.condition.text
            document.getElementsByClassName("icon")[index].setAttribute("src", weatherDays[index].day.condition.icon)
        }


    // console.log(weatherDays[index].day);
  


    }

}



async function search(){
    var searchInput = document.getElementById("search").value
    let response = await fetch(`http://api.weatherapi.com/v1/search.json?key=aa8b71d7842a49b483a214141241201&q=${searchInput}`)
    let cities = await response.json()
    console.log(cities);
    if (cities.length > 0){
        getWeather(cities[0].name)
    }
}


( function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(async function(position){
       var response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=3a1b6f01b30a4e7b96a6c106bdf7aac4`)
       var currentCity = await response.json()
       getWeather(currentCity.results[0].components.state);
       
    })
})()

