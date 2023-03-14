let words = ["recipe", "argument", "student", "thing", "week", "reflection", "negotiation", "highway", "recording", "engine", "idea", "employee", "story", "climate", "desk", "permission", "surgery", "camera", "reality"]
let answer = ''
let maxWrong = 6
let mistakes = 0
let guessed = []
let wordStatus = null


function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)]
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='${letter}'
          onClick="handleGuess('${letter}')"
        >
          ${letter}
        </button>
      `).join('')
  
    document.getElementById('keyboard').innerHTML = buttonsHTML
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null
    document.getElementById(chosenLetter).setAttribute('disabled', true)

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord()
        gameWon()
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++
        updateMistakes()
        gameLost()
    }
}

function gameWon() {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "You Won!!!"
    }
}

function gameLost() {
    if (mistakes === maxWrong) {
        document.getElementById("keyboard").innerHTML = "You Lost!!!"
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >=0 ? letter : " _ ")).join('')
    document.getElementById("guessedWord").innerHTML = wordStatus
}

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes
}

function reset() {
    mistakes = 0
    guessed = []

    randomWord()
    generateButtons()
    guessedWord()
    updateMistakes()
}

randomWord()
generateButtons()
guessedWord()
