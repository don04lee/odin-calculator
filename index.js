// creating base of an operation
let firstNum;
let operator;
let previousKey;

let start = true;

// establish display
let display = document.querySelector('.display');

// establishing buttons
let allNums = document.querySelectorAll('.number');
let clearButton = document.querySelector('#ac');
let operations = document.querySelectorAll('.operation');
let equals = document.querySelector('#equals');
let deletes = document.querySelector('#delete');
let decimal = document.querySelector('#decimal');
let sign = document.querySelector('#sign');
let percent = document.querySelector('#percent');
let buttons = document.getElementById('buttons').children;

for(let button of buttons) {
  button.addEventListener('click', function() {
    let curr = button;
    for(let b of buttons) {
      if(b !== curr) {
        b.classList.remove('active');
      }
    }
    button.classList.toggle('active');
  });
};

allNums.forEach(num => {
  num.addEventListener('click', function() {
    if(display.textContent == "0" || previousKey == "operator") {
      display.textContent = num.textContent;
    }
    else {
      display.textContent += "" + num.textContent;
    }
    previousKey = "num";
  });
}); 

operations.forEach(op => {
  op.addEventListener('click', function() {
    let curr = op;
    console.log(firstNum + " " + display.textContent);
    if(previousKey == "num" && firstNum == null) {
      firstNum = display.textContent;
    }
    else if(previousKey == "num") {
      firstNum = operate(operator, firstNum, display.textContent);
      display.textContent = firstNum;
    }
    operator = op.textContent;
    previousKey = "operator";
  });
});

clearButton.addEventListener('click', function() {
  reset();
});

equals.addEventListener('click', function() {
  if(previousKey == "num" && firstNum != null) {
    firstNum = operate(operator, firstNum, display.textContent);
    display.textContent = firstNum;
  }
  previousKey = "operator";
});

decimal.addEventListener('click', function() {
  if(display.textContent != "0" && !display.textContent.includes(".")) {
    display.textContent += ".";
    previousKey = "num";
  }
});

deletes.addEventListener('click', function() {
  if(display.textContent != "0") {
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
  }

  if(display.textContent == "") {
    display.textContent = "0";
  }
  previousKey = "num";
});

sign.addEventListener('click', function() {
  if(display.textContent != "0") {
    display.textContent *= -1;
    firstNum = display.textContent;
    previousKey = "operator";
  }
})

percent.addEventListener('click', function() {
  if(display.textContent != "0") {
    display.textContent /= 100;
    firstNum = display.textContent;
    previousKey = "operator";
  }
})

function reset() {
  firstNum = null;
  operator = null;
  display.textContent = "0";
}

function add(a, b) {
  return Number(a) + Number(b);
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function subtract(a, b) {
  return a - b; 
}

function operate(operator, a, b) {
  if(operator == "*") {
    return multiply(a, b);
  }
  else if(operator == "+") {
    return add(a, b);
  }
  else if(operator == "-") {
    return subtract(a, b);
  }
  else if(operator == "/") {
    return  divide(a, b);
  }
}