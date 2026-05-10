import { mergeProps, unref, useSSRContext, computed, ref, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _export_sfc, f as useState } from "../server.mjs";
import "C:/Users/Den/Downloads/Telegram Desktop/vue-weather/vue-weather/node_modules/hookable/dist/index.mjs";
import "C:/Users/Den/Downloads/Telegram Desktop/vue-weather/vue-weather/node_modules/ofetch/dist/node.mjs";
import "C:/Users/Den/Downloads/Telegram Desktop/vue-weather/vue-weather/node_modules/unctx/dist/index.mjs";
import "C:/Users/Den/Downloads/Telegram Desktop/vue-weather/vue-weather/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Den/Downloads/Telegram Desktop/vue-weather/vue-weather/node_modules/defu/dist/defu.mjs";
import "C:/Users/Den/Downloads/Telegram Desktop/vue-weather/vue-weather/node_modules/ufo/dist/index.mjs";
import "C:/Users/Den/Downloads/Telegram Desktop/vue-weather/vue-weather/node_modules/@unhead/vue/dist/index.mjs";
const _imports_0 = publicAssetsURL("/img/logo.svg");
const ICONS = {
  // Иконка солнца (ясная погода)
  sunny: "/img/sun.svg",
  moon: "/img/mainly_cloudy.svg",
  cloudy: "/img/mainly_cloudy.svg",
  // Иконка дождя
  rainy: "/img/rain.svg",
  // Большое облако — фон карточки с деталями
  bigCloud: "/img/big_cloudy.png",
  // Иконки деталей погоды
  temperature: "/img/temperature.svg",
  pressure: "/img/water.svg",
  rain: "/img/Group.svg",
  wind: "/img/wind.svg",
  // Иконка переключения темы (шапка)
  theme: "/img/caplya.svg"
};
const _sfc_main$5 = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  emits: ["toggleTheme", "openModal"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-27ff86e0><div class="header__logo" data-v-27ff86e0><img${ssrRenderAttr("src", _imports_0)} alt="Vue Weather" class="header__logo-img" data-v-27ff86e0><span class="header__logo-text" data-v-27ff86e0>VUE WEATHER</span></div><div class="header__right" data-v-27ff86e0><img${ssrRenderAttr("src", unref(ICONS).theme)} alt="Тема" class="header__theme-btn" data-v-27ff86e0><button class="header__city-btn" data-v-27ff86e0> Выбрать город </button></div></header>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-27ff86e0"]]);
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$4 = {
  __name: "WeatherCard",
  __ssrInlineRender: true,
  props: {
    temp: Number,
    // температура
    dayLabel: String,
    // "Сегодня" / "Завтра" / "Пн" и т.д.
    time: String,
    // текущее время
    city: String,
    // название города
    iconType: String
    // тип погоды: 'sunny' | 'cloudy' | 'rainy'
  },
  setup(__props) {
    const props = __props;
    const colorMode = useColorMode();
    const weatherIcon = computed(() => {
      if (props.iconType === "sunny") {
        return colorMode.value === "dark" ? ICONS.moon : ICONS.sunny;
      }
      if (props.iconType === "rainy") return ICONS.rainy;
      return ICONS.cloudy;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "weather-card" }, _attrs))} data-v-b6994778><div class="weather-card__top" data-v-b6994778><div data-v-b6994778><p class="weather-card__temp" data-v-b6994778>${ssrInterpolate(__props.temp)}°</p><p class="weather-card__day" data-v-b6994778>${ssrInterpolate(__props.dayLabel)}</p></div><img${ssrRenderAttr("src", weatherIcon.value)} alt="Погода" class="weather-card__icon" data-v-b6994778></div><div class="weather-card__bottom" data-v-b6994778><p class="weather-card__info" data-v-b6994778>Время: ${ssrInterpolate(__props.time)}</p><p class="weather-card__info" data-v-b6994778>Город: ${ssrInterpolate(__props.city)}</p></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WeatherCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const WeatherCard = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b6994778"]]);
const _sfc_main$3 = {
  __name: "WeatherDetails",
  __ssrInlineRender: true,
  props: {
    temp: Number,
    feelsLike: Number,
    pressure: Number,
    precipitation: String,
    windSpeed: Number,
    windDir: String,
    windDesc: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "details" }, _attrs))} data-v-e0e5a0b1><img${ssrRenderAttr("src", unref(ICONS).bigCloud)} alt="" class="details__cloud-bg" style="${ssrRenderStyle({ "width": "100%", "height": "100%" })}" data-v-e0e5a0b1><ul class="details__list" data-v-e0e5a0b1><li class="details__row" data-v-e0e5a0b1><img${ssrRenderAttr("src", unref(ICONS).temperature)} alt="" class="details__icon" data-v-e0e5a0b1><span class="details__label" data-v-e0e5a0b1>Температура</span><span class="details__value" data-v-e0e5a0b1>${ssrInterpolate(__props.temp)}° - ощущается как ${ssrInterpolate(__props.feelsLike)}°</span></li><li class="details__row" data-v-e0e5a0b1><img${ssrRenderAttr("src", unref(ICONS).pressure)} alt="" class="details__icon" data-v-e0e5a0b1><span class="details__label" data-v-e0e5a0b1>Давление</span><span class="details__value" data-v-e0e5a0b1>${ssrInterpolate(__props.pressure)} мм ртутного столба - нормальное</span></li><li class="details__row" data-v-e0e5a0b1><img${ssrRenderAttr("src", unref(ICONS).rain)} alt="" class="details__icon" data-v-e0e5a0b1><span class="details__label" data-v-e0e5a0b1>Осадки</span><span class="details__value" data-v-e0e5a0b1>${ssrInterpolate(__props.precipitation)}</span></li><li class="details__row" data-v-e0e5a0b1><img${ssrRenderAttr("src", unref(ICONS).wind)} alt="" class="details__icon" data-v-e0e5a0b1><span class="details__label" data-v-e0e5a0b1>Ветер</span><span class="details__value" data-v-e0e5a0b1>${ssrInterpolate(__props.windSpeed)} м/с ${ssrInterpolate(__props.windDir)} - ${ssrInterpolate(__props.windDesc)}</span></li></ul></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WeatherDetails.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const WeatherDetails = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e0e5a0b1"]]);
const _sfc_main$2 = {
  __name: "WeeklyForecast",
  __ssrInlineRender: true,
  props: {
    days: Array,
    // массив дней
    isOpen: Boolean,
    // показывать или скрывать прогноз
    activeIndex: Number
    // индекс выбранного дня
  },
  emits: ["toggle", "selectDay"],
  setup(__props) {
    const colorMode = useColorMode();
    function getDayIcon(iconType) {
      if (iconType === "sunny") return colorMode.value === "dark" ? ICONS.moon : ICONS.sunny;
      if (iconType === "rainy") return ICONS.rainy;
      return ICONS.cloudy;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "weekly" }, _attrs))} data-v-c9333cad><div class="weekly__bar" data-v-c9333cad><button class="${ssrRenderClass([{ "weekly__toggle--active": __props.isOpen }, "weekly__toggle"])}" data-v-c9333cad> На неделю </button>`);
      if (__props.isOpen) {
        _push(`<button class="weekly__cancel" data-v-c9333cad> Отменить </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.isOpen) {
        _push(`<div class="weekly__grid" data-v-c9333cad><!--[-->`);
        ssrRenderList(__props.days, (day, index2) => {
          _push(`<div class="${ssrRenderClass([{ "day-card--active": index2 === __props.activeIndex }, "day-card"])}" data-v-c9333cad><p class="day-card__name" data-v-c9333cad>${ssrInterpolate(day.name)}</p><p class="day-card__date" data-v-c9333cad>${ssrInterpolate(day.date)}</p><img${ssrRenderAttr("src", getDayIcon(day.iconType))} alt="" class="day-card__icon" data-v-c9333cad><div class="day-card__temps" data-v-c9333cad><span class="day-card__max" data-v-c9333cad>+${ssrInterpolate(day.tempMax)}°</span><span class="day-card__min" data-v-c9333cad>+${ssrInterpolate(day.tempMin)}°</span></div><p class="day-card__desc" data-v-c9333cad>${ssrInterpolate(day.description)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WeeklyForecast.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const WeeklyForecast = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c9333cad"]]);
const _sfc_main$1 = {
  __name: "CityModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    selectedCity: String
  },
  emits: ["close", "selectCity"],
  setup(__props, { emit: __emit }) {
    const allCities = [
      "Ташкент",
      "Самарканд",
      "Бухара",
      "Наманган",
      "Андижан",
      "Фергана",
      "Нукус",
      "Карши",
      "Термез",
      "Коканд",
      "Маргилан",
      "Навои",
      "Санкт-Петербург",
      "Москва",
      "Новосибирск",
      "Екатеринбург",
      "Казань",
      "Нижний Новгород",
      "Краснодар",
      "Самара",
      "Ростов-на-Дону",
      "Омск",
      "Уфа",
      "Красноярск",
      "Воронеж",
      "Пермь",
      "Волгоград",
      "Тюмень"
    ];
    const search = ref("");
    const filteredCities = computed(
      () => allCities.filter(
        (city) => city.toLowerCase().includes(search.value.toLowerCase())
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-bg" }, _attrs))} data-v-c40db134><div class="modal" data-v-c40db134><div class="modal__header" data-v-c40db134><h2 class="modal__title" data-v-c40db134>Выбрать город</h2><button class="modal__close" data-v-c40db134>✕</button></div><input${ssrRenderAttr("value", search.value)} class="modal__search" type="text" placeholder="Поиск города..." data-v-c40db134><ul class="modal__list" data-v-c40db134><!--[-->`);
        ssrRenderList(filteredCities.value, (city) => {
          _push(`<li class="${ssrRenderClass([{ "modal__city--active": city === __props.selectedCity }, "modal__city"])}" data-v-c40db134>${ssrInterpolate(city)}</li>`);
        });
        _push(`<!--]-->`);
        if (filteredCities.value.length === 0) {
          _push(`<li class="modal__empty" data-v-c40db134> Город не найден </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CityModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CityModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c40db134"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
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
      iconType: "cloudy"
    });
    function toggleTheme() {
      colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
    }
    async function loadWeather(city) {
      const API_KEY = "13646338cd68cc67e0d93decd0210ad9";
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
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
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        );
        const data = await res.json();
        if (data.cod !== "200") return;
        const dailyData = [];
        const seenDates = /* @__PURE__ */ new Set();
        for (const item of data.list) {
          const date = new Date(item.dt * 1e3);
          const dateStr = date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short"
          });
          if (!seenDates.has(dateStr) && dailyData.length < 7) {
            seenDates.add(dateStr);
            let iconType = "cloudy";
            const main = item.weather[0].main.toLowerCase();
            if (main.includes("clear")) iconType = "sunny";
            else if (main.includes("rain")) iconType = "rainy";
            dailyData.push({
              name: dailyData.length === 0 ? "Сегодня" : dailyData.length === 1 ? "Завтра" : date.toLocaleDateString("ru-RU", { weekday: "short" }),
              date: dateStr,
              iconType,
              tempMax: Math.round(item.main.temp_max),
              tempMin: Math.round(item.main.temp_min),
              description: item.weather[0].description
            });
          }
        }
        days.value = dailyData;
      } catch (e) {
        console.error(e);
      }
    }
    const days = ref([]);
    function onSelectDay(index2) {
      activeDay.value = index2;
      const day = days.value[index2];
      weather.temp = day.tempMax;
      weather.dayLabel = day.name;
      weather.iconType = day.iconType;
      weather.feelsLike = day.tempMin + 1;
      weather.precipitation = day.description;
    }
    function onSelectCity(city) {
      weather.city = city;
      loadWeather(city);
      loadForecast(city);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-ff74bdd6><p class="page__label" data-v-ff74bdd6>Vue weather</p><div class="page__card" data-v-ff74bdd6>`);
      _push(ssrRenderComponent(AppHeader, {
        onToggleTheme: toggleTheme,
        onOpenModal: ($event) => modalOpen.value = true
      }, null, _parent));
      _push(`<div class="page__main" data-v-ff74bdd6>`);
      _push(ssrRenderComponent(WeatherCard, {
        temp: weather.temp,
        "day-label": weather.dayLabel,
        time: weather.time,
        city: weather.city,
        "icon-type": weather.iconType
      }, null, _parent));
      _push(ssrRenderComponent(WeatherDetails, {
        temp: weather.temp,
        "feels-like": weather.feelsLike,
        pressure: weather.pressure,
        precipitation: weather.precipitation,
        "wind-speed": weather.windSpeed,
        "wind-dir": weather.windDir,
        "wind-desc": weather.windDesc
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(WeeklyForecast, {
        days: days.value,
        "is-open": weeklyOpen.value,
        "active-index": activeDay.value,
        onToggle: ($event) => weeklyOpen.value = !weeklyOpen.value,
        onSelectDay
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(CityModal, {
        "is-open": modalOpen.value,
        "selected-city": weather.city,
        onClose: ($event) => modalOpen.value = false,
        onSelectCity
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ff74bdd6"]]);
export {
  index as default
};
//# sourceMappingURL=index-Cdjf93_M.js.map
