let lat  = "51.5";
let lon = "0";
//let city = "London";
let APIKey = "4ddb322a76968b6cb599fa2b021f691b";
let queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
//let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

let historyListEl = $("#history-list");

// display all the city search history as buttons
let renderCitySearchHistory = () => {
  const cities = JSON.parse(localStorage.getItem('cities'));
  for (let i=0; i<cities.length; i++) {
    let cityEl = $("<li>").text(cities[i]);
    // display weather data
    cityEl.on("click", console.log(cities[i]))
    historyListEl.append(cityEl);
  }
}

// display the currentWeather
let currentWeather = (city) => {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  console.log(city);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);
    // temperature (converted from Kelvin)
    console.log(response.main.temp - 273.15)
  /*
    (".city").html(`<h1>${response.name} Weather Details</h1>`)
    $(".wind").text(`Wind Speed: ${response.wind.speed}`)
    $(".humidity").text(`Humidity: ${response.main.humidity}`)
    $(".temp").text(`Temperature [degC]: ${(response.main.temp - 273.15).toFixed(1)}`)
  */
  
  });
}


// initialise cities array, get cities from local storage
let cities = JSON.parse(localStorage.getItem('cities'));
console.log(cities);
if (cities === null) {cities = []}

//get city from search input with the submit button
let searchButton = $("#search-button")

searchButton.on("click", (event) => {
  event.preventDefault();
  let city = $("#search-input").val().toLowerCase().trim();
  $("#search-input").val("");

  // searched cities saved to local starage and buttons rendered
  if (city !== "" && !cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    renderCitySearchHistory();
  }
  currentWeather(city);
});


// display search history of all previously searched cities
renderCitySearchHistory();

/*
// created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  
  // Create CODE HERE to Log the queryURL
  console.log(queryURL);
  // Create CODE HERE to log the resulting object
  console.log(response);
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Create CODE HERE to transfer content to HTML
  // Hint: To convert from Kelvin to Celsius: C = K - 273.15
  // Create CODE HERE to dump the temperature content into HTML

  console.log(response.main.temp - 273.15)
/*
  (".city").html(`<h1>${response.name} Weather Details</h1>`)
  $(".wind").text(`Wind Speed: ${response.wind.speed}`)
  $(".humidity").text(`Humidity: ${response.main.humidity}`)
  $(".temp").text(`Temperature [degC]: ${(response.main.temp - 273.15).toFixed(1)}`)


});*/

/*
// created an AJAX call
$.ajax({
  url: queryURL2,
  method: "GET"
}).then(function(response) {
  
  // Create CODE HERE to Log the queryURL
  console.log(queryURL2);
  // Create CODE HERE to log the resulting object
  console.log(response);
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Create CODE HERE to transfer content to HTML
  // Hint: To convert from Kelvin to Celsius: C = K - 273.15
  // Create CODE HERE to dump the temperature content into HTML

  console.log(response.main.temp - 273.15)
/*
  $(".city").html(`<h1>${response.name} Weather Details</h1>`)
  $(".wind").text(`Wind Speed: ${response.wind.speed}`)
  $(".humidity").text(`Humidity: ${response.main.humidity}`)
  $(".temp").text(`Temperature [degC]: ${(response.main.temp - 273.15).toFixed(1)}`)


});*/

