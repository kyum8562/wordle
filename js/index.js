const result = {1: 'CAKES',
              2: 'ANGEL',
              3: 'MATCH',
              4: 'BLACK',
              5: 'APPLE'};

var resultNum = Object.keys(result).length;
    resultNum = parseInt(Math.random()*(resultNum));

document.querySelector('button').addEventListener('click',
    function(){
        var input = document.querySelectorAll('.input');
        for(var i = 0 ; i < input.length ; i ++){

            if(input[i].value == result[resultNum][i]){
                input[i].style.background = 'green';
            }
            else if(result[resultNum].includes(input[i].value) && input[i].value != ''){
                input[i].style.background = 'yellow';
            }
            else{
                input[i].style.background = 'lightgrey';
            }
            input[i].classList.remove('input');

        }

        var template = `<div>
            <input class="input" maxlength ='1'>
            <input class="input" maxlength ='1'>
            <input class="input" maxlength ='1'>
            <input class="input" maxlength ='1'>
            <input class="input" maxlength ='1'>
        </div>`;
        document.querySelector('body').insertAdjacentHTML
        ('beforeend', template);
    });