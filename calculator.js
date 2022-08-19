
const arr = [undefined, undefined, undefined]
const opArr = []
const container = document.querySelector('#calculator')

// Op = Operations

const sum = new Op('sum', '+', (a, b) => parseFloat(a) + parseFloat(b))
const sub = new Op('sub', '-', (a, b) => a - b)
const mul = new Op('mul', '*', (a, b) => a * b)
const div = new Op('div', '÷', (a, b) => a / b)
const neg = new Op('neg', '+/-', (a) => -a)
const dec = new Op('dec', '.', (a) => a += '.')
const equ = new Op('equ', '=', (a) => a)

function Op(name, str, fun) {
	this.name = name
	this.str = str
	this.fun = fun
	opArr.push(this)
}

// HTML Buttons

!function opBtn() {
	for (let i = 0; i < opArr.length; i++) {
		let btn = document.createElement('button')
				btn.classList.toggle('btn-op')
				btn.setAttribute('data-str', opArr[i].str)
				btn.style.gridArea = opArr[i].name
				btn.textContent = opArr[i].str
				
				if (opArr[i].name == 'dec') {
					btn.addEventListener('click', () => {
						addDecToString()
					})
				} else {
					btn.addEventListener('click', () => {
						previousOp = opArr[i]
						arr[1] = opArr[i]
						operate()
					})
				}
				
		container.appendChild(btn)
	}
}()

!function numBtn() {
	for (let i = 0; i < 10; i++) {
		let btn = document.createElement('button')
				btn.classList.toggle('btn-num')
				btn.style.gridArea = `num${i}`
				btn.textContent = i
				
				btn.addEventListener('click', () => {
					addNumToString(i)
				})
				
		container.appendChild(btn)
	}
}()

!function delBtn() {
	let btn = document.createElement('button')
			btn.classList.toggle('btn-op')
			btn.style.gridArea = 'ac'
			btn.textContent = 'ac'
	container.appendChild(btn)
}()

// Add a number to the arr[0] or arr[2] strings

function addNumToString(a) {
	// if (opWasAdded) {
		// if (!arr[2]) arr[2] = ''
		// arr[2] += `${a}`
	// } else if (!opWasAdded) {
		// if (!arr[0]) arr[0] = ''
		// arr[0] += `${a}`
	// }
	
	// console.log(arr[0], arr[2])
	
	// if (arr[2] == undefined) {
		// arr[2] += `${a}`
	// } else {
		// arr[0] += `${a}`
	// }
	
	// if (arr[1] != undefined && arr[2] == undefined) arr[2] = ''
	// if (arr[0] == undefined) arr[1] = ''
	
	if (arr[1] != undefined) {
		if (arr[2] == undefined) arr[2] = ''
		arr[2] += `${a}`
	}
	
	if (arr[1] == undefined) {
		if (arr[0] == undefined) arr[0] = ''
		arr[0] += `${a}`
	}
	
	console.log(arr[0], arr[2])
}

function addDecToString() {
	if (arr[1] != undefined) {
		if (arr[2] == undefined) arr[2] = '0'
		if (!arr[2].includes('.')) arr[2] += `.`
	}
	
	if (arr[1] == undefined) {
		if (arr[0] == undefined) arr[0] = '0'
		if (!arr[0].includes('.')) arr[0] += `.`
	}
	
	console.log(arr[0], arr[2])
}

// Operate Function

function  operate() {	
	if (arr[2]) {
		let result = getResult()
		arr[0] = parseFloat(result)
		arr[1] = undefined
		arr[2] = undefined
		console.log(result)
	}
}

function getResult() {
	return opArr[getOpIndex(opArr, arr[1].str)].fun(arr[0], arr[2])
}

function getOpIndex(arr, op) {
	return arr.map((e) => e.str).indexOf(op)
}

function fakeBtnClick(a) {
	document.querySelector('[data-str=\'=\']').click()
}
