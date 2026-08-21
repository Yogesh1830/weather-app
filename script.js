// OpenWeatherMap API configuration variables
const apiKey = '3a3f92fd928a0819bfdf9048032e69de'; 

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        fetchWeatherData(cityName);
    }
});

// Allow triggering search by pressing the Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = cityInput.value.trim();
        if (cityName) fetchWeatherData(cityName);
    }
});

function fetchWeatherData(city) {
    const url = `https://openweathermap.org{city}&appid=${apiKey}&units=metric`;

    // Asynchronous network data retrieval logic
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(err => {
            showError();
        });
}

function displayWeather(data) {
    // Reveal data container panels and conceal errors
    weatherInfo.classList.remove('hidden');
    errorMsg.classList.add('hidden');

    // Parse and render values onto target DOM nodes
    document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = Math.round(data.main.temp);
    document.getElementById('condition').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
}

function showError() {
    weatherInfo.classList.add('hidden');
    errorMsg.classList.remove('hidden');
}
