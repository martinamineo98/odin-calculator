
// opArr contains each possible operation in an array.
// todo: calculator display

const opArr = []

const sum = new Op('+', (a, b) => parseFloat(a) + parseFloat(b), 'sum')
const sub = new Op('-', (a, b) => parseFloat(a) - parseFloat(b), 'sub')
const mul = new Op('*', (a, b) => parseFloat(a) * parseFloat(b), 'mul')
const div = new Op('/', (a, b) => (a == 0 || b == 0) ? 'ERROR' : parseFloat(a) / parseFloat(b), 'div')
const exp = new Op('^', (a, b) => parseFloat(a) ** parseFloat(b), 'exp')
const equ = new Op('=', () => operate(), 'equ')

function Op(str, fun = undefined, name) {
	this.str = str
	this.fun = fun
	this.name = name
	opArr.push(this)
}

// operate() does the magic
// operate() can evaluate only two numbers at a time
// each time operate() works, the result becomes the new arr[0] and
// arr[1] and arr[2] become undefined again

// the odin projects wants operate() to require three arguments, I
// decided to replace them with an array, just personal choice.

// arr[0] = first number
// arr[1] = chosen operation
// arr[2] = second number

const arr = [undefined, undefined, undefined]
let result

function operate(newOp = undefined) {
	if (arr[2] != undefined) {
		result = parseFloat(arr[1].fun(arr[0], arr[2]))
		arr[0] = result
		arr[1] = newOp
		arr[2] = undefined
		updateDisplayResult()
	}
}

function resetOperate() {
	arr[0] = undefined
	arr[1] = undefined
	arr[2] = undefined
	result = undefined
}

function checkIfNull(a) {
	(typeof a != null) ? true : false
}

// calculator buttons
// opBtn's event listener add the chosen operation to arr[1]
// negBtn and decBtn work more like a numBtn than an opBtn that's why
// they are separated by them. Just like numBtn they add a string to
// one of the two numbers.
// delBtn, works like the previous buttons, but rather than adding a
// string, it removes the last character at the end of the string.
// acBtn = all-clear
// it deletes everything and starts anew by using resetOperate() just
// like when clicking on the "=" button.

!function createBtns(){
	const calculator = document.querySelector('#calculator')
	
	for (let i = 0; i < 10; i++) {
		let numBtn = document.createElement('button')
				numBtn.classList.toggle('btn-num')
				numBtn.style.gridArea = `btn-num${i}`
				numBtn.textContent = i
				numBtn.addEventListener('click', () => {
					addNum(i)
				})
		calculator.appendChild(numBtn)
	}
	
	for (let j = 0; j < opArr.length; j++) {
		let opBtn = document.createElement('button')
				opBtn.classList.toggle('btn-op')
				opBtn.style.gridArea = `btn-${opArr[j].name}`
				opBtn.textContent = opArr[j].str
				opBtn.addEventListener('click', () => {			
					if (arr[0] != undefined) {
						if (opArr[j].str != '+/-' || opArr[j].str != '.') {
							(arr[2] == undefined && opArr[j].str != '=') ? arr[1] = opArr[j] : operate(opArr[j])
							if (opArr[j].str == '=') {
								updateDisplayResult()
								resetOperate()
							}
							
							if (opArr[j].str != '=' && result == undefined) {
								updateDisplayResult('')
							}
						}
						
						if (opArr[j].str == '+/-') addNeg()
						if (opArr[j].str == '.') addDec()
					} else {
						updateDisplayResult('ERROR')
					}
				})
		calculator.appendChild(opBtn)
	}
	
	let negBtn = document.createElement('button')
			negBtn.classList.toggle('btn-op')
			negBtn.style.gridArea = 'btn-neg'
			negBtn.textContent = '+/-'
			negBtn.addEventListener('click', () => addNeg())
	calculator.appendChild(negBtn)
	
	let decBtn = document.createElement('button')
			decBtn.classList.toggle('btn-op')
			decBtn.style.gridArea = 'btn-dec'
			decBtn.textContent = '.'
			decBtn.addEventListener('click', () => addDec())
	calculator.appendChild(decBtn)
	
	let delBtn = document.createElement('button')
			delBtn.classList.toggle('btn-op')
			delBtn.style.gridArea = 'btn-del'
			delBtn.textContent = '←'
			delBtn.addEventListener('click', () => removeStr())
	calculator.appendChild(delBtn)
	
	let acBtn = document.createElement('button')
			acBtn.classList.toggle('btn-op')
			acBtn.style.gridArea = 'btn-ac'
			acBtn.textContent = 'ac'
			acBtn.addEventListener('click', () => {
				clearDisplay()
				resetOperate()
			})
	calculator.appendChild(acBtn)
}()

// numBtn's event listener on click
// it turns the correct variable into a string and adds a number to it

function addNum(a) {
	checkIfArr()

	if (arr[0] != undefined && arr[1] == undefined) {
		arr[0] += a
		updateDisplayResult(arr[0])
	}
	
	if (arr[2] != undefined) {
		arr[2] += a
		updateDisplayResult(arr[2])
	}
}

// addNeg adds a '-' symbol to the correct number

function addNeg() {
	if (arr[0] != undefined && arr[1] == undefined) {
		arr[0] = `-${arr[0]}`
		updateDisplayResult(arr[0])
	}
	
	if (arr[2] != undefined) {
		arr[2] = `-${arr[2]}`
		updateDisplayResult(arr[2])
	}
}

// addDec adds a decimal point to the correct number but first checks
// if they already contain a decimal number

function addDec() {
	checkIfArr('0')
	
	if (arr[0] != undefined && arr[1] == undefined) {
		if (!arr[0].includes('.')) {
			arr[0] = `${arr[0]}.`
			updateDisplayResult(arr[0])
		}
	}
	
	if (arr[2] != undefined) {
		if (!arr[2].includes('.')) {
			arr[2] = `${arr[2]}.`
			updateDisplayResult(arr[2])
		}
	}
}

function removeStr() {
	checkIfArr()
	
	if (arr[0] != undefined) {
		if (arr[2] == undefined || arr[2] == '' || arr[2] == '-') {
			arr[0] = arr[0].slice(0, -1)
			updateDisplayResult(arr[0])
		}
		
		if (arr[0].length == 0) {
			arr[1] = undefined
			arr[2] = undefined
			updateDisplayResult('')
		}
	}
	
	if (arr[2] != undefined) {
		arr[2] = arr[2].slice(0, -1)
		updateDisplayResult(arr[2])
	}

	if (arr[0] != undefined && arr[0] == '') {
		arr[0] = undefined
		updateDisplayResult('')
	}
	
	if (arr[2] != undefined && arr[2] == '') {
		arr[2] = undefined
		updateDisplayResult(arr[0])
	}
}

// helper function for addNum, addNeg and addDec
// check if arr[0] and arr[2] are undefined and transforms them into strings

function checkIfArr(str = '') {
	if (arr[0] == undefined) arr[0] = `${str}`
	if (arr[1] != undefined && arr[2] == undefined) arr[2] = `${str}`
}

// console.log each item in arr at each button click

const btns = document.querySelectorAll('button')
			btns.forEach((btn) => {
				btn.addEventListener('click', () => console.log(arr[0], arr[1], arr[2]))
			})

// Calculator Display

const displayResult = document.querySelector('.calculator-result')

function updateDisplayResultWithStr(x) {
	displayResult.textContent += x
}

function updateDisplayResult(x = result) {
	displayResult.textContent = x
}

function clearDisplay() {
	displayResult.textContent = ''
}
