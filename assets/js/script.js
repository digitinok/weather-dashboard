const APIKey = "4ddb322a76968b6cb599fa2b021f691b";

let displayWeather = (city, lat, lon) => {
  // display current weather
  $("#city").text(`${city}`);
  getCurrentWeather("weather", lat, lon, APIKey);
  getForcastWeather("forecast", lat, lon, APIKey);
}

let getWeather = (event) => {
  // display the weather
  data = event.target.dataset;
  displayWeather(data.name, data.lat, data.lon);  
 }

// display all the city search history as buttons to retrieve weather
let renderCitySearchHistory = () => {
  let historyListEl = $("#history-list");
  historyListEl.html("");
  const cities = JSON.parse(localStorage.getItem('cities'));
  // return if there are no cities saved in local storage
  if (cities === null) {return}
  for (const city in cities) {
    if (cities[city] === null) {return}
    let itemEl = $("<li>").text(cities[city].name);
    itemEl.attr("data-name", cities[city].name);
    itemEl.attr("data-lon", cities[city].lon);
    itemEl.attr("data-lat", cities[city].lat);
    // display weather data
    itemEl.on("click", getWeather);
    historyListEl.append(itemEl);
  }
}

// display the 5 day Weather Forcast
let getForcastWeather = (queryType="forecast", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  // created an AJAX call for 5 day weather forecast
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response) 
    // find next lunchtime to display data
    let startTime = 5;
    let nextTime = startTime;

    //5 day weather forcast
    for (let i=0; i<5; i++) {
      
      if (i!==0){nextTime+=8;} // 8 time steps for 24 hours
      let dateEl = $("<h5></h5>");
      let weatherImg = $("<p></p>");
      let weatherEl = $("<p></p>");
      let tempEl = $("<p></p>");
      let humidityEl = $("<p></p>");
      let windEl = $("<p></p>");

      // display date, weather conditions, temperature, humidity, wind speed
      dateEl.text(`${moment(response.list[nextTime].dt*1000 + response.city.timezone*1000).format('ddd, DD.MM.YY')}`);
      weatherImg.html(`<img src="http://openweathermap.org/img/wn/${(response.list[nextTime].weather[0].icon)}.png"/>`);
      weatherEl.text(`${response.list[nextTime].weather[0].description}`);
      tempEl.text(`Temp: ${(response.list[nextTime].main.temp - 273.15).toFixed(1)} °C`); 
      humidityEl.text(`Humidity: ${response.list[nextTime].main.humidity} %`);
      windEl.text(`Wind: ${(response.list[nextTime].wind.speed * 3.6).toFixed(1)} km/h`);
      //append data to corresponding card
      $("#"+i.toString()).html("");
      $("#"+i.toString()).append(dateEl, weatherImg, weatherEl, tempEl, humidityEl, windEl);

    }

});
}

// display the currentWeather
let getCurrentWeather = (queryType="weather", lat, lon, APIKey) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/${queryType}?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    // display date, weather conditions, temperature, humidity, wind speed
    $("#date").text(`${moment(response.dt*1000 + response.timezone*1000).format('dddd, DD.MM.YYYY, HH:ss')}`);
    $("#weather-img").html(`<img src="http://openweathermap.org/img/wn/${(response.weather[0].icon)}.png"/>`);
    $("#weather").text(`${response.weather[0].description}`);
    $("#temp").text(`Temperature: ${(response.main.temp - 273.15).toFixed(1)} °C`); 
    $("#humidity").text(`Humidity: ${response.main.humidity} %`);
    $("#wind").text(`Wind: ${(response.wind.speed * 3.6).toFixed(1)} km/h`);
   
  }); 
}

let citySearch = () => {
  // initialise cities array, get cities from local storage
  let cities = JSON.parse(localStorage.getItem('cities'));
  if (cities === null) {cities = {};}

  // read the value from the input field 
  let city = $("#search-input").val().toLowerCase().trim();
  $("#search-input").val("");

  // check if city is already in list
  if (city === "") {return}
  //for (let i=0; i<cities.length; i++) {

    if (city in cities) {
      // display city name, weather, forcast and return
      displayWeather(cities[city].name, cities[city].lat, cities[city].lon);
      return
    } 
  //} 
  // get longitude and latitude for the new city 
  // created an AJAX call for location data 
  $.ajax({
    url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`,
    method: "GET"
  }).then(function(response) {
    /* country, lat, local_names, lon, name, state */
    if (response.length >   0) {
      
      // searched cities saved to local storage and buttons rendered
      cities[city] = {
        name: response[0].name,
        lat: response[0].lat,
        lon: response[0].lon,
        country: response[0].country}; 

      localStorage.setItem("cities", JSON.stringify(cities));
      renderCitySearchHistory();
      // display city name, weather, forcast and return
      displayWeather(cities[city].name, cities[city].lat, cities[city].lon);
    } else {
      alert(`Sorry, I could not find the place you are looking for!`);
    }
  });
}


// wait until the page has loaded
$(window).on('load', () => {
  
  // initialise cities array, get cities from local storage
  let cities = JSON.parse(localStorage.getItem('cities'));
  if (cities === null) {
    cities = {};
    // as default show the weather for London
    displayWeather("London", 51.5073219, -0.1276474);
  }
  else {
    // display search history of all previously searched cities
    renderCitySearchHistory();
    // display the weather of the first city saved  
    const city = Object.keys(cities)[0];
    displayWeather(cities[city].name, cities[city].lat, cities[city].lon);
    console.log(city);
  }

  // get city from search input with the submit button
  let searchButton = $("#search-button")
  searchButton.on("click", (event) => {
    event.preventDefault();
    citySearch();
  });
    
});



