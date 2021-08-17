let apiKey = "c25914f6481ca9ff6fbd83df1357dfa5";
let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dallas&appid=${apiKey}`

fetch(queryUrl)
.then(headers => headers.json())
.then(weatherData => {
    console.log(weatherData);
})

let searchButton = $(".searchButton");

for (let i = 0; i < localStorage.length; i++) {
    let city = localStorage.getItem(i);
    let cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>")
    
}
let keyCount = 0;

searchButton.click(function () {
    let searchInput = $(".searchInput").val();
    let urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey + "&units=imperial";
    let urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + apiKey + "&units=imperial";

    if (searchInput === "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }). then(function (response) {
            let cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            
            let local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            let currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            
            let currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            let timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            let currentTemp = currentName.append("<p>");

            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "</p>");
            let urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {
                let currentUV = currentTemp.append("<p>" + "UV Index " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });

        });

        $.ajax({
            url: urlFiveDay,
            method: "GET",
        }).then(function(response) {
            let day = [0, 8, 16, 24, 32];
            let fiveDayCard = $(".fiveDayCard").addClass("card-body");
            let fivedayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            day.forEach(function (i) {
                let fiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                fiveDayTimeUTC1 = fiveDayTimeUTC1.toLocaleDateString("en-US");
                fivedayDiv.append("<div class=fiveDayColor>" + "<p>" + fiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
                
            })
        });
    }
});