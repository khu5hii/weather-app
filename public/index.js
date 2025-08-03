function getWeather() {
    const city = document.getElementById("input").value;

    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("container");

            container.innerHTML = `
                <h1>${data.current.temp_c}</h1>
                <img src="${data.current.condition.icon}">
                <h3>${data.current.condition.text} </h3>
        
                <h1>Humidity: ${data.current.humidity}%</h1>
                <h1>Wind Speed ${data.current.wind_kph} k/h</h1>
            `;

        })
        .catch(e => {
            console.log(e);

        })

}

document.getElementById("button").addEventListener("click", getWeather);
document.getElementById("input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});
