//create local storage
var cities = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var apiKey = "5abd73aeb1b3de420209d0778a1f8ae9";
var citySelection = document.querySelector("#city")
var userFormEl = document.querySelector('.submitbtn');
var currentWeather = document.querySelector("#today-forecast")

console.log("hello")
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = citySelection.value.trim();

    if (cityName) {
        getApi(cityName);

        citySelection.textContent = '';
    } else {
        alert('Please enter a valid city name');
    }
};

function getApi(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=5abd73aeb1b3de420209d0778a1f8ae9";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)

                    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=5abd73aeb1b3de420209d0778a1f8ae9&units=imperial"
                    fetch(apiUrl2).then(function (weatherdata) {
                        weatherdata.json().then(function (data) { console.log(data.current)
                            currentWeather.innerHTML = ""
                            var cityName = document.createElement("p")
                            cityName.innerText = city + " " + moment().format("L")
                            currentWeather.appendChild(cityName)
                            var temp = document.createElement("p")
                            temp.innerText = data.current.temp 
                            currentWeather.appendChild(temp) 
                            var humidity = document.createElement("p")
                            humidity.innerText = data.current.humidity
                            currentWeather.appendChild(humidity)
                            var uvIndex = document.createElement("p")
                            uvIndex.innerText = data.current.uvIndex
                            currentWeather.appendChild(uvIndex)
                           
                        })
                    })
                });
            } else {
                alert('Error:' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to API');
        });
};

// function forecast(city) {
//     var forcastApi = "https://api.openweathermap.org/data/2.5/forecast?q" + city "&appid=5abd73aeb1b3de420209d0778a1f8ae9" + key + "&cnt=5"
// }

userFormEl.addEventListener('click', formSubmitHandler);
