// gra w kostke

let score = 0;
let attempts = 0;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

document.getElementById("submit").addEventListener("click", () => {
    const guess = parseInt(document.getElementById("guess").value);
    const message = document.getElementById("message");
    const result = document.getElementById("result");
    const scoreDisplay = document.getElementById("score");

    // Generowanie nowej liczby losowej za każdą próbą
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    if (isNaN(guess) || guess < 1 || guess > 6) {
        message.textContent = "Podaj liczbę od 1 do 6!";
        return;
    }

    attempts++;

    if (guess === randomNumber) {
        score++;
        result.textContent = `Brawo! Zgadłeś, liczba to ${randomNumber}!`;

        if (score === 3) {
            const name = prompt("Podaj swój nick:");
            leaderboard.push({ name, attempts });
            leaderboard = leaderboard.sort((a, b) => a.attempts - b.attempts).slice(0, 10);
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

            result.textContent = `Wygrałeś w ${attempts} próbach!`;
            score = 0;
            attempts = 0;
            updateLeaderboard();
        }
    } else {
        result.textContent = `Nie zgadłeś! Wypadła liczba ${randomNumber}. Spróbuj ponownie!`;
    }

    scoreDisplay.textContent = `Punkty: ${score}, Próby: ${attempts}`;
    document.getElementById("guess").value = "";
});

function updateLeaderboard() {
    const scoresList = document.getElementById("scores-list");
    scoresList.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${entry.name} - ${entry.attempts} prób`;
        scoresList.appendChild(li);
    });
}

updateLeaderboard();
