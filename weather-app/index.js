const state = new Proxy({
    location: "N/A",
    "main-temperature": "N/A",
    "weather-main": "N/A",
    "feels-like": "N/A",
    humidity: "N/A",
    wind: "N/A",
    "wind-gust": "N/A"
}, {
    set(target, property, value) {
        target[property] = value;
        if (typeof elements !== "undefined" && elements[property]) {
            if (property === "main-temperature" && value !== "N/A") {
                elements[property].textContent = value;
            } else if (property === "feels-like" && value !== "N/A") {
                elements[property].textContent = `${value} °C`;
            } else if (property === "humidity" && value !== "N/A") {
                elements[property].textContent = `%${value}`;
            } else if (property === "wind" && value !== "N/A") {
                elements[property].textContent = `${value} m/s`;
            } else if (property === "wind-gust" && value !== "N/A") {
                elements[property].textContent = `${value} m/s`;
            } else {
                elements[property].textContent = value;
            }
        }
        return true;
    }
});

const elements = {
    citySelect: document.getElementById("city-select"),
    getWeatherBtn: document.getElementById("get-weather-btn"),
    weatherIcon: document.getElementById("weather-icon"),
    
    location: document.getElementById("location"),
    "main-temperature": document.getElementById("main-temperature"),
    "weather-main": document.getElementById("weather-main"),
    "feels-like": document.getElementById("feels-like"),
    humidity: document.getElementById("humidity"),
    wind: document.getElementById("wind"),
    "wind-gust": document.getElementById("wind-gust")
};

async function getWeather(city) {
    try {
        const targetCity = city.toLowerCase().trim();
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${targetCity}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hava durumu verisi çekilirken hata oluştu:", error);
        return null; 
    }
}

async function showWeather(city) {
    if (!city || city.trim() === "") return;

    const data = await getWeather(city);
    if (!data) {
        alert("Something went wrong, please try again later.");
        return;
    }
    const safeValue = (val) => (val !== undefined && val !== null ? val : "N/A");

    state.location = safeValue(data.name);
    state["main-temperature"] = safeValue(data.main?.temp);
    state["feels-like"] = safeValue(data.main?.feels_like);
    state.humidity = safeValue(data.main?.humidity);
    state.wind = safeValue(data.wind?.speed);
    state["wind-gust"] = safeValue(data.wind?.gust);
    
    if (data.weather && data.weather[0]) {
        state["weather-main"] = safeValue(data.weather[0].main);
        
        if (elements.weatherIcon && data.weather[0].icon) {
            elements.weatherIcon.src = data.weather[0].icon;
            elements.weatherIcon.alt = data.weather[0].description || "Weather Icon";
        }
    } else {
        state["weather-main"] = "N/A";
    }
}

function initEventListeners() {
    if (elements.getWeatherBtn && elements.citySelect) {
        elements.getWeatherBtn.addEventListener("click", () => {
            const selectedCity = elements.citySelect.value;
            showWeather(selectedCity);
        });
    }
}

function init() {
    Object.keys(state).forEach(key => {
        state[key] = state[key];
    });
    initEventListeners();
}

document.addEventListener("DOMContentLoaded", init);