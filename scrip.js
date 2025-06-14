const buttonValues = [
    "AC", "+/-", "%", "÷", 
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
];
const rightSymbols = ["÷", "×", "-", "+", "="];
const topSymbols = ["AC", "+/-", "%"];

const display = document.getElementById("display");

//Declare vairables to start
let a = 0;
let operator = null;
let b = null;

function clearAll() {
    a=null;
    operator = null;
    b = null;
}


// Loop through each value in the lis
// I = index
for (let i=0; i<buttonValues.length; i++) {
    let value = buttonValues[i];
    let button = document.createElement("button");
    button.innerText = value;

    //check is the button is 0 to span it over 2 buttions to make the spacing better
    if(value == "0") {
        button.style.width = "200px"
        button.style.gridColumn = "span 2";
    }

    //Checking if for right and top buttons as they are differnt colors
    if(rightSymbols.includes(value)) {
        button.style.backgroundColor = "orange";
    }
    else if (topSymbols.includes(value)) {
        button.style.backgroundColor = "lightgrey";
    }

    button.addEventListener("click", function() {
        if(rightSymbols.includes(value)) {
            if (value == "="){
                
                if (a != null) {

                
                    b = display.value;

                    let numA = Number(a);
                    let numB = Number(b);

                    if (operator == "÷") {
                            display.value = numA/numB;
                    }
                    else if (operator == "×") {
                            display.value = numA*numB;
                    }
                    else if (operator == "-") {
                            display.value = numA-numB;
                    }
                    else if (operator == "+") {
                            display.value = numA+numB;
                    }

                    clearAll();

                }
                
            }
            else {
                a = display.value
                operator = value;

                display.value = ""; // Clears the display

            }
        }
        else if (topSymbols.includes(value)) { //Check for top symbols
            if(value == "AC"){  //If user selects AC
                clearAll(); //Call function to clear the vairables
                display.value = ""; // Clears the display
            }
            else if (value == "+/-") { //If user selects +/-
                if (display.value != "" && display.value != "0") {
                    if (display.value[0] == "-") {
                        display.value = display.value.slice(1);
                    }
                    else {
                        display.value = "-" + display.value;
                    }
                }
            }
            else if (value == "%") {
                display.value = display.value/100;

            }
        }
        else { // else all the other items like numbers and decimal place
            if(value == "."){ // if the value is . it cannot go at the start
                //and it cant be in the string twice
                if(!display.value.includes(value) && display.value != "") {
                    display.value += value;
                }
            }
            else if (display.value == "0"){ //if user selects 0 and there check
                // if another number has been placed infront
                display.value = value; 
            }
            else {
                display.value += value;
            }
        }

    })

    //add button to calculator
    document.getElementById("buttons").appendChild(button);

}