let randomNumber;
let attempts = 0;
const maxAttempts = 10;
const hintThreshold = 3; // Nombre d'essais avant de donner un indice

const messageElement = document.getElementById('message');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart');
const attemptsElement = document.getElementById('attempts');
const historyElement = document.getElementById('history');
const difficultySelect = document.getElementById('difficulty');
const themeSelect = document.getElementById('theme');

let bestScore = localStorage.getItem('bestScore') || maxAttempts;

function startGame() {
    const difficulty = Number(difficultySelect.value);
    randomNumber = Math.floor(Math.random() * difficulty) + 1;
    attempts = 0;
    messageElement.textContent = '';
    guessInput.value = '';
    submitButton.style.display = 'block';
    restartButton.style.display = 'none';
    guessInput.disabled = false;
    submitButton.disabled = false;
    attemptsElement.textContent = `Essais restants : ${maxAttempts}`;
    historyElement.innerHTML = ''; // Réinitialiser l'historique
}

submitButton.addEventListener('click', () => {
    const userGuess = Number(guessInput.value);
    attempts++;

    const listItem = document.createElement('li');
    listItem.textContent = `Essai ${attempts}: ${userGuess}`;
    historyElement.appendChild(listItem);

    if (userGuess === randomNumber) {
        document.body.style.backgroundColor = '#c8e6c9'; // Vert pour la victoire
        messageElement.textContent = `Bravo ! Tu as deviné le nombre ${randomNumber} en ${attempts} essais.`;
        if (attempts < bestScore) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            messageElement.textContent += ` Nouveau meilleur score : ${bestScore} essais !`;
        }
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
        guessInput.disabled = true;
        // Ici, joue le son de victoire
    } else if (attempts >= maxAttempts) {
        document.body.style.backgroundColor = '#ffcdd2'; // Rouge pour la défaite
        messageElement.textContent = `Désolé, tu as dépassé le nombre d'essais. Le nombre était ${randomNumber}.`;
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
        guessInput.disabled = true;
        // Ici, joue le son de défaite
    } else {
        messageElement.textContent = userGuess < randomNumber ? 'Trop bas ! Essaie encore.' : 'Trop haut ! Essaie encore.';
        
        if (attempts === hintThreshold) {
            const hint = (randomNumber % 2 === 0) ? "L'indice : le nombre est pair." : "L'indice : le nombre est impair.";
            messageElement.textContent += ` ${hint}`;
        }
    }

    attemptsElement.textContent = `Essais restants : ${maxAttempts - attempts}`;
    guessInput.value = '';
});

restartButton.addEventListener('click', startGame);

themeSelect.addEventListener('change', () => {
    if (themeSelect.value === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = '#000';
    }
});

document.getElementById('start').addEventListener('click', startGame);
