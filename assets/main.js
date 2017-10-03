let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let code = document.getElementById('code');
let guessingDiv = document.getElementById("guessing-div");
let replayDiv = document.getElementById("replay-div");

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == ''){
        setHiddenFields();
    }

    if(validateInput(input.value)) {
        attempt.value++;
    } else {
        return false;
    }
    var final = getResults(input.value);
    if(final) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (!final && attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields(){
    let num = Math.floor(Math.random() * 9999) + 0;
    let stringNumber = num.toString();
    while(stringNumber.length < 4) {
        stringNumber = "0" + stringNumber;
    }
    answer.value = stringNumber;
    attempt.value = 0;
    
}

function setMessage(msg){
    message.innerHTML = msg;
}

function validateInput(val) {
    if(val.length == 4){
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(value) {
    var target = document.getElementById("results");
    var divGuess = document.createElement("div");
    var divResult = document.createElement("div");
    var spanGuess = document.createElement("span");
    var correctAnswers = 0;
    divResult.classList.add("col-md-6");
    spanGuess.classList.add("col-md-6");
    spanGuess.innerHTML = value;

    for (var i = 0; i < value.length; i++) {
        let span = document.createElement("span");
        let flag = false;
        if(value[i] == answer.value[i]){
            span.classList.add("glyphicon");
            span.classList.add("glyphicon-ok");
            divResult.appendChild(span);
            correctAnswers++;
            continue;
        }
        for(var j = 0; j < answer.value.length; j++) {
            if(value[i] == answer.value[j]) {
                span.classList.add("glyphicon");
                span.classList.add("glyphicon-transfer");
                divResult.appendChild(span);
                flag = true;
            }
        }
        if(flag == false){
            span.classList.add("glyphicon");
            span.classList.add("glyphicon-remove");
            divResult.appendChild(span);
        }
    }

    divGuess.classList.add("row");
    divGuess.appendChild(spanGuess);
    divGuess.appendChild(divResult);
    target.appendChild(divGuess);

    if(correctAnswers == 4) {
        return true;
    } else {
        return false;
    }
}

function showAnswer(param) {
    if(param == true) {
        code.classList.add("success");
    } else {
        code.classList.add("failure");
    }
    code.innerHTML = answer.value;
}

function showReplay(){
    guessingDiv.style.display = "none";
    replayDiv.style.display = "block";
}


