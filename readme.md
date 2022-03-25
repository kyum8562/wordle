## Wordle 게임 만들기 프로젝트

[설명]

- 워들 게임을 클론해서 구현해보는 프로젝트

[구성]

- game-board
- 화상 키보드
- 결과 화면

[기능구현]

- `initBoard()` : 게임 시작시 game-board
- `insertLetter()` : 게임보드에 키 입력
- `deleteLetter()` : 게임보드에 입력된 현재 키 삭제
- `checkGuess()` : 추측 시(‘enter’ 버튼) 결과에 따른 음영표현
- `shadeKeyboard()` : 추측값에 따른 키보드 음영표현
- animation effect
- validation check

[구체화]

- `initBoard()`

게임 시작시, 화면에 표현될 보드를 생성한다.

총 가로 6 줄 세로 5칸을 형성한다.

- `insertLetter()`

다섯개의 col(컬럼)이 차지 않았다면

입력받은 키를 삽입해준다.(col.textContent = pressedKey)

삽입된 col에 filled-col 클래스를 삽입해주고

currentGuess에 키를 넣어준다(currentGuess.push(pressedKey))

nextLetter +=1을 해준다.

- `deleteLetter()`

nextLetter-1의 col 값을 불러와서

해당 col을 빈 값으로 만들고 filled-col 클래스를 제거한다.

currentGuess의 키를 pop해준다.

nextLetter -= 1을 해준다.

- `checkGuess()`

아래와 같은 경우 알람을 띄우고 해당함수를 종료한다

i) currentGuess.length가 5가 아닌경우

ii) WORDS 리스트 내의 유효한 값이 아닌경우

위의 조건에 해당하지 않다면

answer와 currentGuess의 각 col마다 비교를 한다.

위치와 값이 일치한다면 ⇒ 칸이 초록색을 띈다

위치가 일치하지 않지만 값이 일치하다면 ⇒ 칸이 노란색을 띈다

둘다 일치하지 않을경우 ⇒ 칸이 회색을 띈다

정답과 추측한값이 일치하다면 ⇒ 결과창을 띄워주고 해당 게임은 종료한다.

그렇지 않다면, 다시 추측을 실시한다.

- `shadeKeyBoard()`

반복문을 통해서 주어진 문자와 일치하는 키를 찾고

해당 키의 컬러가 초록색이라면 ⇒ return 0;

해당 키의 컬러가 노란색이라면 ⇒ 초록색만 허용

이외의 값은 해당 문자의 컬러값을 칠한다.

[추가사항]

- [ ] 시작화면 구현(Start)
- [ ] WORDS의 값이 흔히 알고있는 일반적인 단어를 구성하도록
- [x] 다크모드 구현하기
- [x] ㄴ 다크모드 이쁘게 꾸미기 (지우고 바디 더블클릭시)
- [ ] 결과화면 구현하기
- [ ] 다시하기(결과화면 구현에서 다시하기 버튼)
- [x] 박스마다 테두리 없애기
- [x] 폰트 변경하기
