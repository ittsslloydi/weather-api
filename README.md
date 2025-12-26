# Weather App

A dynamic web-based weather application that allows users to check current weather and 5-day forecasts for any city using the OpenWeatherMap API.

## 🔧 How It Works

1. **Weather Data Fetching**: The app connects to OpenWeatherMap API to retrieve real-time weather data
2. **Location Detection**: On first load, it displays weather for Manila. You can search for any city or use your device's GPS location
3. **5-Day Forecast**: Weather data is organized by day, allowing you to view forecasts for the next 5 days
4. **Real-time Updates**: The app displays a live clock synchronized with the location's timezone
5. **Dynamic Theming**: The background theme automatically adjusts based on time of day
6. **Unit Conversion**: Toggle between Celsius and Fahrenheit at any time
7. **View Tabs**: Switch between Temperature, Humidity, and Wind Speed tabs

## Features

- **Current Weather Display**: Real-time temperature, weather conditions, humidity, and wind speed
- **Search for Any City**: Enter any city name to get instant weather data
- **GPS Location Support**: Use your device's location to automatically find weather at your current position
- **5-Day Weather Forecast**:
  - Organized by day with hourly breakdowns
  - Plan ahead with detailed forecasts
  - Easy day-by-day navigation
- **Temperature Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F) anytime
- **Multiple Metrics Display**:
  - Temperature display with current conditions
  - Humidity percentage and levels
  - Wind speed in knots or m/s
  - All metrics update based on selected unit
- **Real-time Clock**: Live clock synchronized with the location's timezone
- **Dynamic Background Themes**:
  - Automatically adjusts based on time of day
  - Morning, afternoon, evening, and night themes
  - Sunrise and sunset data integration
- **Light and Dark Mode**: Manual theme toggle for light and dark interfaces
- **Color Palette Customization**: Personalize the look and feel of your weather app
- **Responsive and Clean Design**: Professional UI that works on all screen sizes
- **Weather Alerts**: Real-time weather condition updates
- **No API Key Required**: Uses OpenWeatherMap free API tier

## How to Use

### Quick Start

1. **Open the Application**:

   - Open `index.html` in your web browser
   - No installation or server setup required
   - Internet connection is required for weather data

2. **View Default Weather**:
   - The app automatically loads and displays weather for Manila on first open
   - You'll see current temperature, conditions, humidity, and wind speed
   - A real-time clock shows the current time in that location

### Searching for Weather

1. **Search by City Name**:

   - Click the search input box at the top of the page
   - Type the name of any city (e.g., "New York", "Tokyo", "London")
   - Press Enter or click the search button to submit
   - Weather data will load for that city with all current metrics

2. **Search Suggestions**:
   - Search is case-insensitive
   - Use full city names for best results
   - You can search for cities in any country

### Using Your Location

1. **Get Weather at Your Location**:
   - Click the location pin button (📍) in the search area
   - Your browser will request permission to access your location
   - Allow the permission when prompted
   - Weather data will load for your current GPS coordinates
   - The clock will show time in your local timezone

### Viewing Weather Details

1. **Current Weather Display**:

   - **Temperature**: Large display showing current temperature
   - **Weather Description**: Cloud status, rain, clear skies, etc.
   - **Humidity**: Percentage of moisture in the air
   - **Wind Speed**: Wind velocity and direction

2. **5-Day Forecast**:

   - Scroll down to see the forecast section
   - Click different day tabs to view forecasts for future days
   - Each day shows hourly breakdowns and conditions

3. **Information Tabs**:
   - Click tabs to switch between different metrics:
     - **Temperature Tab**: Current and forecast temperatures
     - **Humidity Tab**: Humidity percentages for each day
     - **Wind Tab**: Wind speed and direction data

### Unit Conversion

1. **Toggle Temperature Units**:
   - Click the temperature unit button (°C / °F) in the top right
   - All temperature values instantly convert
   - Wind speed may also update based on selected unit
   - Your preference is remembered for future visits

### Theme Customization

1. **Light/Dark Mode**:

   - Click the theme toggle button (☀️/🌙) in the top right
   - Switches between light and dark interfaces
   - Dark mode is easier on the eyes at night

2. **Automatic Time-based Theme** (if enabled):

   - Background theme changes based on local time
   - Morning: Golden sunrise theme
   - Afternoon: Bright blue sky
   - Evening: Orange sunset theme
   - Night: Dark theme with stars

3. **Color Palette**:
   - Look for color customization options in settings
   - Personalize accent colors and button colors
   - Changes apply to all weather displays

### Tips for Best Results

- **Search Multiple Locations**: Search for different cities to compare weather
- **Check Forecast**: Always check the 5-day forecast for planning activities
- **Monitor Wind**: Useful for outdoor activities, sports, or travel planning
- **Humidity Matters**: High humidity can affect how temperature feels
- **Real-time Updates**: Data refreshes when you search or enable location
- **Bookmark Your Cities**: Save favorite locations for quick access (if available)

### Troubleshooting

- **No results found**: Check the spelling of the city name
- **Location not working**: Make sure you allowed location permission in your browser
- **Data not updating**: Refresh the page or search again
- **Weather seems wrong**: Verify the correct location was found (it might find a differently spelled city)
- **Forecast not showing**: Scroll down to ensure the forecast section is visible
- **App not loading**: Check your internet connection and refresh the page6. **Change Units**: Use the dropdown menu to switch between °C and °F

7. **Toggle Theme**: Use the theme toggle button to switch between light and dark modes

8. **Customize Colors**: Click the palette picker to change the color scheme

## Files

- `index.html` — Main HTML file for the app interface
- `script.js` — JavaScript file containing the app logic and API calls
- `style.css` — CSS file for styling the app

## Requirements

- Internet connection (for fetching weather data from the API)

## License

This project is for educational purposes.
