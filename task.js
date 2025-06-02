let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-image');

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
}

setInterval(nextImage, 3000);


const quizQuestions = [
  { question: "Capital of France?", options: ["Paris", "Berlin", "Rome", "Madrid"], answer: "Paris" },
  { question: "5 + 7 = ?", options: ["10", "11", "12", "13"], answer: "12" },
  { question: "Which is a planet?", options: ["Sun", "Mars", "Moon", "Star"], answer: "Mars" },
  { question: "Water formula?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
  { question: "Which is a fruit?", options: ["Carrot", "Apple", "Potato", "Lettuce"], answer: "Apple" },
  { question: "Fastest land animal?", options: ["Tiger", "Cheetah", "Lion", "Leopard"], answer: "Cheetah" },
  { question: "Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "Language of Japan?", options: ["Korean", "Mandarin", "Japanese", "Thai"], answer: "Japanese" },
  { question: "Binary of 2?", options: ["10", "11", "01", "00"], answer: "10" },
  { question: "Who painted Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], answer: "Da Vinci" }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const quizDiv = document.getElementById('quiz');
  if (currentQuestion >= quizQuestions.length) {
    document.getElementById('quizResult').innerHTML = `✅ Your Score: <strong>${score}/${quizQuestions.length}</strong>`;
    document.getElementById('nextBtn').style.display = 'none';
    return;
  }
  const q = quizQuestions[currentQuestion];
  quizDiv.innerHTML = `<p>${q.question}</p>` + 
    q.options.map(opt => `
      <label><input type="radio" name="answer" value="${opt}"> ${opt}</label><br>
    `).join('');
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (selected && selected.value === quizQuestions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  loadQuestion();
}

window.onload = loadQuestion;


function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = 'b6c01df5c507bb640ddc5b7c82b6c1ef'; // Replace with your actual OpenWeatherMap API key

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found or invalid API key');
      return response.json();
    })
    .then(data => {
      const output = `
        <strong>Weather in ${data.name}:</strong><br>
        🌡️ Temperature: ${data.main.temp} °C<br>
        ☁️ Condition: ${data.weather[0].description}<br>
        💧 Humidity: ${data.main.humidity}%<br>
        🌬️ Wind Speed: ${data.wind.speed} m/s
      `;
      document.getElementById('weather').innerHTML = output;
    })
    .catch(error => {
      document.getElementById('weather').innerText = error.message;
    });
}


function fetchJoke() {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(data => {
      document.getElementById('joke').innerText = `${data.setup} — ${data.punchline}`;
    })
    .catch(() => {
      document.getElementById('joke').innerText = 'Failed to fetch a joke.';
    });
}
