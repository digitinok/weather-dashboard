//let lat  = "51.5";
//let lon = "0";
//let queryType = "weather";  //forecast
const APIKey = "4ddb322a76968b6cb599fa2b021f691b";
//let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;
//let queryURL2 = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=${APIKey}`;



let getWeather = (event) => {


  console.log(event.target.dataset.city);
  // city name  
  let city = $("#city").text(`${event.target.dataset.city}`);

  getForcastWeather("forecast", event.target.dataset.lat, event.target.dataset.lon, APIKey);
  getCurrentWeather("weather", event.target.dataset.lat, event.target.dataset.lon, APIKey);
 }

// display all the city search history as buttons to retrieve weather
let renderCitySearchHistory = () => {
  let historyListEl = $("#history-list");
  historyListEl.html("");
  const cities = JSON.parse(localStorage.getItem('cities'));
  // return if there are no cities saved in local storage
  if (cities === null) {return}
  for (let i=0; i<cities.length; i++) {
    if (cities[i] === null) {return}
    let itemEl = $("<li>").text(cities[i].name);
    itemEl.attr("data-city", cities[i].name);
    itemEl.attr("data-lon", cities[i].lon);
    itemEl.attr("data-lat", cities[i].lat);
    // display weather data
    itemEl.on("click", getWeather);
    historyListEl.append(itemEl);
  }
}

// display the 5 day Weather Forcast
let getForcastWeather = (queryType="forecast", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;
console.log("Hello")
  // created an AJAX call for 5 day weather forecast
  console.log("Hello")
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)

    
    let startTime = 5;
    // weather Image and desription
    const weather = `<img src="http://openweathermap.org/img/wn/${(response.list[startTime].weather[0].icon)}.png"/> ${response.list[startTime].weather[0].description}`;

    // display date, weather conditions, temperature, humidity, wind speed
    $("#dateF1").text(`${moment(response.list[startTime].dt*1000 + response.city.timezone*1000).format('dddd, DD-MM-YY, HH:ss')}`);
    $("#weatherF1").html(weather);
    $("#tempF1").text(`Temperature: ${(response.list[startTime].main.temp - 273.15).toFixed(1)} °C`); 
    $("#humidityF1").text(`Humidity: ${response.list[startTime].main.humidity} %`);
    $("#windF1").text(`Wind: ${(response.list[startTime].wind.speed * 3.6).toFixed(1)} km/h`);

});
}

// display the currentWeather
let getCurrentWeather = (queryType="weather", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // weather Image and desription
    const weather = `<img src="http://openweathermap.org/img/wn/${(response.weather[0].icon)}.png"/> ${response.weather[0].description}`;

    // display date, weather conditions, temperature, humidity, wind speed
    $("#date").text(`${moment(response.dt*1000 + response.timezone*1000).format('dddd, DD-MM-YY, HH:ss')}`);
    $("#weather").html(weather);
    $("#temp").text(`Temperature: ${(response.main.temp - 273.15).toFixed(1)} °C`); 
    $("#humidity").text(`Humidity: ${response.main.humidity} %`);
    $("#wind").text(`Wind: ${(response.wind.speed * 3.6).toFixed(1)} km/h`);
   
  }); 
}



// wait until the page has loaded
$(window).on('load', () => {
  
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
    if (city === "") {return}
    for (let i=0; i<cities.length; i++) {
      console.log(cities[i].name.toLowerCase());
      console.log(city);
      if (cities[i].name.toLowerCase() === city) {
        // display weather and return
        // getCurrentWeather("weather", response.lat, response.lon, APIKey);
        return
      } 
    } 
    // get longitude and latitude for the place and 
          // created an AJAX call for location data 
    $.ajax({
      url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`,
      method: "GET"
    }).then(function(response) {
      /* country, lat, local_names, lon, name, state */
      console.log(response)
      if (response.length >   0) {
        cities.push(response[0]); 
        localStorage.setItem("cities", JSON.stringify(cities));
        renderCitySearchHistory();
        getForcastWeather = ("forecast", response[0].lat, response[0].lon, APIKey);
        getCurrentWeather("weather", response[0].lat, response[0].lon, APIKey);
      } else {
        alert(`Sorry, I could not find the place you are looking for!`);
      }
    });
  });
    


  // display search history of all previously searched cities
  renderCitySearchHistory();

});



