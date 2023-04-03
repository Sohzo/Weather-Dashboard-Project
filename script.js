
var displaytemp = document.getElementById("temp")
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
            temp.innerHTML = data.main.temp + " &#176F"
        });
}


//const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=40.760780&lon=111.891045&appid=cd7053416bdb602f8d342304d55447b9';
