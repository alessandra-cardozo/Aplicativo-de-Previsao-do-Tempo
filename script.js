const searchInput = document.querySelector(".search-input");
const locationButton = document.querySelector(".location-button");
const currentWeatherDiv = document.querySelector(".current-weather");
const hourlyWeather = document.querySelector(".hourly-weather .weather-list");

const API_KEY = "9ca60a7b500a429b86f81846242809"; // Substitua pela sua chave API

const weatherCodes = {
    clear: [1000],
    clouds: [1003, 1006, 1009],
    mist: [1030, 1135, 1147],
    rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
    moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
    snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
    thunder: [1087, 1279, 1282],
    thunder_rain: [1273, 1276],
};

const displayHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
        const forecastTime = new Date(time).getTime();
        return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    hourlyWeather.innerHTML = next24HoursData.map((item) => {
        const temperature = Math.floor(item.temp_c);
        const time = item.time.split(' ')[1].substring(0, 5);
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(item.condition.code)) || 'clear';

        return `<li class="weather-item">
                    <p class="time">${time}</p>
                    <img src="imagem/icons/${weatherIcon}.svg" class="weather-icon" onerror="this.src='imagem/icons/default.svg';">
                    <p class="temperature">${temperature}°</p>
                </li>`;
    }).join('');
};

const getWeatherDetails = async (API_URL) => {
    window.innerWidth <= 768 && searchInput.blur();
    document.body.classList.remove("show-no-results");

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();

        const temperature = Math.floor(data.current.temp_c);
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code)) || 'clear';

        currentWeatherDiv.querySelector(".weather-icon").src = `imagem/icons/${weatherIcon}.svg`;
        currentWeatherDiv.querySelector(".temperature").innerHTML = `${temperature}<span>°C</span>`;
        currentWeatherDiv.querySelector(".description").innerText = description;

        const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];

        searchInput.value = data.location.name;
        displayHourlyForecast(combinedHourlyData);
    } catch (error) {
        document.body.classList.add("show-no-results");
    }
};

const setupWeatherRequest = (cityName) => {
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`;
    getWeatherDetails(API_URL);
};

const cities = ["São Paulo", "Rio de Janeiro", "Brasília", "New York", "London"];
let currentIndex = 0;

const updateWeatherForCities = () => {
    setupWeatherRequest(cities[currentIndex]);
    currentIndex = (currentIndex + 1) % cities.length;
};

searchInput.addEventListener("keyup", (e) => {
    const cityName = searchInput.value.trim();

    if (e.key === "Enter" && cityName) {
        setupWeatherRequest(cityName);
    }
});

locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
            getWeatherDetails(API_URL);
        },
        (error) => {
            console.error("Error getting location", error);
        }
    );
});

window.addEventListener("load", updateWeatherForCities);
setInterval(updateWeatherForCities, 60000 * 60); // Atualiza a cada hora