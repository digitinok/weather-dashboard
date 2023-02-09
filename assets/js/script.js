let lat  = "51.5";
let lon = "0";
let queryType = "weather";  //forecast
const APIKey = "4ddb322a76968b6cb599fa2b021f691b";
//let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;
//let queryURL2 = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=${APIKey}`;
let historyListEl = $("#history-list");


let getWeather = (event) => {
  let city = event.target.dataset.city;
  console.log(city);
  getCurrentWeather("weather", lat, lon, APIKey);
}


// display all the city search history as buttons
let renderCitySearchHistory = () => {
  const cities = JSON.parse(localStorage.getItem('cities'));
  for (let i=0; i<cities.length; i++) {
    let itemEl = $("<li>");
    let cityEl = $("<button>").text(cities[i]);
    cityEl.attr("data-city", cities[i]);
    // display weather data
    cityEl.on("click", getWeather);
    itemEl.append(cityEl);
    historyListEl.append(itemEl);
  }
}




// display the currentWeather
let getCurrentWeather = (queryType="weather", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  console.log(queryURL)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
  
    // city name  
    let city = $("#city").text(`${response.name} `);
    // weather Image in City name header
    let weatherImg = $("<img>");
    weatherImg.attr("src", `http://openweathermap.org/img/wn/${(response.weather[0].icon)}.png`)
    weatherImg.attr("alt", "weather icon");
    city.append(weatherImg);

    // date
    $("#date").text(`${moment(response.dt*1000 + response.timezone*1000).format('LLLL')}`);
    // icon representation of weather conditions  
    $("#weather").text(`${response.weather[0].description}`);
    // temperature
    $("#temp").text(`Temperature: ${(response.main.temp - 273.15).toFixed(1)} °C`);
    // humidity
    $("#humidity").text(`Humidity: ${response.main.humidity} %`);
    // wind speed
    $("#wind").text(`Wind Speed: ${response.wind.speed} m/s`);
   
  });
}


// initialise cities array, get cities from local storage
let cities = JSON.parse(localStorage.getItem('cities'));
console.log(cities);
if (cities === null) {cities = []}


// get city from search input with the submit button
let searchButton = $("#search-button")
searchButton.on("click", (event) => {
  event.preventDefault();
  let city = $("#search-input").val().toLowerCase().trim();
  $("#search-input").val("");

  // searched cities saved to local storage and buttons rendered
  if (city !== "" && !cities.includes(city)) {
    let queryURL2 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;
    
      // created an AJAX call
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      console.log(response)

    });

    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    renderCitySearchHistory();
  }
  getCurrentWeather("weather", lat, lon, APIKey);
});


// display search history of all previously searched cities
renderCitySearchHistory();


// display the 5 day Weather Forcast
let getCForcastWeather = (queryType="forecast", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  // created an AJAX call for 5 day weather forecast
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {``
    console.log(response)

});
}

getCForcastWeather = ("forecast", lat, lon, APIKey);