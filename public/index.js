function getWeather() {
    const city = document.getElementById("input").value;
    if (!city) return;
    const container = document.getElementById("container");
    const body = document.body;
    const button = document.getElementById("button");
    const humidity = document.getElementById("humidity");
    const windspeed = document.getElementById("wind-speed");


    body.classList.add('loading');
    button.textContent = 'SEARCHING...';
    container.style.backgroundColor = 'white';

    container.innerHTML = `
        <div class="skeleton-box medium"></div>
        <div class="skeleton-box big"></div>
        <div class="skeleton-box small"></div>
    `;

    humidity.innerHTML = `
        <div class="skeleton-box medium dark h"></div>
        <div class="skeleton-box big dark h"></div>
        <div class="skeleton-box small dark h"></div>
    `;

    windspeed.innerHTML = `
        <div class="skeleton-box medium dark w"></div>
        <div class="skeleton-box big dark w"></div>
        <div class="skeleton-box small dark w"></div>
    `;

    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = `
                <img src="${data.current.condition.icon}">
                <h1>${data.current.temp_c}°C</h1>
                <h3>${data.current.condition.text}</h3>
            `;

            humidity.innerHTML = `
                <img src="img/humidity.png" alt="humidity" >
                <h1>Humidity <br> <span class='label'> ${data.current.humidity}%</span></h1>
                `;

            windspeed.innerHTML = `
                <img src="img/wind-speed.png" alt="wind speed">
                <h1>Wind Speed <br> <span class='label'> ${data.current.wind_kph} k/h </span></h1>
            `;

        })
        .catch(e => {
            container.innerHTML = `<h3>Error fetching data</h3>`;
            humidity.innerHTML = `<h1>Error fetching data</h1>`;
            windspeed.innerHTML = `<h1>Error fetching data</h1>`;
            console.error(e);
        })
        .finally(() => {
            body.classList.remove('loading');
            button.textContent = 'SEARCH';
        });
}

const button = document.getElementById("button");
const input = document.getElementById("input");

input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
        button.classList.remove('disabled');
        button.disabled = false;
    } else {
        button.classList.add('disabled');
        button.style.cursor = 'not-allowed';
        button.disabled = true;
    }
})

input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        if (input.value.trim() !== '') {
            document.getElementById('lower-info').style.display = 'flex';
            button.disabled = false;
        }
        else {
            document.getElementById('lower-info').style.display = 'none';
        }
        getWeather();
    }
});

button.addEventListener('click', () => {
if (input.value.trim() !== '') {
            document.getElementById('lower-info').style.display = 'flex';
            button.disabled = false;
        }
        else {
            document.getElementById('lower-info').style.display = 'none';
        }

    getWeather();
})