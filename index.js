const api_key = `43e2397f961ae78dca0bd575f8aab453`;
const unsplash_key = `ZMNEigAskJfGuvmPeGbe-fsmehbWw_RK5rfYOOX1Phs`

const form = document.querySelector('.form');
const search = document.querySelector('.search_item');
const weather = document.querySelector('#weather');
const image = document.querySelector('.image');

const getcity = async (city) => {
    image.innerHTML=`Loading..`
    const url = `https://api.unsplash.com/search/photos/?client_id=${unsplash_key}&query=${city}`;
    const respons = await fetch(url);
    const data = await respons.json();
    console.log(data);
    return showcity(data);
}

const showcity = (data) => {
    if (data.cod == "404") {
            image.innerHTML = `<h2>City not Found</h2>`;
    return;
}
image.innerHTML = `
<div class="unsplash_img">
<img src = '${data.results[1].urls.small}'>
</div>`
}

const getweather = async (city) => {
    weather.innerHTML = `Loading...`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
    const respons = await fetch(url);
    const data = await respons.json();
    // console.log(data);
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
    function (event) {
        getweather(search.value);
        getcity(search.value);
        event.preventDefault();
    }   
)
