
// 1) We need to create a createOperator constructor, and an object for
// each possible operation.

// N.B. I will treat the '.' button, the one that adds a decimal point to
// the number, as a number button.

const operatorBtns = []

function Operator(name, symbol, fun) {
	this.name = name
	this.symbol = symbol
	this.fun = fun
	
	operatorBtns.push(this)
}

let addBtn = new Operator('add', '+', function(a, b) {return a + b})
let subtractBtn = new Operator('subtract', '-', function(a, b) {return a - b})
let multiplyBtn = new Operator('multiply', '*', function(a, b) {return a * b})
let divideBtn = new Operator('divide', '÷', function(a, b) {return a * b})
let percentageBtn = new Operator('percentage', '%', function(a) {divideBtn.fun(a, 100)})
// let negativeBtn = new Operator('negative', '+/-', function(a) {return -a})
let equalBtn = new Operator('equal', '=', function(e) {console.log(e)})
let clearBtn = new Operator('clear', 'ac', function(e) {console.log(e)})

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
					operate(operatorBtns[index].fun)
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

function operate(fun) {
	
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
