// Machine Components
let states = []
let inputSymbols = []
let stackSymbols = []
let qi = ""
let Z = "Z"
let F = []
let transitions = []

let curState = ""
let stack = ""

// Object constructor that parses the string a user entered defining a transition into a JS object
function Transition(str) {
    const trans = str.split(" ")

    this.oldState = trans[0]

    if (trans[1] === "λ")
        this.read = ""
    else 
        this.read = trans[1]

    if (trans[2] === "λ")
        this.pop = ""
    else 
        this.pop = trans[2]

    this.newState = trans[3]
    
    if (trans[4] === "λ")
        this.push = ""
    else 
        this.push = trans[4]
}

function reset () {
    states = []
    inputSymbols = []
    stackSymbols = []
    qi = ""
    Z = "Z"
    F = []
    transitions = []

    curState = ""
    stack = Z

    document.getElementById("curState").innerHTML = ""
    document.getElementById("inputStr").innerHTML = ""
    document.getElementById("stack").innerHTML = ""
}

document.getElementById("enterBtn").addEventListener("click", () => {
    reset()

    let input = document.getElementById("machineDefinitionInput").value.trim().split("\n")
    for (let i=0; i < input.length; i += 1) 
        input[i] = input[i].trim()

    states = input[0].split()
    inputSymbols = input[1].split()
    stackSymbols = input[2].split()
    qi = input[3]
    Z = input[4]
    F = input[5].split()

    // parse transitions
    for (let i = 6; i < input.length; i += 1) 
        transitions.push(new Transition(input[i]))
})

document.getElementById("runBtn").addEventListener("click", () => {
    // resets
    let cont = document.getElementById("inputStr")
    cont.innerHTML = ""

    curState = qi
    stack = Z

    // update display
    document.getElementById("simulationContainer").hidden = false
    document.getElementById("curState").textContent = qi
    document.getElementById("stack").textContent = stack

    // create html element for every input symbol
    let userInput = document.getElementById("userInput").value
    for (let i = 0; i < userInput.length; i += 1) {
        let elem = document.createElement("span")
        elem.textContent = userInput[i]
        
        if (i == 0)
            elem.setAttribute("class", "selected")
        cont.appendChild(elem)
    } 
})

// returns the transition that the machine can take or an empty object if there is none
function findTransition(input) {
    transitions.forEach((t) => {
        console.log(t.oldState + ' ' + curState)
        if (t.oldState === curState && t.pop === stack[0] && (t.read === input || t.read === "")) {
            return t
        }
    })

    return false
}

function step() {
    let symbols = document.getElementById("inputStr").children

    // find next input
    let i
    for (i = 0; i < symbols.length; i += 1) {
        if (symbols[i].getAttribute("class") == "selected")
            break
    }

    let trans = findTransition(symbols[i].textContent)
    if (trans === false) {
        return
    }
    console.log(trans)
    // console.log(trans.newState)
    // console.log(trans.pop)
    // console.log(trans.push)
    // take transition
    curState = trans.newState

    if (trans.pop !== "")
        stack = stack.substring(1) // pop from stack
    stack = trans.push + stack // push onto stack
    
    // update display
    document.getElementById("curState").textContent = curState
    document.getElementById("stack").textContent = stack

    symbols[i].setAttribute("class", "")
    symbols[i + 1].setAttribute("class", "selected")
}

document.getElementById("stepBtn").addEventListener("click", () => {
    step()
})