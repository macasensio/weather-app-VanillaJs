const weatherDataDiv = document.getElementById('wheather-data')
const cityInput = document.getElementById('city')

const form = document.querySelector('form')


form.addEventListener('submit', e => {
    e.preventDefault()
    const cityValue = cityInput.value
    getWeatherData(cityValue)
})


async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3eb34dcd0be01fb58d4416628a4cc0cf&units=metric`)
        if(!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        renderData(data)
    } catch (error) {
        renderError()
    }
}

function renderData(data){
    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon

    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`
    ]

    weatherDataDiv.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
    weatherDataDiv.querySelector('.temperature').textContent = `${temperature}°C`
    weatherDataDiv.querySelector('.description').textContent = `${description.charAt(0).toUpperCase() + description.slice(1)}`
    weatherDataDiv.querySelector('.details').innerHTML = 
        details
            .map(detail => {
                return `<div>${detail}</div>`
            })
            .join('')
}

function renderError(){

    weatherDataDiv.querySelector('.icon').innerHTML = ``
    weatherDataDiv.querySelector('.temperature').textContent = ``
    weatherDataDiv.querySelector('.description').innerHTML = `<p class="error">${cityInput.value === '' ? 'The input is empty, please try again' : 'An error happened, please try again later'}</p>`
    weatherDataDiv.querySelector('.details').innerHTML = ``
}

