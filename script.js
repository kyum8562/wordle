import {WORDS} from './words.js'

let guessesRemaining = 6; // 여섯번의 기회
let currentGuess = []; // 현재 줄에 작성한 답
let nextLetter = 0; // 현재 줄의 칸
let answerString = WORDS[Math.floor(Math.random() * WORDS.length)]; // 답
console.log(`answer : ${answerString}`);

function initBoard() {
    let board = document.getElementById('game-board');
    
    for(let i = 0 ; i < guessesRemaining ; i ++){
        let row = document.createElement('div');
        row.className = 'letter-row'

        for(let j = 0 ; j < 5 ; j ++){
            let col = document.createElement('div');
            col.className = 'letter-col'
            row.appendChild(col);
            
        }
        board.appendChild(row);
    }
}
initBoard();

document.addEventListener('keyup', (e) => {
    let pressedKey = String(e.key);

    // 추측하기
    if(pressedKey === 'Enter'){
        checkGuess();
        return;
    }
    // 현재 키 삭제하기
    if(pressedKey === 'Backspace' && nextLetter !== 0){
        deleteLetter();
        return;
    }
    // 키 입력하기
    let found = pressedKey.match(/[a-z]/gi);
    if(!found || found.length > 1){
        return;
    }
    else{
        insertLetter(pressedKey);
    }
});

// 키 삽입함수
function insertLetter(pressedKey) {
    // 모든 항목이 채워져있을 경우 삽입하지 않음
    if(nextLetter === 5){
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName('letter-row')[6-guessesRemaining];
    let col = row.children[nextLetter];
    animateCSS(col, "pulse")
    col.textContent = pressedKey;
    col.classList.add("filled-col");
    currentGuess.push(pressedKey);
    nextLetter +=1;

}

// 키 삭제함수(Backspace)
function deleteLetter(){
    let row = document.getElementsByClassName('letter-row')[6-guessesRemaining];
    let col = row.children[nextLetter - 1];
    col.textContent = '';
    col.classList.remove('filled-col');
    currentGuess.pop();
    nextLetter -=1;
}

// 추측하기(enter)
function checkGuess(){
    let row = document.getElementsByClassName('letter-row')[6-guessesRemaining];
    let guessString = '';
    let answer = Array.from(answerString);

    for(const val of currentGuess){
        guessString += val;
    }

    // 5칸이 채워지지 않았다면 알람
    if(guessString.length !== 5){
        toastr.error('칸을 올바르게 채워주세요!');
        return;
    }
    // WORDS 리스트 안에 해당하는 단어가 아니라면
    if(!WORDS.includes(guessString)){
        toastr.error('올바른 단어를 작성해주세요!');
        return;
    }

    for(let i = 0 ; i < guessString.length ; i ++){
        let letterColor = '';
        let col = row.children[i];
        let letter = currentGuess[i];
        let letterPosition = answer.indexOf(currentGuess[i]);

        if(letterPosition === -1){
            letterColor = '#787C7E';
        }
        else{
            if(currentGuess[i] === answer[i]){
                letterColor = '#6AAA64';
            }
            else{
                letterColor = '#b59f3b';
            }

            answer[letterPosition] = '#';
        }

        let delay = 250 * i;
        setTimeout(() => {
            animateCSS(col, 'flipInX');
            col.style.backgroundColor = letterColor;
            col.style.border = `2px solid ${letterColor}`;
            shadeKeyBoard(letter, letterColor);
        }, delay);

    }
    if(guessString === answerString){
        toastr.success('정답입니다 :)');
        guessesRemaining = 0;
        return;
    }
    else{
        guessesRemaining -= 1;
        nextLetter = 0;
        currentGuess = [];

        if(guessesRemaining === 0){
            toastr.error('모든 기회를 사용하셨습니다. 실패ㅋㅋㅋㅋㅋ');
            toastr.info('정답은 : ${answer}');
            return;
        }
    }
}

// 화상키보드에 음영넣기
function shadeKeyBoard(letter, letterColor){
    // keyboard-button 클래스에 해당하는 모든 원소를 가지고와서
    // letter과 일치하게 된다면 키보드를 색에 맞게 칠해준다.
    for(const el of document.getElementsByClassName('keyboard-button')){
        if(el.textContent === letter){
            let oldColor = el.style.backgroundColor;
            if(oldColor === '#6AAA64'){
                return;
            }
            if(oldColor === '#b59f3b' && letterColor !== '#6AAA64'){
                return;
            }

            el.style.backgroundColor = letterColor;
            break;
        }
    }
}

// 화상키보드 입력
document.getElementById('keyboard-cont').addEventListener('click', (e) =>{
    const target = e.target;
    if(!target.classList.contains('keyboard-button')){
        return;
    }
    let key = target.textContent;
    console.log(key);
    if(key ==='Del'){
        key = "Backspace";
    }

    document.dispatchEvent(new KeyboardEvent("keyup", {'key':key}))
})

// animation effect
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});


// 다크모드 구현
let title = document.querySelector('h1');
let btn = document.getElementById('toggle');
let body = document.querySelector('body');
title.addEventListener('dblclick', () =>{
    // 밤
    if(btn.textContent === 'Night'){
        btn.value = 'Night'
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        btn.textContent = 'Day';
        title.style.color = 'white';

    }
    // 낮
    else{
        btn.value = 'Day';
        body.style.backgroundColor = 'white';
        body.style.color = '';
        btn.textContent = 'Night';
        title.style.color = 'black';

    }
});

