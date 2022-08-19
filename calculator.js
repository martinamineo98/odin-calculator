
// Operations planned: sum, subtract, multiply and divide.
// I've added them to an array to make it easier to populate the container
// with their matching button.

const operationFunctions = []

const Operation = function(name, str, fun) {
	this.name = name
	this.str = str
	this.fun = fun
	operationFunctions.push(this)
}

let sum = new Operation('sum', '+', (a, b) => {return parseFloat(a) + parseFloat(b)})
let subtract = new Operation('subtract', '-', (a, b) => {return a - b})
let multiply = new Operation('multiply', '*', (a, b) => {return a * b})
let divide = new Operation('divide', '÷', (a, b) => {return (a == 0 || b == 0) ? 'ERROR' : a / b})
let equal = new Operation('equal', '=', (a) => {return a})

// Populating the #calculator div with the needed buttons

const container = document.querySelector('#calculator')

!function createNumberBtn() {
	for (let index = 0; index < 10; index++) {
		let btn = document.createElement('button')
				btn.classList.toggle(`btn-num${index}`)
				btn.style.gridArea = `btn-num${index}`
				btn.textContent = index
		
			btn.addEventListener('click', () => {
				addStrToNum(index)
				updateDisplayHistory(index)
			})
		
		container.appendChild(btn)
	}
}()

!function createOperatorBtn() {
	for (let index = 0; index < operationFunctions.length; index++) {
		let btn = document.createElement('button')
				btn.classList.toggle(`btn-${operationFunctions[index].name}`)
				btn.style.gridArea = `btn-${operationFunctions[index].name}`
				btn.textContent = `${operationFunctions[index].str}`
				
			btn.addEventListener('click', () => {
				operate(operationFunctions[index])
				updateDisplayHistory(operationFunctions[index].str)
				opDone = true
				chosenOp = operationFunctions[index]
			})
		
		container.appendChild(btn)
	}
}()

!function createDecimalBtn() {
	let btn = document.createElement('button')
			btn.classList.toggle('btn-decimal')
			btn.style.gridArea = 'btn-decimal'
			btn.textContent = '.'
			
			btn.addEventListener('click', () => {
				updateDisplayHistory('.')
			})
	container.appendChild(btn)
}()

!function createClearButton() {
	let btn = document.createElement('button')
			btn.classList.toggle('btn-clear')
			btn.style.gridArea = 'btn-clear'
			btn.textContent = 'clear'
			
			btn.addEventListener('click', () => {
				resetCalculator()
				resetDisplay()
			})
			
	container.appendChild(btn)
}()

// Populating and updating the display when needed.

const displayHistory = container.querySelector('.calculator-display-history')
const displayResult = container.querySelector('.calculator-display-result')

let displayHistoryStr = ''
let displayResultStr = ''

function updateDisplayHistory(str = '') {
	displayHistoryStr += str
	displayHistory.textContent = displayHistoryStr
}

function updateDisplayResult(str = '') {
	displayResultStr = str
	displayResult.textContent = displayResultStr	
}

function resetDisplay() {
	displayHistoryStr = ''
	displayResultStr = ''
	updateDisplayHistory()
	updateDisplayResult()
}

// The operate() function.
// The operate() function takes an operator and 2 numbers and then
// calls one of the above functions on the numbers.

// opDone: the operation has been chosen already when true.

let num1
let num2
let result
let opDone = false

let chosenOp

let previousOp
let previousNum1
let previousNum2
let previousResult

let num1Str = ''
let num2Str = ''

function operate(op = chosenOp) {
	if (num2) {
		previousOp = op
		previousNum1 = num1
		previousNum2 = num2
		previousResult = op.fun(num1, num2)
		result = op.fun(num1, num2)
		updateDisplayResult(result)
		resetOp()
	}
	
	console.log(op.fun.length)
	console.log(op)

	if (op.fun.length == 1) {
		updateDisplayResult(previousOp.fun(previousNum1, previousNum2))
	}
	
	// console.log(num1, num2, previousNum1, previousNum2)
}

function addStrToNum(str) {
	if (opDone) {
		num2Str += str
		num2 = num2Str
	} else {
		num1Str += str
		num1 = num1Str
	}
}

function resetCalculator() {
	num1 = undefined
	num2 = undefined
	result = undefined
	opDone = false
	
	resetNumStr()
}

function resetOp() {
	num1 = result
	num2 = undefined
	opDone = false
	resetNumStr()	
}

function resetNumStr() {
	num1Str = ''
	num2Str = ''
}
