<template>
  <div class="page">
    <p class="page__label">Vue weather</p>
    <div class="page__card">
      <AppHeader
        @toggleTheme="toggleTheme"
        @openModal="modalOpen = true" />

      <div class="page__main">
        <WeatherCard
          :temp="weather.temp"
          :day-label="weather.dayLabel"
          :time="weather.time"
          :city="weather.city"
          :icon-type="weather.iconType" />

        <WeatherDetails
          :temp="weather.temp"
          :feels-like="weather.feelsLike"
          :pressure="weather.pressure"
          :precipitation="weather.precipitation"
          :wind-speed="weather.windSpeed"
          :wind-dir="weather.windDir"
          :wind-desc="weather.windDesc" />
      </div>

      <WeeklyForecast
        :days="days"
        :is-open="weeklyOpen"
        :active-index="activeDay"
        @toggle="weeklyOpen = !weeklyOpen"
        @selectDay="onSelectDay" />
    </div>

    <CityModal
      :is-open="modalOpen"
      :selected-city="weather.city"
      @close="modalOpen = false"
      @selectCity="onSelectCity" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeatherDetails from "@/components/WeatherDetails.vue";
import WeeklyForecast from "@/components/WeeklyForecast.vue";
import CityModal from "@/components/CityModal.vue";

const colorMode = useColorMode();
const modalOpen = ref(false);
const weeklyOpen = ref(true);
const activeDay = ref(0);

const weather = reactive({
  temp: 0,
  feelsLike: 0,
  pressure: 0,
  precipitation: "Без осадков",
  windSpeed: 0,
  windDir: "С",
  windDesc: "тихий",
  city: "Ташкент",
  dayLabel: "Сегодня",
  time: "00:00",
  iconType: "cloudy",
});

function toggleTheme() {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}

async function loadWeather(city) {
  const API_KEY = "13646338cd68cc67e0d93decd0210ad9";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`,
    );
    const data = await res.json();
    if (data.cod !== 200) return;

    weather.temp = Math.round(data.main.temp);
    weather.feelsLike = Math.round(data.main.feels_like);
    weather.pressure = data.main.pressure;
    weather.windSpeed = data.wind.speed;
    weather.precipitation = data.weather[0].description;
    weather.city = data.name;

    const main = data.weather[0].main.toLowerCase();
    if (main.includes("clear")) weather.iconType = "sunny";
    else if (main.includes("rain") || main.includes("drizzle"))
      weather.iconType = "rainy";
    else weather.iconType = "cloudy";

    const deg = data.wind.deg;
    if (deg > 337.5 || deg <= 22.5) weather.windDir = "С";
    else if (deg > 22.5 && deg <= 67.5) weather.windDir = "СВ";
    else if (deg > 67.5 && deg <= 112.5) weather.windDir = "В";
    else if (deg > 112.5 && deg <= 157.5) weather.windDir = "ЮВ";
    else if (deg > 157.5 && deg <= 202.5) weather.windDir = "Ю";
    else if (deg > 202.5 && deg <= 247.5) weather.windDir = "ЮЗ";
    else if (deg > 247.5 && deg <= 292.5) weather.windDir = "З";
    else if (deg > 292.5 && deg <= 337.5) weather.windDir = "СЗ";

    if (data.wind.speed < 0.3) weather.windDesc = "штиль";
    else if (data.wind.speed < 1.5) weather.windDesc = "тихий";
    else if (data.wind.speed < 3.3) weather.windDesc = "легкий";
    else if (data.wind.speed < 5.4) weather.windDesc = "слабый";
    else if (data.wind.speed < 7.9) weather.windDesc = "умеренный";
    else weather.windDesc = "сильный";
  } catch (e) {
    console.error(e);
  }
}

async function loadForecast(city) {
  const API_KEY = "13646338cd68cc67e0d93decd0210ad9";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`,
    );
    const data = await res.json();
    if (data.cod !== "200") return;

    const dailyData = [];
    const seenDates = new Set();

    for (const item of data.list) {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      });

      if (!seenDates.has(dateStr) && dailyData.length < 7) {
        seenDates.add(dateStr);

        let iconType = "cloudy";
        const main = item.weather[0].main.toLowerCase();
        if (main.includes("clear")) iconType = "sunny";
        else if (main.includes("rain")) iconType = "rainy";

        dailyData.push({
          name:
            dailyData.length === 0
              ? "Сегодня"
              : dailyData.length === 1
                ? "Завтра"
                : date.toLocaleDateString("ru-RU", { weekday: "short" }),
          date: dateStr,
          iconType,
          tempMax: Math.round(item.main.temp_max),
          tempMin: Math.round(item.main.temp_min),
          description: item.weather[0].description,
        });
      }
    }
    days.value = dailyData;
  } catch (e) {
    console.error(e);
  }
}

// Прогноз на 7 дней 
const days = ref([]);

// Живые часы 
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  weather.time = `${hours}:${minutes}`;
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 60_000); // обновляем каждую минуту
  loadWeather(weather.city);
  loadForecast(weather.city);
});

// Выбор дня в прогнозе  
function onSelectDay(index) {
  activeDay.value = index;
  const day = days.value[index];

  weather.temp = day.tempMax;
  weather.dayLabel = day.name;
  weather.iconType = day.iconType;
  weather.feelsLike = day.tempMin + 1;
  weather.precipitation = day.description;
}

// Выбор города 
function onSelectCity(city) {
  weather.city = city;
  loadWeather(city);
  loadForecast(city);
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.page {
  min-height: 100vh;
  background: $bg;
  padding: 20px;
  transition: background 0.3s;

  // Маленькая подпись "Vue weather"
  &__label {
    font-size: 12px;
    color: #9aa0a8;
    margin-bottom: 8px;
  }

  // Белая обёртка со всем контентом
  &__card {
    background: $white;
    border-radius: 24px;
    padding: 24px;
    max-width: 1060px;
    margin: 0 auto;
    box-shadow: $shadow;
    transition: background 0.3s, color 0.3s;
  }

  // Два блока рядом: WeatherCard + WeatherDetails
  &__main {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 16px;
    margin-bottom: 20px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    padding: 10px;

    &__card {
      padding: 16px;
      border-radius: 16px;
    }
  }
}
</style>