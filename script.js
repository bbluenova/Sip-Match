const drinks = [
    { emoji: "🍓🥤", color: "RED" },
    { emoji: "🥕🥤", color: "ORANGE" },
    { emoji: "🍊🥤", color: "ORANGE" },
    { emoji: "🥛✨", color: "WHITE" },
    { emoji: "🥑", color: "GREEN" },
    { emoji: "🍋🥤", color: "YELLOW" },
    { emoji: "☕🖤", color: "BLACK" },
    { emoji: "🍇🥤", color: "PURPLE" },
    { emoji: "🍫🥤", color: "BROWN" },
    { emoji: "🍑🥤", color: "PEACH" }
];

const colors = [
    "RED",
    "ORANGE",
    "ORANGE",
    "WHITE",
    "GREEN",
    "YELLOW",
    "BLACK",
    "PURPLE",
    "BROWN",
    "PEACH"
];

let score = 0;
let lives = 3;
let time = 30;
let streak = 0;
let timer;
let correctColor;
let gameRunning = false;

const drinksContainer = document.getElementById("drinks");
const targetText = document.getElementById("targetText");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const timeText = document.getElementById("time");
const streakText = document.getElementById("streak");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");


function startGame() {

    score = 0;
    lives = 3;
    time = 30;
    streak = 0;
    gameRunning = true;

    scoreText.textContent = score;
    livesText.textContent = lives;
    timeText.textContent = time;
    streakText.textContent = streak;

    message.textContent = "";

    startBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");

    createRound();

    clearInterval(timer);

    timer = setInterval(() => {

        time--;
        timeText.textContent = time;

        if (time <= 0) {
            endGame("⏰ Time's Up!");
        }

    }, 1000);
}


function createRound() {

    if (!gameRunning) return;

    drinksContainer.innerHTML = "";

    correctColor =
        colors[Math.floor(Math.random() * colors.length)];

    targetText.textContent =
        `FIND THE ${correctColor} DRINK! 🥤`;

    const shuffled =
        [...drinks].sort(() => Math.random() - 0.5);

    shuffled.forEach(drink => {

        const button = document.createElement("button");

        button.className = "drink";
        button.textContent = drink.emoji;

        button.onclick = () => {
            checkAnswer(drink.color, button);
        };

        drinksContainer.appendChild(button);
    });
}


function checkAnswer(color, button) {

    if (!gameRunning) return;

    if (color === correctColor) {

        streak++;

        let points = 10;

        if (streak === 3) {

            points += 20;

            message.textContent =
                "🔥 3 STREAK! +30 POINTS!";

        } else if (streak === 5) {

            points += 50;

            message.textContent =
                "🔥🔥 AMAZING 5 STREAK! +60!";

        } else {

            message.textContent =
                `🎉 Correct! +${points}`;
        }

        score += points;

        scoreText.textContent = score;
        streakText.textContent = streak;

        button.classList.add("correct");
        streakText.classList.add("streak");

        setTimeout(() => {

            streakText.classList.remove("streak");
            createRound();

        }, 350);

    } else {

        lives--;
        streak = 0;

        livesText.textContent = lives;
        streakText.textContent = streak;

        message.textContent =
            "❌ Wrong drink! Streak lost!";

        button.classList.add("wrong");

        if (lives <= 0) {
            endGame("💔 GAME OVER!");
        }
    }
}


function endGame(text) {

    gameRunning = false;

    clearInterval(timer);

    message.textContent =
        `${text} Final Score: ${score} ⭐`;

    restartBtn.classList.remove("hidden");
}