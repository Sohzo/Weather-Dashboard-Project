
var displaytemp = document.getElementById("temp");
var displayloc = document.getElementById("location");
var displaydate = document.getElementById("date");
var displayday = document.getElementById("day");
var displaypic = document.getElementById("weatherpic");
var displayclouds = document.getElementById("clouds");
var displayday1 = document.getElementById("day1");
var displayday2 = document.getElementById("day2");
var displayday3 = document.getElementById("day3");
var displayday4 = document.getElementById("day4");
var displayday5 = document.getElementById("day5");
var displaydayname1 = document.getElementById("day1name");
var displaydayname2 = document.getElementById("day2name");
var displaydayname3 = document.getElementById("day3name");
var displaydayname4 = document.getElementById("day4name");
var displaydayname5 = document.getElementById("day5name");

var search = document.getElementById("searchbar").value;
var searchbutton = document.getElementById("searchbutton");
var searchhistory = JSON.parse(localStorage.getItem("Search History") || "[]");
var apiKey = "cd7053416bdb602f8d342304d55447b9"



searchbutton.addEventListener('click', function() {
    
    searchcontent = document.getElementById("searchbar").value;
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
    addedLi.addEventListener('click', function() {
        getweather(addedLi.textContent);
    })
});

for (i=0; i<searchhistory.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = searchhistory[i];
    liElement.className = "list-group-item";
    document.getElementById('historylist').appendChild(liElement);
}

function getweather(search) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + apiKey + "&units=imperial";
    console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    
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
            displayclouds.innerHTML = data.weather[0].description
        });
    
    
    var requestLATURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&appid=" + apiKey
    fetch(requestLATURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
            fetch(forecastURL)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data)
                    
                    displayday1.innerHTML = data.list[3].main.temp + " &#176F";
                    displayday2.innerHTML = data.list[11].main.temp + " &#176F";
                    displayday3.innerHTML = data.list[19].main.temp + " &#176F";
                    displayday4.innerHTML = data.list[27].main.temp + " &#176F";
                    displayday5.innerHTML = data.list[35].main.temp + " &#176F";
                    
                    displaydayname1.innerHTML = ((new Date(data.list[3].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[3].dt*1000)).getDate());
                    displaydayname2.innerHTML = ((new Date(data.list[11].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[11].dt*1000)).getDate());
                    displaydayname3.innerHTML = ((new Date(data.list[19].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[19].dt*1000)).getDate());
                    displaydayname4.innerHTML = ((new Date(data.list[27].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[27].dt*1000)).getDate());
                    displaydayname5.innerHTML = ((new Date(data.list[35].dt*1000)).getMonth() + 1) + "/" + ((new Date(data.list[35].dt*1000)).getDate());
                });
        });
    
}

