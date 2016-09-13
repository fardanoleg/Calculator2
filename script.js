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
var audio = ["beep-01a.mp3", "beep-02.mp3", "beep-03.mp3", "beep-04.mp3", "beep-05.mp3", "beep-06.mp3", "beep-07.mp3"];
var songArray = [];
var typeOfSong = "michael"

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
function listenAjax() {
    console.log("now it will play the music");

    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: typeOfSong,
            type: 'track'
        },

        success: function (response) {
            //LFZ START
            console.log('spotify', response);  // to see if the success running and response

            for (i = 0; i < response.tracks.items.length; i++) {    // (loop) will go through the object find the tracks inside item and will go through all the items

                var tracks = response.tracks.items[i];  // declare and assign the track inside each items to a variable

                var song = {                       // declare and assign the song object audio wit hthe path to the song
                    audio: tracks.preview_url
                };
                songArray.push(song);     //will store the song to the array
                console.log(songArray);   //to see the result the songArray
            }
            //LFZ END
            var song = new Audio();
            song.src = songArray[0].audio;
            song.play();

        }

    });
}


function check_array() {      //function for multifunctional calculator to check if the *,/ operator press(will run first), if +,- press (will run second)
    console.log("checking  the array is running:");
    for (var i = 0; i < input_array.length; i++) {
        console.log("THE length for *,/ is: ", input_array.length);
        if (input_array[i] == "*") {
            console.log("Found *,/ will run it");
            do_math(input_array[i]);
        } else if (input_array[i] == "/") {
            do_math(input_array[i]);
        }
        console.log(input_array);
    }
    //LFZ START
    for (var i = 0; i < input_array.length; i++) {      //will go through the array (where everything stored) and will check if the array have an items '+' or '-'
        console.log(" The length for +,-  is:", input_array.length);  //to see on my console that it is running
        if (input_array[i] == "-") {     //condition to check if the item  "-" was found in the array
            console.log("Found -,+ will run it");  //to see on my console that it found '-' in the array
            do_math(input_array[i]);  // found the item, will run the function with the param that was found
        } else if (input_array[i] == "+") {  // condition to check if the item "+" was found in the array
            do_math(input_array[i]); // found the item, will run the function with the param that was found
        }
        console.log(input_array);
    }
    input_position = 0; //assign index position to 0
    show_display(); // run the function to show everything on the display
    //LFZ END
}
function do_math(a) {
    var oper_index = input_array.indexOf(a);         //index of the operator
    console.log(oper_index);
    // var oper = input_array[oper_index];                               //the value on the oper
    var num1 = parseFloat(input_array[oper_index - 1]);                              //the value of num1
    var num2 = parseFloat(input_array[oper_index + 1]);                            //the value of num2
    var num1_index = oper_index - 1;                              //index of num1
    // var num2_index = oper_index + 1;                              //index of num2
    switch (a) {
        case "*":
            var output = num1 * num2;
            break;
        case "/":
            var output = num1 / num2;
            break;
        case "-":
            var output = num1 - num2;
            break;
        case "+":
            var output = num1 + num2;
            break;
    }
    num1 = output;
    input_array.splice(num1_index, 3, String(num1));
    check_array();
    console.log(input_array);
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
    //LFZ START  //
    if (!isNaN(parseFloat(input_array[input_position]))) {     // checks if the item before is a number
        console.log("the one before is a number"); //to see on the console that the condition is true and running
        console.log(input_array[input_position]);  // to see what is the number
        input_position++;  //index position increased (shifted forward by 1) and assign the input_position by this number
        input_array[input_position] = [""]; //to make a "space" (assign the position with an empty array and keep empty string inside (for undefined))
        input_array[input_position] += operator_text;  // assign the space with the operator
        input_position++;   // increase the index position by one and assign the input_position by that number
        input_array[input_position] = "";                      //assign thespace to be empty and make make empty string (for undefined)
        console.log(input_array);  //to see the array (result)

    } else {                                                   //the item before is not a number (to prevent situation like this +++++---**** etc)
        console.log("the one before is an operator");  //   // to see that the condition is  running( the condition when u press more than one operator
        console.log("Array ", input_array);   //to see array
        console.log("Position: ", input_position);  //to see the index position
        input_position--;  //decrease index position and assign input_position to that number
        input_array[input_position] = [""]; // make that "space" an empty array  with empty string inside ( to prevent undefined)
        input_array[input_position] += operator_text; //assign the space with the oper you pressed
        input_position++; //increase index position by 1 and assign it with the same value
        console.log("value at index  : ", input_array[input_position]); //to see the result the operator
        console.log("array  : ", input_array); //to see the array
    }
    //LFZ END
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

// function press_back() {
//     console.log("you clicked back button");
//     console.log(input_array);
//     input_array.pop();
//
//     console.log(input_array);
//     console.log(input_array);
//     show_display();
// }


