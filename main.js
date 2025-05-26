const weatherForm = document.querySelector('.weatherForm');
const inputCity = document.querySelector('.inputCity');
const weatherCard = document.querySelector('.weatherCard');
const hourlyWeather = document.getElementById('hourly-weather');
const apiKey = '636e2a85cb603554fc8301cfaa867413';

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();

    const city = inputCity.value 

    if(city) {
       try {
        const weatherData = await getWeatherdata(city);
        getWeatherInfo(weatherData);
       }
       catch(error) {
        console.error(error);
        displayError(error);
       }
    }
    else {
        displayError('Please enter a city');
    }

    
});

async function getWeatherdata(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error('Could not fetch weather data');
    }

    return await response.json();

    // const forcastUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}`;

    // const responsecast = await fetch(forcastUrl);

    // console.log(responsecast);
}

function getWeatherInfo(data) {

    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
        
    weatherCard.textContent = '';

    const cityName = document.createElement('h1');
    const weatherEmoji = document.createElement('p');
    const tempName = document.createElement('p');
    const humidityName = document.createElement('p');
    const descName = document.createElement('p');

    cityName.textContent = city;
    weatherEmoji.textContent = getWeatherEmoji(id);
    tempName.textContent = `${(temp - 273.15). toFixed(1)}°C`;
    humidityName.textContent = `Humidity: ${humidity}%`;
    descName.textContent = description;

    cityName.classList.add('cityName');
    weatherEmoji.classList.add('weatherEmoji');
    tempName.classList.add('tempName');
    humidityName.classList.add('humidityName');
    descName.classList.add('descName');

    weatherCard.appendChild(cityName);
    weatherCard.appendChild(weatherEmoji);
    weatherCard.appendChild(tempName);
    weatherCard.appendChild(humidityName);
    weatherCard.appendChild(descName);

}

function getWeatherEmoji(weatherId) {

    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }

}

function displayError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('errorMessage');

    weatherCard.textContent = '';
    weatherCard.appendChild(errorMessage);
}