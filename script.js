document.addEventListener('DOMContentLoaded', () => {
    // 1. Get all necessary elements by their IDs
    const locationForm = document.getElementById('locationForm');
    const locationInput = document.getElementById('locationInput');
    const locationPage = document.getElementById('locationPage');
    const weatherPage = document.getElementById('weatherPage');
    const backButton = document.getElementById('backButton');
    
    // Elements to populate (for demo purposes)
    const weatherLocation = document.getElementById('weatherLocation');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const pressure = document.getElementById('pressure');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDate = document.getElementById('weatherDate');

    // --- Utility Functions ---

    // Dummy data for demonstration
    const dummyWeather = {
        city: 'Tokyo, Japan',
        temp: '18°C',
        desc: 'Scattered Clouds',
        humidityVal: '55%',
        wind: '12 km/h',
        pressureVal: '1015 hPa',
        icon: 'assets/cloud.png' 
    };

    const formatDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        weatherDate.textContent = new Date().toLocaleDateString('en-US', options);
    };

    const displayWeather = (data) => {
        weatherLocation.textContent = data.city;
        temperature.textContent = data.temp;
        description.textContent = data.desc;
        humidity.textContent = data.humidityVal;
        windSpeed.textContent = data.wind;
        pressure.textContent = data.pressureVal;
        // Check the icon path to make sure the image exists in assets folder
        weatherIcon.src = data.icon; 
        formatDate();
    };

    // --- Event Listeners ---

    // 1. Handle Form Submission (Clicking "Get Weather")
    if (locationForm) {
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the form from submitting normally (reloading the page)
            
            const location = locationInput.value.trim();

            if (location) {
                // Update dummy location for demonstration
                dummyWeather.city = location; 
                
                displayWeather(dummyWeather);
                
                // Switch views: HIDE location, SHOW weather
                locationPage.classList.add('hidden');
                weatherPage.classList.remove('hidden');
            }
        });
    }


    // 2. Handle Back Button (Clicking "Change Location")
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Switch views back: HIDE weather, SHOW location
            weatherPage.classList.add('hidden');
            locationPage.classList.remove('hidden');
            locationInput.value = ''; // Clear input
        });
    } else {
        console.error("Back button not found!");
    }
});


// api key 
document.addEventListener('DOMContentLoaded', () => {
    
    const API_KEY = '96906bf5694abd96ca79ae0bd4d4bb95';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    // 1. Get all necessary elements by their IDs
    const locationForm = document.getElementById('locationForm');
    const locationInput = document.getElementById('locationInput');
    const locationPage = document.getElementById('locationPage');
    const weatherPage = document.getElementById('weatherPage');
    const backButton = document.getElementById('backButton');
    
    // Elements to populate
    const weatherLocation = document.getElementById('weatherLocation');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const pressure = document.getElementById('pressure');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherDate = document.getElementById('weatherDate');

    // --- Utility Functions ---

    const formatDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        weatherDate.textContent = new Date().toLocaleDateString('en-US', options);
    };

    // Displays the processed weather data on the page
    const displayWeather = (data) => {
        weatherLocation.textContent = data.city;
        temperature.textContent = data.temp;
        description.textContent = data.desc;
        humidity.textContent = data.humidityVal;
        windSpeed.textContent = data.wind;
        pressure.textContent = data.pressureVal;
        weatherIcon.src = data.icon; 
        formatDate();
    };


    
    async function fetchWeather(city) {
        // Construct the full URL with the user's city, metric units, and your API key
        const URL = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
        
        try {
            // 1. Fetch the data from the API
            const response = await fetch(URL); 
            
            // Check if the response was successful (e.g., 404 Not Found)
            if (!response.ok) {
                // Throw an error if the city is not found or key is invalid
                throw new Error('City not found or invalid API request.');
            }
            
            // 2. Parse the JSON data
            const weatherData = await response.json();

            // 3. Map the raw API data to your display structure
            const realData = {
                city: weatherData.name + ', ' + weatherData.sys.country,
                temp: Math.round(weatherData.main.temp) + '°C',
                desc: weatherData.weather[0].description,
                humidityVal: weatherData.main.humidity + '%',
                // Wind speed is typically in m/s, converting to km/h (m/s * 3.6)
                wind: Math.round(weatherData.wind.speed * 3.6) + ' km/h', 
                pressureVal: weatherData.main.pressure + ' hPa',
                // Construct the URL for the specific weather icon
                icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            };

            // Display the real data
            displayWeather(realData);

        } catch (error) {
            console.error("Weather fetching failed:", error);
            alert("Could not get weather for that location. Please try again or check your API key.");
            
            // On failure, switch back to the location input page
            weatherPage.classList.add('hidden');
            locationPage.classList.remove('hidden');
        }
    }


    // --- Event Listeners ---

    // 1. Handle Form Submission (Clicking "Get Weather")
    if (locationForm) {
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const location = locationInput.value.trim();

            if (location) {
                // Switch views immediately
                locationPage.classList.add('hidden');
                weatherPage.classList.remove('hidden');

                // *** NEW CALL: Fetch real weather based on user input ***
                fetchWeather(location); 
            }
        });
    }


    // 2. Handle Back Button (Clicking "Change Location")
    if (backButton) {
        backButton.addEventListener('click', () => {
            weatherPage.classList.add('hidden');
            locationPage.classList.remove('hidden');
            locationInput.value = ''; // Clear input
        });
    }
});
