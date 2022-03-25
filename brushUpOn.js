import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuess = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuess);

// 게임보드 만들기
function initBoard() {
    let board = document.getElementById('game-board');

    for(let i = 0 ; i < NUMBER_OF_GUESSES ; i ++){
        let row = document.createElement('div');
        row.className = "letter-row"

        for(let j = 0 ; j < 5 ; j++){
            let col = document.createElement('div');
            col.className = "letter-col"
            row.appendChild(col);
        }

        board.appendChild(row);
    }
}
initBoard();

document.addEventListener("keyup", (e) => {
    if(guessesRemaining === 0){
        return
    }

    let pressedKey = String(e.key);
    if(pressedKey === "Backspace" && nextLetter !==0){
        deleteLetter()
        return
    }
    if(pressedKey === "enter"){
        checkGuess()
        return
    }
    let found = pressedKey.match(/[a-z]/gi)
    if(!found || found.length >1){
        return
    }
    else{
        insertLetter(pressedKey);
    }
})

// 해당 row에서 공백이 있는지 없는지 확인. 공백이있으면 다음 col에 문자를 넣는다.
function insertLetter(pressedKey){
    if(nextLetter === 5){
        return
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let col = row.children[nextLetter];
    col.textContent = pressedKey;
    col.classList.add("filled-col");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

// 해당 행을 가져오고, 마지막 컬럼값(커서가 위치에 있는)을 찾아 delete한다
// nextLetter 카운터 재설정
function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let col = row.children[nextLetter - 1]
    col.textContent = ""
    col.classList.remove("filled-col")
    currentGuess.pop()
    nextLetter -= 1
}

// 추측하기
function checkGuess() {
    let row = document.getElementsByClassName('letter-row')[6-guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuess);

    for(const val of currentGuess){
        guessString += val
        console.log(guessString)
    }
    if(guessString.length != 5){
        alert("문자수가 충분하지 않습니다!")
        return
    }
    if(!WORDS.includes(guessString)){
        alert("적절한 단어가 아닙니다!")
        return
    }

    for(let i = 0; i < 5 ; i ++){
        let letterColor = ''
        let col = row.child[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        
        if(letterPosition === -1){
            letterColor = 'lightgrey'
        }
        else{
            if(currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            }
            else{
                letterColor = 'yellow'
            }
            rightGuess[letterPosition] ='#'
        }

        let delay = 250 * i
        setTimeout (() => {
            col.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if(guessString === rightGuessString) {
        alert("추측을 성공했습니다 :)")
        guessesRemaining = 0
        return
    }
    else{
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;
    }

    if (guessesRemaining === 0) {
        alert("기회를 모두 사용했으므로 게임 끝:(")
        alert(`정답: "${rightGuessString}"`)
    }
}