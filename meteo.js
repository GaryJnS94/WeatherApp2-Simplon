let currentCity = "Montpellier";

async function getConfig(ville = null) {
  const response = await fetch("conf.json");
  const data = await response.json();
  if (ville) {
    return data.find((city) => city.ville === ville);
  }
  return data[0];
}

async function getMeteo(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const response = await fetch(url);
  const data = await response.json();
  return data.current_weather;
}

function afficherMeteo(meteo) {
  const meteoDiv = document.getElementById("meteo");
  let symbole = meteo.temperature > 15 ? "☀️" : "❄️";
  if (meteoDiv) {
    meteoDiv.innerHTML = `${symbole} ${meteo.temperature}°C<br>Vent : ${meteo.windspeed} km/h`;
  }
}

async function majMeteo(ville = null) {
  const config = await getConfig(ville);
  const meteo = await getMeteo(config.latitude, config.longitude);
  afficherMeteo(meteo);
  if (ville) {
    currentCity = ville;
  }
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

setInterval(() => majMeteo(currentCity), 60 * 60 * 1000);
