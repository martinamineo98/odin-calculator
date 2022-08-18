

// 1) The calculator has to be able to ADD, SUBTRACT, MULTIPLY and DIVIDE.
// 2) operate() takes an operator and 2 numbers and then calls on of the
// 		above functions on the numbers.
// 3) The calculator needs a button for each digit, for each operation,
//		and a button to clear; the calculator also needs a display.
//		3.1) We also need a function that populate the display.
// 4) We need to store the first number that is input into the calculator,
//		and the operation that has been chosen; we then operate on them when
//		the "=" key is pressed.
//		4.1) DILEMMA: how to store all these values and call the operate
//				 function on them.
//		4.2) ATTENTION: the user should be able to string together several
//				 operations, with **each pair** of numbers being evaluated at
//				 a time. The calculaor **should not** evaluate more than a single
//				 pair of numbers at the time.
//				 4.2.1) EXAMPLE: you press a button (ex. 1), followed by an operator
//								button (ex. add), a second number button (ex. 2), and finally
//								a second operator button (ex. subtract).
//								We need to evaluate the first pair of numbers (ex. 1 + 2),
//								then display the result of that calculation on the display,
//								and finally, use that result as the first number in the new
//								calculation, along with the second operator.
//		4.3) ATTENTION: Numbers with long decimals should be rounded.
//		4.4) ATTENTION: Don't let the calculator be crashed when a user tries
//				 to divide by 0.


// Populate the #calculator container div.

// 1) We need a button from each number from 0 to 9, a button from each
//		operator (+, -, *, ÷, %), a button to turn the number negative,
//		a button to add a decimal point, and a button to clear.
// 2) Each button needs its own event listener on click.
// 3) I will be using CSS Grid so I want each button to have its own class.


const container = document.querySelector('#calculator')


function createNumBtn() {
	for (let index = 0; index <= 9; index++) {
		let numBtn = document.createElement('button')
				numBtn.textContent = index
				numBtn.classList.toggle(`btn-num${index}`)
				numBtn.style.gridArea = `btn-num${index}`
		
		container.appendChild(numBtn)
	}
}


createNumBtn()


function createOperatorBtn() {
	const operatorSymbol = ['+', '-', '*', '÷', '%', '.', '=', 'ac', '+/-']
	const operatorName = ['add', 'subtract', 'multiply', 'divide', 'percentage', 'decimal', 'equal', 'clear', 'negative']
	
	for (let index = 0; index < operatorSymbol.length; index++) {
		let operatorBtn = document.createElement('button')
				operatorBtn.textContent = `${operatorSymbol[index]}`
				operatorBtn.classList.toggle(`btn-${operatorName[index]}`)
				operatorBtn.style.gridArea = `btn-${operatorName[index]}`
		
		container.appendChild(operatorBtn)
	}
}


createOperatorBtn()


