// script.js

// Funcionalidad para cambiar entre calculadoras
const tabButtons = document.querySelectorAll('.tab-button');
const calculatorSections = document.querySelectorAll('.calculator-section');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Quitar la clase 'active' de todos los botones y secciones
    tabButtons.forEach(btn => btn.classList.remove('active'));
    calculatorSections.forEach(section => section.classList.remove('active'));

    // Añadir la clase 'active' al botón y sección seleccionados
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});


// Lógica de la calculadora (incluye la ya existente)
const resultStandard = document.getElementById('result-standard');
const resultScientific = document.getElementById('result-scientific');
const buttons = document.querySelectorAll('button');

// Variables para controlar la operación actual y los paréntesis
let currentOperation = '';
let operationInProgress = false;
let openParentheses = 0;

// Función para manejar clics en los botones de la calculadora
function handleCalculatorButtonClick(button) {
  const buttonId = button.id;
  const buttonText = button.textContent;
  const activeResult = document.querySelector('.calculator-section.active .results-container p');

  switch (buttonId) {
    case 'deleteBtn':
      if (currentOperation.endsWith('(')) {
        openParentheses--;
      } else if (currentOperation.endsWith(')')) {
        openParentheses++;
      }
      currentOperation = currentOperation.slice(0, -1);
      activeResult.textContent = currentOperation;
      break;
    case 'resetBtn':
      currentOperation = '';
      openParentheses = 0;
      activeResult.textContent = '';
      break;
    case 'parenthesisBtn':
      if (openParentheses > 0 && (/[0-9]$/.test(currentOperation) || currentOperation.endsWith(')'))) {
        currentOperation += ')';
        openParentheses--;
      } else {
        currentOperation += '(';
        openParentheses++;
      }
      activeResult.textContent = currentOperation;
      break;
    case 'percentageBtn':
      if (currentOperation && !isNaN(currentOperation[currentOperation.length - 1])) {
        currentOperation = eval(currentOperation) / 100;
        activeResult.textContent = currentOperation;
      }
      break;
    case 'divisionBtn':
    case 'multiplicationBtn':
    case 'minusBtn':
    case 'plusBtn':
      if (!operationInProgress) {
        currentOperation += buttonText === 'x' ? '*' : buttonText;
        activeResult.textContent = currentOperation;
        operationInProgress = true;
      }
      break;
    case 'equalBtn':
      try {
        currentOperation = eval(currentOperation.replace(/,/g, '.'));
        activeResult.textContent = currentOperation;
      } catch (error) {
        activeResult.textContent = 'Error';
      }
      break;
    case 'sqrtBtn':
      currentOperation = Math.sqrt(eval(currentOperation));
      activeResult.textContent = currentOperation;
      break;
    case 'powBtn':
      currentOperation = Math.pow(eval(currentOperation), 2);
      activeResult.textContent = currentOperation;
      break;
    case 'piBtn':
      currentOperation += Math.PI;
      activeResult.textContent = currentOperation;
      break;
    case 'logBtn':
      currentOperation = Math.log10(eval(currentOperation));
      activeResult.textContent = currentOperation;
      break;
    case 'sinBtn':
      currentOperation = Math.sin(eval(currentOperation));
      activeResult.textContent = currentOperation;
      break;
    case 'cosBtn':
      currentOperation = Math.cos(eval(currentOperation));
      activeResult.textContent = currentOperation;
      break;
    case 'tanBtn':
      currentOperation = Math.tan(eval(currentOperation));
      activeResult.textContent = currentOperation;
      break;
    case 'expBtn':
      currentOperation = Math.exp(eval(currentOperation));
      activeResult.textContent = currentOperation;
      break;
    default:
      currentOperation += buttonText;
      activeResult.textContent = currentOperation;
      operationInProgress = false;
      break;
  }
}

// Asignar la función de manejo de clics solo a los botones de la calculadora
buttons.forEach(button => {
  if (!button.classList.contains('tab-button')) {
    button.addEventListener('click', () => handleCalculatorButtonClick(button));
  }
});
