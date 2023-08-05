class State {
    constructor(name, canRead, transitions) {
        this.name = name
        this.canRead = canRead
        this.transitions = transitions
    }
}

$(document).ready(function() {
    // Initialize information about the DPDA
    var input_string = ""
    var states = new Array()
    var strim_symbs = new Array()
    var stack_symbs = new Array()
    var final_states = new Array()
    var start_state = ""
    var init_stack_symb = ""


    // Add event listeners to buttons
    $("#submitMachineDefinition").on("click", () => {
        // Parse information from machine definition into it's variables
        input_string = $("#input-str").val()
        const machine_def = $("#machineDefinitionInput").val()
        let temp = machine_def.split(/\r?\n/)
        console.log(temp);
    })

    $("#step-btn").on("click", () => {


    })
})