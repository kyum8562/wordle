var result = 'cakes';
document.querySelector('button').addEventListener('click',
function(){
    var input = document.querySelectorAll('.input');
    
    for(var i = 0 ; i < input.length ; i ++){
        if(input[i].value == result[i]){
            input[i].style.background = 'green';
        }
        else if(result.includes(input[i].value) && input[i].value != ''){
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

    
})

