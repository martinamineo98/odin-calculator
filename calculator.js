
// 1) We need to create a createOperator constructor, and an object for
// each possible operation.

// N.B. I will treat the '.' button, the one that adds a decimal point to
// the number, as a number button.

const operatorBtns = []

function Operator(name, symbol, fun, symbolOnDisplay = true) {
	this.name = name
	this.symbol = symbol
	this.fun = fun
	this.symbolOnDisplay = symbolOnDisplay
	
	operatorBtns.push(this)
}

let add = new Operator('add', '+', function(a, b) {return a + b})
let subtract = new Operator('subtract', '-', function(a, b) {return a - b})
let multiply = new Operator('multiply', '*', function(a, b) {return a * b})
let divide = new Operator('divide', '÷', function(a, b) {return a * b})
let percentage = new Operator('percentage', '%', function(a) {divideBtn.fun(a, 100)})
let negative = new Operator('negative', '+/-', function(a) {return -a})
let equal = new Operator('equal', '=', (str) => {addToDisplayResultStr(str)}, false)

let clear = new Operator('clear', 'ac', function() {
	num1 = ''
	num2 = ''
	result = ''
	
	displayOperationStr = ''
	displayResultStr = ''
	
	updateDisplayOperationStr('')
	updateDisplayResultStr('')
}, false)

// 2) We need to populate the #calculator div with buttons for each number
//		and each operator. 

const container = document.querySelector('#calculator')

!function createNumBtn() {
	for (let index = 0; index <= 9; index++) {
		let numBtn = document.createElement('button')
				numBtn.classList.toggle(`btn-num${index}`)
				numBtn.style.gridArea = `btn-num${index}`
				numBtn.textContent = index
				
				numBtn.addEventListener('click', () => {
					addNumberToString(index)
					addToDisplayOperationStr(index)
				})
		
		container.appendChild(numBtn)
	}
}()

!function createOperatorBtn(){
	for (let index = 0; index < operatorBtns.length; index++) {
		let btn = document.createElement('button')
				btn.classList.toggle(`btn-${operatorBtns[index].name}`)
				btn.style.gridArea = `btn-${operatorBtns[index].name}`
				btn.textContent = `${operatorBtns[index].symbol}`
				
				btn.addEventListener('click', () => {
					operate(operatorBtns[index])
					if (operatorBtns[index].symbolOnDisplay) {
						addToDisplayOperationStr(operatorBtns[index].symbol)
					}
				})
				
		container.appendChild(btn)
	}
}()

!function createDecimalBtn() {
	let decimalBtn = document.createElement('button')
			decimalBtn.classList.toggle('btn-decimal')
			decimalBtn.gridArea = 'btn-decimal'
			decimalBtn.textContent = '.'
			
			decimalBtn.addEventListener('click', () => {
				addDecimalPointToString()
			})
			
	container.appendChild(decimalBtn)
}()

// 4) The operate() function evaluates the operation between two given
//		numbers. When I click on a number (or a series of numbers), they
//		are inserted in a string called num1. When I click on a operator,
//		the chosen operator function is inserted in a variable called
// 		chosenOperator. When num1 and chosenOperator both exists, when a
// 		click on another number (or another series of numbers), it's
// 		inserted in a num2 variable.
//		Each time I click on an operator button, the operate() function is
// 		invoked. If the length of num1 and num2 is more than 0, it gives me
// 		the result of the operation. The result is then inserted in its own
//		variable and displayed on the screen.

//		If the length of the result variable is more than 0, I need to
//		invoke the operation between the num2 variable and the result.

//		If the given operation only requires one argument, and the length
// 		of the num2 variable is less than or equal 0, I will pass this function
//		the num1 variable, otherwise I will pass the result variable as an
//		argument.

//		Exception to this is the negativeBtn.fun(), if the length of num2
// 		is less than or equal 0, I will pass it the num1 variable, otherwise
//		the num2 one.

//		I use the length of the string to verify which variable was last
//		used, or to verify if it exists.

let num1 = ''
let num2 = ''
let result = ''
let chosenOperation

let previousChosenOperation

// I evaluate the first two values and then, the result becomes the new
// first value. The second value becomes ''.

function operate(operation = previousChosenOperation) {
	let num1Float = parseFloat(num1)
	let num2Float = parseFloat(num2)
	
	chosenOperation = operation
	
	if (num2.length > 0) {
		if (operation.fun.length > 1) {
			result = operation.fun(num1Float, num2Float)
			previousChosenOperation = operation.fun
			chosenOperation = null
			num1 = result
			num2 = ''
		}
	}
	
	if (operation.name == 'clear') {
		operation.fun()
	}
	
	if (operation.name == 'equal') {
		if (num1.length == 0 && num2.length == 0) {
			operation.fun(0)
		}
		
		if (num2.length > 0) {
			operation.fun(result)
		}
	}

	console.log(result)
}

// 4.1) To verify in which variable I need to insert the number, I created
//			a helper function called addNumberToString. If the chosenOperator
//			variable is not undefined, it adds it to num2, otherwise it adds
//			it to num1. I will invoke this function each time a numBtn is
//			clicked.

// 4.2) The addDecimalPointToString function works similarly but it also
//			checks if the correct variable already has a decimal point. To do
//			this I also created another helper function called checkIfStringContains.

function addNumberToString(x) {
	if (chosenOperation) {
		num2 += x
	} else {
		num1 += x
	}
	
	console.log(num1, num2)
}

function addDecimalPointToString() {
	if (chosenOperation) {
		if (!checkIfStringContains(num2, '.')) {
			num2 += '.'
		}
	} else {
		if (!checkIfStringContains(num1, '.')) {
			num1 += '.'
		}
	}
	
	console.log(num1, num2)
}

function checkIfStringContains(x, y) {
	return x.includes(y)
}

// 5) Populate the Display

const displayOperation = container.querySelector('.calculator-display-operation')
const displayResult = container.querySelector('.calculator-display-operation')

let displayOperationStr = ''
let displayResultStr = ''

function addToDisplayOperationStr(str) {
	displayOperationStr += `${str} `
	updateDisplayOperationStr()
}

function addToDisplayResultStr(str) {
	displayResultStr += `${str}`
	updateDisplayResultStr()
}

function updateDisplayOperationStr(str = displayOperationStr) {
	displayOperation.textContent = str
}

function updateDisplayResultStr(str = displayResultStr) {
	displayResult.textContent = str
}
