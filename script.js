/**
 * Created by OF on 8/31/16.
 */
var input_array = [""];
var input_position = 0;
var button_text = null;
var operator_text = null;
var dot_text = null;
var current_string = null;
var baseUrl = "http://www.soundjay.com/button/";
var audio = ["beep-01a.mp3", "beep-02.mp3", "beep-03.mp3", "beep-04.mp3", "beep-05.mp3", "beep-06.mp3", "beep-07.mp3" ];


$(document).ready(function () {

    $(".calculator_dot").click(function () {
        press_dot(this);
        // sound_dot();
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
function sound_oper(clicked) {
    var bleep = new Audio();
    bleep.src = baseUrl + audio[i - 1];
    bleep.play();
    console.log("SUCCESS");
    var i = $(clicked).attr('id').substring(1);   //
    console.log(i);
    new Audio(baseUrl + audio[i - 1]).play();
}
function sound(clicked) {
    console.log("SUCCESS");
    var bleep = new Audio();                 // create element audio
    bleep.src = "sound/" + clicked;            //set attribute source
    bleep.play();                                //play
}

// ADD music using Ajax
// function Listen () {
//     console.log("now it will paly the music);
//     $.ajax({
//         url: 'https://api.spotify.com/v1/search',
//         data: {
//             q: typeOfSong,
//             type: 'track'
//         },
//
//         success: function (response) {
//             console.log('spotify', response);
//
//             for (i = 0; i < response.tracks.items.length; i++) {
//
//                 var tracks = response.tracks.items[i];
//
//                 var song = {
//                     audio: tracks.preview_url
//                 };
//                 songArray.push(song);
//                 console.log(songArray[0]);
//             }
//             $('#audio').attr('src, ""');
//             $('#audio').attr('src', songArray[0].audio);
//             playPause();
//         }
//
//     });
// }


function check_array() {
    console.log("checking  the array is running:");
    for (var i = 0; i < input_array.length; i++) {
        console.log("THE length for *,/ is: ", input_array.length);
        if (input_array[i] == "*") {
            console.log("Found *,/ will run it");
            do_math();
        } else if (input_array[i] == "/") {
            do_math2();
        }
        console.log(input_array);
    }
    for (var i = 0; i < input_array.length; i++) {
        console.log(" The length for +,-  is:", input_array.length);
        if (input_array[i] == "-") {
            console.log("Found -,+ will run it");
            do_math3();
        } else if (input_array[i] == "+") {
            do_math4();
        }
        console.log(input_array);
    }
    input_position = 0;
    show_display();
}

function do_math() {
    console.log("do math is running");
    var oper_index = input_array.indexOf("*");                     //index of the operator
    var oper = input_array[oper_index];                               //the value on the oper
    var num1 = parseFloat(input_array[oper_index - 1]);                              //the value of num1
    var num2 = parseFloat(input_array[oper_index + 1]);                            //the value of num2
    var num1_index = oper_index - 1;                              //index of num1
    var num2_index = oper_index + 1;                              //index of num2
    console.log("operator index: ", oper_index);
    console.log("operator : ", oper);
    console.log("the number before index: ", num1);
    console.log("the number after index: ", num2);
    console.log("the index of num1: ", num1_index);
    console.log("the index of num2: ", num2_index);
    var output = null;
    switch (oper) {
        case "*":
            output = num1 * num2;
            break;
    }
    console.log(output);
    num1 = output;
    console.log(num1_index);
    input_array.splice(num1_index, 3, String(num1));
    check_array();
    console.log("new_array: ", input_array);
}

function do_math2() {
    console.log("do math2 is running");
    var oper_index = input_array.indexOf("/");                     //index of the operator
    var oper = input_array[oper_index];                            //the value on the oper
    var num1 = parseFloat(input_array[oper_index - 1]);                              //the value of num1
    var num2 = parseFloat(input_array[oper_index + 1]);                    //the value of num2
    var num1_index = oper_index - 1;                              //index of num1
    var num2_index = oper_index + 1;                              //index of num2
    console.log("operator index: ", oper_index);
    console.log("operator : ", oper);
    console.log("the number before index: ", num1);
    console.log("the number after index: ", num2);
    console.log("the index of num1: ", num1_index);
    console.log("the index of num2: ", num2_index);
    var output = null;
    switch (oper) {
        case "/":
            output = num1 / num2;
            break;
    }
    console.log(output);
    num1 = output;
    console.log(num1_index);
    input_array.splice(num1_index, 3, String(num1));
    check_array();
    console.log("new_array: ", input_array);
}

function do_math3() {
    console.log("do math is running");
    var oper_index = input_array.indexOf("-");                     //index of the operator
    var oper = input_array[oper_index];                            //the value on the oper
    var num1 = parseFloat(input_array[oper_index - 1]);                              //the value of num1
    var num2 = parseFloat(input_array[oper_index + 1]);                     //the value of num2
    var num1_index = oper_index - 1;                              //index of num1
    var num2_index = oper_index + 1;                              //index of num2
    console.log("operator index: ", oper_index);
    console.log("operator : ", oper);
    console.log("the number before index: ", num1);
    console.log("the number after index: ", num2);
    console.log("the index of num1: ", num1_index);
    console.log("the index of num2: ", num2_index);
    var output = num1 - num2;
    console.log(output);
    num1 = output;
    console.log(num1_index);
    input_array.splice(num1_index, 3, String(num1));
    check_array();
    console.log("new_array: ", input_array);
}

function do_math4() {
    console.log("do math is running");
    var oper_index = input_array.indexOf("+");                     //index of the operator
    var oper = input_array[oper_index];                            //the value on the oper
    var num1 = parseFloat(input_array[oper_index - 1]);                              //the value of num1
    var num2 = parseFloat(input_array[oper_index + 1]);                      //the value of num2
    var num1_index = oper_index - 1;                              //index of num1
    var num2_index = oper_index + 1;                              //index of num2
    console.log("operator index: ", oper_index);
    console.log("operator : ", oper);
    console.log("the number before index: ", num1);
    console.log("the number after index: ", num2);
    console.log("the index of num1: ", num1_index);
    console.log("the index of num2: ", num2_index);
    var output = num1 + num2;
    console.log(output);
    num1 = output;
    console.log(num1_index);
    input_array.splice(num1_index, 3, String(num1));
    check_array();
    console.log("new_array: ", input_array);
}

function check_dot_input_array() {                                //checks if the string has decimal already if true return true
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
    show_display();
    return false
}

function press_dot(dot) {                                         // checks if the string has decimal already using flag true, if it doesnt has decimal add one
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

function press_number(num) {                                     //  function when u press any number
    button_text = $(num).text();                                  //assign the button to the right number
    console.log("you clicked number: ", button_text);
    if (parseInt(input_array[input_position]) === 0 || input_array[input_position] == "ERROR") {  //set everything to 0
        input_array[input_position] = 0;
        input_array = [""];
    }
    input_array[input_position] += button_text;                  //store the value to the string
    console.log(input_array);
    console.log(input_array[input_position]);
    show_display()
}

function press_operator(oper) {                                        //when you pres -,=,*,/
    operator_text = $(oper).text();                             //assign the button to the right number
    console.log("you clicked operator ", operator_text);

    if (!isNaN(parseFloat(input_array[input_position]))) {     // checks if the item before is a number
        console.log("the one before is a number");
        console.log(input_array[input_position]);
        input_position++;
        input_array[input_position] = [""];
        input_array[input_position] += operator_text;
        input_position++;
        input_array[input_position] = "";                      //assign the next string to be empty
        console.log(input_array);

    } else {                                                   //the item before is not a number to prevent situation like this +++++---**** etc...
        console.log("the one before is an operator");
        console.log("Array ", input_array);
        console.log("Position: ", input_position);
        input_position--;
        input_array[input_position] = [""];
        input_array[input_position] += operator_text;
        input_position++;
        console.log("value at index  : ", input_array[input_position]);
        console.log("array  : ", input_array);
    }
    $("#dispaly").text(input_array);

}

function press_clear() {                                     //reset everything
    console.log("you clicked reset");
    $("#display").text("");
    input_array = [""];
    input_position = 0;
    console.log(input_array);

}

function press_equal(equal) {                  // situation when u press equal
    console.log("you pressed equal");
    check_array();
}

function press_back() {
    console.log("you clicked back button");
    input_array.pop();
    input_position--;
    console.log(input_array);
    show_display();
}


