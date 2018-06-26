/*
** Train Schedule App
** Application for Homework Week 7
** Joseph Ragno, Jose De Las Salas, Raul and Joed Machado. 2018 UM Coding Boot Camp.
*/

//some global variables
addButtonId = ''; //The ID name for the button designated to add train schedule
bodyTableId =''; //The ID of the table body where the train schedule is shown
//formId =''; //The ID of the form used to collect the information about the train schedule
trainNameInput = ''; //ID of the input text to collect the train name
trainDestinationInput = ''; // id of the destination input text
trainFirstTimeInput = ''; // id of the first time input
trainFrequencyInput = ''; // id of the frequency input

//It will start when the document will finish to load
$(document).ready( function() {

    // Initialize Firebase
    var databaseName = "trainsystemhw"; 

    var config = {
        apiKey: "AIzaSyBdoJiMy_PFktLmrveH0A2nbbj8wtvur_o", 
        authDomain: databaseName + ".firebaseapp.com",
        databaseURL: "https://" + databaseName + ".firebaseio.com",
        projectId: databaseName,
        storageBucket: "",
        messagingSenderId: "695028065097" 
    };

    firebase.initializeApp(config);

    //Reference to the train schedule database
    var fbTrainSchedule = firebase.database();
    console.log( fbTrainSchedule );

    //Registering onclick event for adding train
    $( addButtonId ).click( addTrain );

    //Function for adding a train to the database
    function addTrain( event ) {
        event.preventDefault();
    
        var trainName = $( trainNameInput ).val().trim();
        var trainDestination = $( trainDestinationInput ).val().trim();
        var trainFirstTime = moment( $( trainFirstTimeInput ).val().trim(), 'MM/DD/YYYY' );
        var trainFrequency = $( trainFrequencyInput ).val().trim();
    
        fbTrainSchedule.ref().push( {
            name: trainName,
            destination: trainDestination,
            first: trainFirstTime,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        } );
    
        clearInputs();
    }

    //clear all the text inputs of the form
    function clearInputs() {
        $( trainNameInput ).val('');
        $( trainDestinationInput ).val('');
        $( trainFirstTimeInput ).val('');
        $( trainFrequencyInput ).val('');
    }

    //Its triggers when a new child (element) to the database is added
    fbEmployees.ref().on( "child_added", function( snapshot ) {
        //get values from snapshot
        var name = snapshot.val().name;
        var dest = snapshot.val().destination;
        var first = snapshot.val().first;
        var freq = snapshot.val().frequency;
        //calculated values
        var nextArr;
        var minAway;

        //add data to the table
        var row = $('<tr>').appendTo( $( bodyTableId ) );
        $('<td>').text( name ).appendTo( row );
        $('<td>').text( dest ).appendTo( row );
        $('<td>').text( freq ).appendTo( row );
        $('<td>').text( nextArr ).appendTo( row );
        $('<td>').text( minAway ).appendTo( row );

    } );

} );
 