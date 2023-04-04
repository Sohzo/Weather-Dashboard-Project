
//Created necessary variables
//Variables used for current weather
var displaytemp = document.getElementById("temp");
var displayloc = document.getElementById("location");
var displaydate = document.getElementById("date");
var displayday = document.getElementById("day");
var displaypic = document.getElementById("weatherpic");
var displayclouds = document.getElementById("clouds");
var windspeed = document.getElementById("windspeed");
var humidity = document.getElementById("humidity");
//Variables used for forecast temperature
var displayday1 = document.getElementById("day1");
var displayday2 = document.getElementById("day2");
var displayday3 = document.getElementById("day3");
var displayday4 = document.getElementById("day4");
var displayday5 = document.getElementById("day5");
//Variables used for forecast dates
var displaydayname1 = document.getElementById("day1name");
var displaydayname2 = document.getElementById("day2name");
var displaydayname3 = document.getElementById("day3name");
var displaydayname4 = document.getElementById("day4name");
var displaydayname5 = document.getElementById("day5name");
//Variables used for forecast wind speeds
var dspeed1 = document.getElementById("day1speed");
var dspeed2 = document.getElementById("day2speed");
var dspeed3 = document.getElementById("day3speed");
var dspeed4 = document.getElementById("day4speed");
var dspeed5 = document.getElementById("day5speed");
//Variables used for forecast humidity
var dhum1 = document.getElementById("day1humidity");
var dhum2 = document.getElementById("day2humidity");
var dhum3 = document.getElementById("day3humidity");
var dhum4 = document.getElementById("day4humidity");
var dhum5 = document.getElementById("day5humidity");
//Variables used for forecast weather icons
var weatherpic1 = document.getElementById("weatherpic1");
var weatherpic2 = document.getElementById("weatherpic2");
var weatherpic3 = document.getElementById("weatherpic3");
var weatherpic4 = document.getElementById("weatherpic4");
var weatherpic5 = document.getElementById("weatherpic5");
//Variables used for searchbar function
var search = document.getElementById("searchbar").value;
var searchbutton = document.getElementById("searchbutton");
var searchhistory = JSON.parse(localStorage.getItem("Search History") || "[]");
//Api key
var apiKey = "cd7053416bdb602f8d342304d55447b9"


//This function creates the search function, along iwth the search history

searchbutton.addEventListener('click', function() {
    
    searchcontent = document.getElementById("searchbar").value;
    //Checks if search content is empty
    if (searchcontent != "") {
        searchhistory.push(searchcontent);
    } else {
        return
    }
    localStorage.setItem("Search History", JSON.stringify(searchhistory));
    console.log(searchhistory)
    var editedsearch = searchcontent.split(" ").join("");
    getweather(editedsearch);
    var addedLi = document.createElement('li');
    addedLi.textContent = searchcontent
    addedLi.className = "list-group-item";
    document.getElementById('historylist').appendChild(addedLi);

    //This allows the user to click a history element to re-search it
    addedLi.addEventListener('click', function() {
        getweather(addedLi.textContent);
    })
});

//This saves the search history and redispalys it on refresh

for (i=0; i<searchhistory.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = searchhistory[i];
    liElement.className = "list-group-item";
    document.getElementById('historylist').appendChild(liElement);
}
//Main function for acquiring weather data and pushing it to the webpage
function getweather(search) {
    //Sets the url for current weather fetch
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + apiKey + "&units=imperial";
    console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            //Displays all the info from the weather api to the page
            displaytemp.innerHTML = data.main.temp + " &#176F"
            displayloc.innerHTML = data.name
            var date = new Date(data.dt*1000);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var dayname = weekdays[date.getDay()];
            console.log(day);
            displayday.innerHTML = dayname;
            displaydate.innerHTML = month + "/" + day + "/" + year;
            displaypic.setAttribute("src","https://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png");
            displayclouds.innerHTML = "Weather: " + data.weather[0].description
            windspeed.innerHTML = "Wind Speed: " + data.wind.speed + " mph"
            humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
        });
    
    //This function sets the URL for converting city name to lat-lon coordinates
    var requestLATURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&appid=" + apiKey
    //This fetch is just to get the geo converter
    fetch(requestLATURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            //Converts the inputted city name to lat-lon coordinates so that the next fetch can use it
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
            //Fetches the 5-day weather forecast data using the previous geo-converter coordinates as input
            fetch(forecastURL)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data)
                    
                    //Displays the temperature for each day
                    displayday1.innerHTML = data.list[3].main.temp + " &#176F";
                    displayday2.innerHTML = data.list[11].main.temp + " &#176F";
                    displayday3.innerHTML = data.list[19].main.temp + " &#176F";
                    displayday4.innerHTML = data.list[27].main.temp + " &#176F";
                    displayday5.innerHTML = data.list[35].main.temp + " &#176F";
                    //Displays the date for each of the 5 days
                    displaydayname1.innerHTML = ((new Date(data.list[3].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[3].dt*1000)).getDate());
                    displaydayname2.innerHTML = ((new Date(data.list[11].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[11].dt*1000)).getDate());
                    displaydayname3.innerHTML = ((new Date(data.list[19].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[19].dt*1000)).getDate());
                    displaydayname4.innerHTML = ((new Date(data.list[27].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[27].dt*1000)).getDate());
                    displaydayname5.innerHTML = ((new Date(data.list[35].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[35].dt*1000)).getDate());
                    //Displays the wind speed for the forecast
                    dspeed1.innerHTML = data.list[3].wind.speed + " mph";
                    dspeed2.innerHTML = data.list[11].wind.speed + " mph";
                    dspeed3.innerHTML = data.list[19].wind.speed + " mph";
                    dspeed4.innerHTML = data.list[27].wind.speed + " mph";
                    dspeed5.innerHTML = data.list[35].wind.speed + " mph";
                    //Displays the humidity for the 5 forecast
                    dhum1.innerHTML = data.list[3].main.humidity + "%";
                    dhum2.innerHTML = data.list[11].main.humidity + "%";
                    dhum3.innerHTML = data.list[19].main.humidity + "%";
                    dhum4.innerHTML = data.list[27].main.humidity + "%";
                    dhum5.innerHTML = data.list[35].main.humidity + "%";
                    //Dispalys the weather icon for the forecast
                    weatherpic1.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon +"@2x.png");
                    weatherpic2.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[11].weather[0].icon +"@2x.png");
                    weatherpic3.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[19].weather[0].icon +"@2x.png");
                    weatherpic4.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[27].weather[0].icon +"@2x.png");
                    weatherpic5.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[35].weather[0].icon +"@2x.png");


                });
        });
    
}

