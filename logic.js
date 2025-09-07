// Variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

// Event Listeners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// Start game
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    scoreElement.innerText = "";
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

// Load next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Display question
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset state
function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Select answer
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        quizScore++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        scoreElement.innerText = `Score: ${quizScore} / ${questions.length}`;
    }
}

// Apply correct/wrong style
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Remove styles
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Sample questions
const questions = [
    {
        question: 'What is 82+67?',
        answers: [
            { text: '149', correct: true },
            { text: '150', correct: false },
            { text: '151', correct: false },
            { text: '152', correct: false }
        ]
    },
    {
        question: 'Which is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Saturn', correct: false },
            { text: 'Mars', correct: false }
        ]
    },
    {
        question: 'Which is the largest river in the world?',
        answers: [
            { text: 'Yangtze', correct: false },
            { text: 'Amazon', correct: false },
            { text: 'Ganga', correct: false },
            { text: 'Nile', correct: true }
        ]
    },
    {
        question: 'which is smallest state in India?',
        answers: [
            { text: 'Pune', correct: false },
            { text: 'New Delhi', correct: false },
            { text: 'Mumbai', correct: false },
            { text: 'Gujrat', correct: true }
        ]
    },
    {
        question: 'Who invented the telephone?',
        answers: [
            { text: 'Alexander Graham Bell', correct: true },
            { text: 'Thomas Edison', correct: false },
            { text: 'James Watt', correct: false },
            { text: 'Charles Babbage', correct: false }
        ]
    },
];

    async function getWeather() {
      const city = document.getElementById('cityInput').value;
      if (!city) {
        alert("Please enter a city name");
        return;
      }

      try {
        // Geocoding API (to get coordinates of city)
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          document.getElementById('weather').innerHTML = "City not found.";
          return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Weather API
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`);
        const weatherData = await weatherRes.json();
        const current = weatherData.current;

        document.getElementById('weather').innerHTML = `
          <h2>${name}, ${country}</h2>
          <p><strong>Temperature:</strong> ${current.temperature_2m}°C</p>
          <p><strong>Wind Speed:</strong> ${current.wind_speed_10m} m/s</p>
          <p><strong>Weather Code:</strong> ${current.weather_code}</p>
        `;
      } catch (error) {
        document.getElementById('weather').innerHTML = "Error fetching weather.";
        console.error(error);
      }
    }
