const apiKey = "e01b7ac2a2a3a4e82568343c54fcfd6d";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const unitSelect = document.getElementById("unitSelect");
const statusEl = document.getElementById("status");
const daysEl = document.getElementById("days");
const themeToggle = document.getElementById("themeToggle");
const palettePicker = document.getElementById("palettePicker");

let groupedDays = {};
let selectedDay = null;
let activeTab = "temp";

let timezoneOffset = 0;
let currentCity = "";
let currentCountry = "";
let isMyLocation = false;

let clockInterval = null;

/* EVENTS */
searchBtn.onclick = () => {
  if (cityInput.value.trim()) {
    isMyLocation = false;
    fetchWeather(`q=${cityInput.value}`);
  }
};

locBtn.onclick = () => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      isMyLocation = true;
      fetchWeather(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    },
    () => alert("Location access denied")
  );
};

document.querySelectorAll(".tabs span").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tabs span").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeTab = tab.dataset.type;
    updateUI();
  };
});

window.onload = () => fetchWeather("q=Manila");

/* FETCH WEATHER */
async function fetchWeather(query) {
  statusEl.textContent = "Loading weather...";

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${apiKey}&units=${unitSelect.value}`
  );
  const data = await res.json();

  timezoneOffset = data.city.timezone;
  currentCity = data.city.name;
  currentCountry = data.city.country;

  groupedDays = groupByDay(data.list);
  selectedDay = Object.keys(groupedDays)[0];

  renderDays();
  updateUI();
  startRealtimeClock();
  autoThemeByTime();

  statusEl.textContent = "Weather loaded";
}

/* GROUP BY DAY */
function groupByDay(list) {
  const days = {};
  list.forEach(i => {
    const local = new Date((i.dt + timezoneOffset) * 1000);
    const key = local.toISOString().split("T")[0];
    if (!days[key]) days[key] = [];
    days[key].push(i);
  });
  return days;
}

/* DAYS */
function renderDays() {
  daysEl.innerHTML = "";
  Object.keys(groupedDays).slice(0,5).forEach(d => {
    const el = document.createElement("div");
    el.className = "day" + (d === selectedDay ? " active" : "");
    el.textContent = new Date(d).toLocaleDateString(undefined,{weekday:"short"});
    el.onclick = () => {
      selectedDay = d;
      renderDays();
      updateUI();
    };
    daysEl.appendChild(el);
  });
}

/* UI */
function updateUI() {
  const data = groupedDays[selectedDay];
  const mid = data[4] || data[0];

  document.getElementById("mainTemp").textContent = Math.round(mid.main.temp) + "°";
  document.getElementById("rightDesc").textContent = mid.weather[0].description;
  document.getElementById("mainIcon").textContent = icon(mid.weather[0].id);

  document.getElementById("locationName").textContent =
    isMyLocation
      ? `My Location — ${currentCity}, ${currentCountry}`
      : `${currentCity}, ${currentCountry}`;

  document.getElementById("mainMeta").innerHTML = `
    Humidity: ${mid.main.humidity}%<br>
    Wind: ${mid.wind.speed} km/h
  `;

  renderChart(data.slice(0,8));
  updateAnalytics(data);
}

/* REALTIME CLOCK */
function startRealtimeClock() {
  if (clockInterval) clearInterval(clockInterval);

  clockInterval = setInterval(() => {
    const local = new Date(Date.now() + timezoneOffset * 1000);
    document.getElementById("rightDate").textContent =
      local.toLocaleString([], {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
  }, 1000);
}

/* HOURLY */
function renderChart(slots) {
  const container = document.getElementById("chartContent");
  container.innerHTML = "";

  slots.forEach(d => {
    const time = new Date((d.dt + timezoneOffset) * 1000)
      .toLocaleTimeString([], { hour:"numeric" });

    if (activeTab === "temp") {
      container.innerHTML += `
        <div class="chart-item">
          <div class="chart-value">${Math.round(d.main.temp)}°</div>
          <div class="temp-line"></div>
          <div>${time}</div>
        </div>`;
    }

    if (activeTab === "rain") {
      const pop = Math.round((d.pop||0)*100);
      container.innerHTML += `
        <div class="chart-item">
          <div class="chart-value">${pop}%</div>
          <div class="rain-bar">
            <div class="rain-fill" style="height:${pop}%"></div>
          </div>
          <div>${time}</div>
        </div>`;
    }

    if (activeTab === "wind") {
      container.innerHTML += `
        <div class="chart-item">
          <div class="chart-value">${Math.round(d.wind.speed)} km/h</div>
          <div class="wind-arrow" style="transform:rotate(${d.wind.deg}deg)">➤</div>
          <div>${time}</div>
        </div>`;
    }
  });
}

/* ANALYTICS */
function updateAnalytics(data) {
  const temps = data.map(d=>d.main.temp);
  const avg = temps.reduce((a,b)=>a+b,0)/temps.length;

  document.getElementById("tempStats").innerHTML =
    `<strong>Temperature</strong><br>Avg: ${avg.toFixed(1)}°`;

  document.getElementById("humidityStats").innerHTML =
    `<strong>Humidity</strong><br>Avg: ${
      Math.round(data.reduce((a,b)=>a+b.main.humidity,0)/data.length)
    }%`;

  document.getElementById("rainStats").innerHTML =
    `<strong>Precipitation</strong><br>${
      Math.round(data.reduce((a,b)=>a+(b.pop||0),0)/data.length*100)
    }%`;

  document.getElementById("trendStats").innerHTML =
    `<strong>Trend</strong><br>${
      temps.at(-1)>temps[0]?"Increasing":"Stable"
    }`;
}

/* THEME */
function autoThemeByTime() {
  const hour = new Date(Date.now() + timezoneOffset * 1000).getHours();
  if (hour >= 6 && hour < 18) {
    document.body.classList.add("light");
    themeToggle.textContent = "🌞";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
}

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
};

/* ACCENT */
palettePicker.onchange = () => {
  document.documentElement.style.setProperty("--accent", palettePicker.value);
};

/* ICON */
function icon(id) {
  if (id === 800) return "☀️";
  if (id < 600) return "🌧️";
  return "☁️";
}
