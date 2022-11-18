'use strict';

const display = document.querySelector('#display');
const keybords = document.querySelectorAll('[id*= tecla]');
const operation = document.querySelectorAll('[id*= operador]');

let newNumber = true;
let operador ;
let numberPrevious ;

const operantionWait = () => (operador !== undefined)

const calc = () =>{
    if(operantionWait()){
        const actualNumber = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        const result = eval (`${numberPrevious} ${operador} ${actualNumber}`)
        atulizationDisplay(result)
        
    }
}

const atulizationDisplay = (texto) => {
    if(newNumber){
        display.textContent = texto.toLocaleString('BR'); 
        newNumber = false
    }else{
        display.textContent += texto.toLocaleString('BR'); 
    }
    
};
const insertNumbers = (event) => atulizationDisplay(event.target.textContent);


const selectionOperation = (event) => {
    if(!newNumber){
        calc();
        newNumber = true;
        operador = event.target.textContent;
        numberPrevious = parseFloat(display.textContent);
    }
    
}

keybords.forEach(numbers => numbers.addEventListener('click',insertNumbers));
operation.forEach(operadores => operadores.addEventListener('click',selectionOperation));
const activeEqual = () =>{
    calc();
    operador= undefined;

}
const clearDisplay = () =>    display.textContent ='';

const clearCalc = () =>{
    clearDisplay();
    operador= undefined;
    newNumber = true;
    numberPrevious = undefined;
}
const negativeSinal= () => {
    newNumber = true;
    atulizationDisplay(display.textContent * -1)
}
const haveDecimal = () => display.textContent.indexOf(',') !== -1;
const haveValue = () => display.textContent.length > 0;

const pointCalc = () => {
       if(!haveDecimal()){
            if(haveValue()){
                atulizationDisplay(',')
            }
       }else{
        atulizationDisplay('0,')
       }
}
const clearLastNumber = () => display.textContent = display.textContent.slice(0,-1);

document.getElementById('resultado').addEventListener('click', activeEqual);
document.getElementById('limparCE').addEventListener('click', clearDisplay);
document.getElementById('limparC').addEventListener('click', clearCalc);
document.getElementById('retornar').addEventListener('click', clearLastNumber);
document.getElementById('inverter').addEventListener('click', negativeSinal);
document.getElementById('ponto').addEventListener('click', pointCalc);

const mapKeyBoard ={
    '0': 'tecla 0',
    '1': 'tecla 1',
    '2': 'tecla 2',
    '3': 'tecla 3',
    '4': 'tecla 4',
    '5': 'tecla 5',
    '6': 'tecla 6',
    '7': 'tecla 7',
    '8': 'tecla 8',
    '9': 'tecla 9',
    '+': 'operador somar',
    '-': 'operador subtracao',
    '*': 'operador multiplicar',
    '/': 'operador dividir',
    'Backspace':'retornar',
    'Esc': 'LimparCE',
    'Enter': 'resultado',
    '.': 'ponto',
    ',': 'ponto'

}
const mapsKeyBoard = (event) => {
    const keyBords = event.key;

    const keyPermission = () => Object.keys(mapKeyBoard).indexOf(keyBords)!==-1;
    if(keyPermission())document.getElementById(mapKeyBoard[keyBords]).click()
}
document.addEventListener('keydown', mapsKeyBoard);