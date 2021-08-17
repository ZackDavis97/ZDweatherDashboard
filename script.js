let apiKey = "c25914f6481ca9ff6fbd83df1357dfa5";
let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dallas&appid=${apiKey}`

fetch(queryUrl)
.then(headers => headers.json())
.then(weatherData => {
    console.log(weatherData);
})

let searchButton = $(".searchButton");
let keyCount = 0;

for (let i = 0; i < localStorage.length; i++) {
    let city = localStorage.getItem(i);
    let cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>")
    
}

searchButton.click(function () {
    let searchInput = $(".searchInput").val();
    let currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "$Appide=" + apiKey + "&units=imperial";
    let fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "$Appide=" + apiKey + "&units=imperial";

    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: currentUrl,
            method: "get"
        }). then(function (response) {
            let cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            
            let local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            let currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            
            let currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            
        })
    }
})