// Machine Components
let states = []
let inputSymbols = []
let stackSymbols = []
let qi = ""
let Z = "Z"
let F = []
let transitions = []

let stack = []

// Object constructor that parses the string a user entered defining a transition into a JS object
function Transition(str) {
    const trans = str.split(" ")

    this.oldState = trans[0]
    this.read = trans[1]
    this.pop = trans[2]
    this.newState = trans[3]
    this.push = trans[4]
}

document.getElementById("enterBtn").addEventListener("click", () => {
    let input = document.getElementById("machineDefinitionInput").value.trim().split("\n")
    for (let i=0; i < input.length; i += 1) 
        input[i] = input[i].trim()

    states = input[0].split()
    inputSymbols = input[1].split()
    stackSymbols = input[2].split()
    qi = input[3]
    Z = input[4]
    F = input[5]

    // parse transitions
    for (let i = 6; i < input.length; i += 1) {
        transitions.push(new Transition(input[i]))
    }
})

document.getElementById("runBtn").addEventListener("click", () => {
    let userInput = document.getElementById("userInput").value
    console.log(userInput)
    if (!userInput) {
        window.alert("Enter an input string")
        return
    }
        
    document.getElementById("simulationContainer").hidden = false
    document.getElementById("curState").textContent = qi

    // create hmtl element for every input symbol
    let cont = document.getElementById("inputStr")
    for (let i = 0; i < userInput.length; i += 1) {
        let elem = document.createElement("span")
        elem.textContent = userInput[i]
        cont.appendChild(elem)
    }
})