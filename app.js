const messageElement = document.getElementById("message");
const weatherEffect = document.getElementById("weatherEffect");

// MENSAJES BASE
const messages = [
"Hoy pienso en vos más que ayer.",
"Sos mi calma favorita.",
"Si el día pesa, yo estoy acá.",
"Tu sonrisa cambia mi clima.",
"Todo es mejor si lo comparto con vos."
];

// Día del año
function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const dayIndex = getDayOfYear() % messages.length;
let baseMessage = messages[dayIndex];

// Cumple especial 30 Enero
const today = new Date();
if (today.getDate() === 30 && today.getMonth() === 0) {
    baseMessage = "Hoy el universo celebra que existís 🎂✨";
    document.body.style.background = "linear-gradient(135deg,#ff9ecf,#ffd6f5)";
}

messageElement.innerText = baseMessage;

// Clima Escobar
fetch("https://api.open-meteo.com/v1/forecast?latitude=-34.3499&longitude=-58.7946&current_weather=true")
.then(res => res.json())
.then(data => {

    const weatherCode = data.current_weather.weathercode;
    const temperature = data.current_weather.temperature;

    if (weatherCode >= 51 && weatherCode <= 67) {
        messageElement.innerText = "Si llueve, yo soy tu abrigo 💙";
    }
    else if (weatherCode === 0) {
        messageElement.innerText = "El sol compite con tu sonrisa ☀";
    }
    else if (temperature < 10) {
        messageElement.innerText = "Hace frío… vení que te abrazo 🤍";
    }
});
