// Group members: Samuel Cheng, Kendrick Pua, Tyrone Uy

// Machine Components
let states = []
let inputSymbols = []
let stackSymbols = []
let qi = ""
let Z = "Z"
let finalStates = []
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

document.getElementById("enterBtn").addEventListener("click", () => {
    document.getElementById("simulationContainer").hidden = true
    document.getElementById("saved").hidden = false

    let input = document.getElementById("machineDefinitionInput").value.trim().split("\n")
    for (let i=0; i < input.length; i += 1) 
        input[i] = input[i].trim()

    states = input[0].split()
    inputSymbols = input[1].split()
    stackSymbols = input[2].split()
    qi = input[3]
    Z = input[4]
    finalStates = input[5].split()

    // parse transitions
    transitions = []
    for (let i = 6; i < input.length; i += 1) 
        transitions.push(new Transition(input[i]))
})

document.getElementById("runBtn").addEventListener("click", () => {
    document.getElementById("saved").hidden = true
    document.getElementById("verdict").hidden = true
    window.scrollTo(0, 0);

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

// finds the transition that the machine can take, returning the transition if one is found, false otherwise
function takeTransition(input) {
    for (let i = 0; i < transitions.length; i += 1) {
        let t = transitions[i]
        if (t.oldState === curState && (t.pop === stack[0] || t.pop === "") && (t.read === input || t.read === "")) {
            // take transition
            curState = t.newState

            if (t.pop !== "")
                stack = stack.substring(1) // pop from stack
            stack = t.push + stack // push onto stack
            
            // update display
            document.getElementById("curState").textContent = curState
            document.getElementById("stack").textContent = stack

            return t
        }
    }

    return false
}

// returns whether a verdict has been given yet
function step() {
    // do nothing if string was already accepted/rejected
    let verdict = document.getElementById("verdict")
    if (verdict.hidden === false)
        return

    let symbols = document.getElementById("inputStr").children

    // find next input
    let doneReading = true
    let index
    for (let i = 0; i < symbols.length; i += 1) {
        if (symbols[i].getAttribute("class") == "selected") {
            index = i
            doneReading = false
        }
    }

    // take transition
    let trans = doneReading ? takeTransition("") : takeTransition(symbols[index].textContent)

    // no valid transition to take
    if (trans === false) {
        verdict.hidden = false

        if (doneReading && finalStates.includes(curState) && stack === "") {
            verdict.textContent = "ACCEPTED"
            verdict.setAttribute("class", "accepted")
        }
        else {
            verdict.textContent = "REJECTED"
            verdict.setAttribute("class", "rejected")
        }
        return true
    }

    // update input string display
    if (!doneReading && trans.read !== "") {
        symbols[index].setAttribute("class", "")

        if (index < symbols.length - 1) {
            symbols[index + 1].setAttribute("class", "selected")
        }
    }

    return false
}

document.getElementById("stepBtn").addEventListener("click", step)

document.getElementById("skipBtn").addEventListener("click", () => {
    let doneReading = !document.getElementById("verdict").hidden
    while (!doneReading) {
        doneReading = step()
    }
})