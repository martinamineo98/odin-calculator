//// 1) The calculator has to be able to ADD, SUBTRACT, MULTIPLY and DIVIDE.
//// 2) operate() takes an operator and 2 numbers and then calls on of the
//// 		above functions on the numbers.
//// 3) The calculator needs a button for each digit, for each operation,
////		and a button to clear; the calculator also needs a display.
////		3.1) We also need a function that populate the display.
//// 4) We need to store the first number that is input into the calculator,
////		and the operation that has been chosen; we then operate on them when
////		the "=" key is pressed.
////		4.1) DILEMMA: how to store all these values and call the operate
////				 function on them.
//// 				 --------- We need to create a variable that keeps these operations
////									 in a string so that they can be showed on the display.
////				 --------- We also need a variable that contains the result.
////		4.2) ATTENTION: the user should be able to string together several
////				 operations, with **each pair** of numbers being evaluated at
////				 a time. The calculaor **should not** evaluate more than a single
////				 pair of numbers at the time.
////				 4.2.1) EXAMPLE: you press a button (ex. 1), followed by an operator
////								button (ex. add), a second number button (ex. 2), and finally
////								a second operator button (ex. subtract).
////								We need to evaluate the first pair of numbers (ex. 1 + 2),
////								then display the result of that calculation on the display,
////								and finally, use that result as the first number in the new
////								calculation, along with the second operator.
////		4.3) ATTENTION: Numbers with long decimals should be rounded.
////		4.4) ATTENTION: Don't let the calculator be crashed when a user tries
////				 to divide by 0.


//// Populate the #calculator container div.

//// 1) We need a button from each number from 0 to 9, a button from each
////		operator (+, -, *, ÷, %), a button to turn the number negative,
////		a button to add a decimal point, and a button to clear.
//// 2) Each button needs its own event listener on click.
//// 3) I will be using CSS Grid so I want each button to have its own class.


//// const container = document.querySelector('#calculator')


//// function createNumBtn() {
	//// for (let index = 0; index <= 9; index++) {
		//// let numBtn = document.createElement('button')
				//// numBtn.textContent = index
				//// numBtn.classList.toggle(`btn-num${index}`)
				//// numBtn.style.gridArea = `btn-num${index}`
				
				//// numBtn.addEventListener('click', (e) => {
					//// addNumberToString(index.toString())
					//// updateOperationDisplay(index.toString())
					//// updateResultDisplay(index.toString())
				//// })
		
		//// container.appendChild(numBtn)
	//// }
//// }


//// createNumBtn()


//// function createOperatorBtn() {
	//// const operatorSymbol = ['+', '-', '*', '÷', '%', '.', '=', 'ac', '+/-']
	//// const operatorName = ['add', 'subtract', 'multiply', 'divide', 'percentage', 'decimal', 'equal', 'clear', 'negative']
	//// const operatorFunction = [add, subtract, multiply, divide, percentage, decimal, equal, clearDisplay, negative]
	//// const operatorWithNumbers = [true, true, true, true, true, false, false, false, false]
	
	//// for (let index = 0; index < operatorSymbol.length; index++) {
		//// let operatorBtn = document.createElement('button')
				//// operatorBtn.textContent = `${operatorSymbol[index]}`
				//// operatorBtn.classList.toggle(`btn-${operatorName[index]}`)
				//// operatorBtn.style.gridArea = `btn-${operatorName[index]}`
				
				//// operatorBtn.addEventListener('click', () => {
					//// if (operatorName != 'clear') {
						//// operation = operatorFunction[index]
						//// operate(operatorWithNumbers[index])
						
						//// updateOperationDisplay(operatorSymbol[index])
					//// }
				//// })
		
		//// container.appendChild(operatorBtn)
	//// }
//// }


//// createOperatorBtn()


//Calculator Display


//// const displayOperation = container.querySelector('.calculator-display-operation')
//// const displayResult = container.querySelector('.calculator-display-result')


//// let displayOperationStr = ''
//// let displayResultStr = ''


//// function updateOperationDisplay(a) {
	//// displayOperationStr += `${a} `
	//// displayOperation.textContent = displayOperationStr
//// }

//// function updateResultDisplay(a) {
	//// displayResultStr = `${a} `
	//// displayResult.textContent = displayResultStr
//// }

//// function clearDisplay() {
	//// displayOperationStr = ''
	//// displayResultStr = ''
//// }

//// function populateDisplay(x) {
	//// displayOperationStr += `${x} `
//// }


//We need a function for each possible operation.


//// function add(a, b) {
	//// return a + b
//// }

//// function subtract(a, b) {
	//// return a - b
//// }

//// function multiply(a, b) {
	//// return a * b
//// }

//// function divide(a, b) {
	//// if (a == 0 || b == 0) {
		//// return 'ERROR'
	//// } else {
		//// return a / b
	//// }
//// }

//// function percentage(a) {
	//// return divide(a, 100)
//// }

//// function decimal() {
	//// return '.'
//// }

//// function negative(a) {
	//// return multiply(a, -1)
//// }

//// function equal() {
	
//// }

//Operate(): the function that evaluates the given inputs.
//When a click on the first number button, this number (as a string) gets
//saved on a num1 variable, when I click on a operation button, the chosen
//operation gets saved in a operation variable, when I click on the second
//number button, it gets saved in its variable.
//When num1, operation and num2 exist, or when the strings are not empty,
//they get saved in a result variable.
//When I click on another operation button, that's when the operation gets
//evaluated, the num1 and num2 need to be converted into numbers.
//The Operate() function needs to update the display at each step.

//I need to use parseFloat() to convert each string into a number while
//keeping its decimal number.


//// let num1 = ''
//// let num2 = ''
//// let operation = undefined

//// function operate(boo) {
	//// let result = ''
	
	//if (boo) {
		//if (num1.length > 0 && num2.length > 0) {
			//console.log(operation(parseFloat(num1), parseFloat(num2)))
			//result = operation(parseFloat(num1), parseFloat(num2))
			//resetOperation()
		//}
	//} else {
		//if (operation == negative || operation == percentage) {
			//if (num1.length > 0 && num2.length > 0) {
				//result = operation(parseFloat(num1), parseFloat(num2))
				//operation(result)
				//resetOperation()
		//}
	//}
	
	//// updateResultDisplay(result)
//// }

//// function resetOperation() {
	//// num1 = ''
	//// num2 = ''
	//// operation = undefined
//// }

//// function addNumberToString(num) {
	//// if (operation) {
		//// num2 += num
	//// } else {
		//// num1 += num
	//// }
	
	//// console.log(num1, num2)
//// }
