
var search = document.getElementById("searchbar").value;
var searchbutton = document.getElementById("searchbutton");
var searchhistory = JSON.parse(localStorage.getItem("Search History") || "[]");

searchbutton.addEventListener('click', function(event) {
    event.preventDefault();
    searchcontent = document.getElementById("searchbar").value;
    searchhistory.push(searchcontent);
    localStorage.setItem("Search History", JSON.stringify(searchhistory));
    console.log(searchhistory)
});

for (i in searchhistory) {
    var liElement = document.createElement('li');
    liElement.textContent = searchhistory[i];
    liElement.className = "list-group-item";
    document.getElementById('historylist').appendChild(liElement);
}


//const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=40.760780&lon=111.891045&appid=cd7053416bdb602f8d342304d55447b9';
