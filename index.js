const api_key = `43e2397f961ae78dca0bd575f8aab453`;

const form = document.querySelector('.form');
const search = document.querySelector('.search_item');
const weather = document.querySelector('#weather');

const getweather = async (city) => {
    weather.innerHTML = `Loading...`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=43e2397f961ae78dca0bd575f8aab453&units=metric`;
    const respons = await fetch(url);
    const data = await respons.json();
    console.log(data);
    return showweather(data);
}

const showweather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2>City not Found</h2>`;
        return;
    }
    weather.innerHTML = `
    <div class="icon">
          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" />
        </div>
        <div class="temp">
          <h1>${data.main.temp} °C</h1>
          <h3>${data.weather[0].main}</h3>
        </div>
        <div class="extra_detail">
        <h5>Feels like : ${data.main.feels_like} °C</h5>
        <h5>Pressure : ${data.main.pressure} hPa</h5>
        <h5>Humidity : ${data.main.humidity} %</h5>
        <h5>Wind Speed : ${data.wind.speed}m/s WNW</h5>
        </div>`
}

form.addEventListener(
    'submit',
    function(event) {   
        getweather(search.value);
        event.preventDefault();
    }
)
