async function getConfig(ville) {
  if (ville) {
    return config.villes.find((villeConfig) => villeConfig.ville === ville);
  }
  return config.villes[0];
}

async function getMeteo(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    temperature: data.main.temp,
    windspeed: data.wind.speed,
    description: data.weather[0].description,
  };
}

function afficherMeteo(meteo) {
  const meteoDiv = document.getElementById("meteo");
  let symbole = meteo.temperature > 15 ? "☀️" : "❄️";
  meteoDiv.innerHTML = `
    ${symbole} ${meteo.temperature}°C<br>
    Vent : ${meteo.windspeed} km/h<br>
    ${meteo.description}
  `;
}

async function majMeteo(ville) {
  const config = await getConfig(ville);
  const meteo = await getMeteo(config.latitude, config.longitude);
  afficherMeteo(meteo);
}

document.addEventListener("DOMContentLoaded", () => {
  majMeteo("Montpellier");

  document
    .getElementById("btn-Montpellier")
    .addEventListener("click", () => majMeteo("Montpellier"));
  document
    .getElementById("btn-Toulouse")
    .addEventListener("click", () => majMeteo("Toulouse"));
  document
    .getElementById("btn-Bordeaux")
    .addEventListener("click", () => majMeteo("Bordeaux"));
});
