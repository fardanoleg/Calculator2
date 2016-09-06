/**
 * Created by OF on 8/31/16.
 */
var input_array = [""];
var input_position = 0;
var button_text = null;
var operator_text = null;
var dot_text = null;
var output = "";
var check_for_number = true;
var oper_array = ["-", "+", "/", "*"];
var current_string = null;
var equal_press_count = 0;
var first_operator = null;
var first_second_number = null;

$(document).ready(function () {

    $(".calculator_dot").click(function () {
        press_dot(this)
    });
    $(".calculator_numbers").click(function () {
        press_number(this);
    });

    $(".calculator_operator").click(function () {
        press_operator(this)
    });
    $(".calculator_reset").click(function () {
        press_clear();
    });
    $(".calculator_equal").click(function () {
        press_equal(this);
    });
    $(".calculator_back").click(function () {
        press_back();
    })


});
function show_display() {
    $("#display").text(input_array[input_position]);
}

function check_operator_input_array() {
    console.log("check operator function is running");
    if (!isNaN(parseInt(input_array[0])) && ((input_array[1] == "+") || (input_array[1] == "-") || (input_array[1] == "/") || (input_array[1] == "*")) && !isNaN(parseInt(input_array[2]))) {
        console.log("", input_array[2]);
        show_display();
        do_math();
    } else {
        return
    }
}

function check_dot_input_array() {
    current_string = input_array[input_position];
    console.log("check for current string: ", current_string);
    for (var i = 0; i < current_string.length; i++) {
        console.log(" the items are: ", current_string[i]);
        if (String(current_string[i]) == ".") {
            console.log("you have a dot already");
            return true
        } else {
            console.log("you don't have any dots");
        }
    }
    return false
}

function press_dot(dot) {
    dot_text = $(dot).text();
    console.log("you clicked DOT: ", dot_text);
    check_dot_input_array();
    var result = check_dot_input_array();
    if (result == false) {
        input_array[input_position] += dot_text;
        console.log(input_array[input_position]);
        console.log(input_array)
    } else {
        console.log("you have DOT!!!!");
        console.log(input_array);
    }
    show_display();
}

function press_number(num) {
    button_text = $(num).text();                        //assign the button to the right number
    console.log("you clicked number: ", button_text);
    input_array[input_position] += button_text;           //store the value to the string
    console.log(input_array);
    console.log(input_array[input_position]);
    show_display()
}


function press_operator(oper) {                                        //when you pres -,=,*,/
    operator_text = $(oper).text();                           //assign the button to the right number
    console.log("you clicked operator ", operator_text);

    check_operator_input_array();
    if (!isNaN(parseInt(input_array[input_position]))) {
        console.log("the one before is a number");
        console.log(input_array[input_position]);
        input_position++;
        input_array[input_position] = [""];
        input_array[input_position] += operator_text;
        input_position++;
        input_array[input_position] = "";            //assign the next string to be empty
        console.log(input_array);
    } else {
        console.log("the one before is an operator");
        console.log("Array ", input_array);
        console.log("Position: ", input_position);
        input_position--;
        input_array[input_position] = [""];
        input_array[input_position] += operator_text;
        input_position++;
        console.log("value at index  : ", input_array);
    }
    show_display();
}

function do_math(num1, num2, oper) {
    console.log("do_math is running");
    var num1 = parseFloat(input_array[0]);
    var num2 = parseFloat(input_array[2]);
    console.log(num1, num2);
    var oper = input_array[1];
    first_second_number = num2;
    first_operator = oper;
    switch (oper) {
        case "+" :
            output = num1 + num2;
            break;
        case "-":
            output = num1 - num2;
            break;
        case "*":
            output = num1 * num2;
            break;
        case "/":
            if (num2 == 0) {
                console.log(" ERROR: ");
                output = "ERROR"

            } else {
                output = num1 / num2;
            }
    }
    input_array = [""];
    input_position = 0;
    input_array[input_position] += output;
    console.log(input_array);
    show_display();
}

function do_math2(num1, oper) {
    console.log("do_math2 is running");
    var num1 = parseFloat(input_array[0]);
    var oper = input_array[1];
    console.log(num1, oper);
    switch (oper) {
        case "+" :
            output = num1 + num1;
            break;
        case "-":
            output = num1 - num1;
            break;
        case "*":
            output = num1 * num1;
            break;
        case "/":
            output = Math.sqrt(num1);
            console.log(output);
            break;
    }
    input_array = [""];
    input_position = 0;
    input_array[input_position] += output;
    console.log(input_array);
    show_display();
}
function do_math3(num1, num2, oper) {
    console.log("do_math3 is running");
    var num1 = parseFloat(input_array[0]);
    var num2 = parseFloat(first_second_number);
    var oper = first_operator;
    console.log(num1, num2, oper);
    switch (oper) {
        case "+" :
            output = num1 + num2;
            break;
        case "-":
            output = num1 - num2;
            break;
        case "*":
            output = num1 * num2;
            break;
        case "/":
            if (num2 == 0) {
                $("#display").text("Error");
                output = ["Error"];
            } else {
                output = num1 / num2;
            }
    }
    input_array = [""];
    input_position = 0;
    input_array[input_position] += output;
    console.log(input_array);
    show_display();
}

function press_clear() {                                     //reset everything
    console.log("you clicked reset");
    $("#display").text("");
    input_array = [""];
    input_position = 0;
    console.log(input_array);

}
function press_back() {

}

function press_equal(equal) {
    console.log("you pressed equal");
    if (input_array[0] == "") {
        input_array = [""];
        input_position = 0;
        equal_press_count++;
        if (equal_press_count == 4) {
            console.log("you pressed = 4 times");
            $("#display").text("Ready");
        }
    }
    else if (input_array[1] == undefined) {
        console.log("DO_MATH3 started: ");
        do_math3();
    }
    else if (input_array[2] == "") {
        console.log("DO_MATH2 started: ");
        do_math2();
    } else {
        console.log("DO_MATH started: ");
        do_math();
    }
}





