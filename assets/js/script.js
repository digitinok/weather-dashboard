let lat  = "51.5";
let lon = "0";
let apiKey = "4ddb322a76968b6cb599fa2b021f691b";
let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;


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
    $(".city").html(`<h1>${response.name} Weather Details</h1>`)
    $(".wind").text(`Wind Speed: ${response.wind.speed}`)
    $(".humidity").text(`Humidity: ${response.main.humidity}`)
    $(".temp").text(`Temperature [degC]: ${(response.main.temp - 273.15).toFixed(1)}`)
  */

  });
  
