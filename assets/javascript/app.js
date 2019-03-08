// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// firebsae
var config = {
    apiKey: "AIzaSyB4YlEfsY277auMDWYMMeVOkR8s4tjzBmw",
    authDomain: "train-e04ae.firebaseapp.com",
    databaseURL: "https://train-e04ae.firebaseio.com",
    projectId: "train-e04ae",
    storageBucket: "train-e04ae.appspot.com",
    messagingSenderId: "754734947721"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    // Uploads New Train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

// 3. Create Firebase event for adding newTrain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    // Store everything into a variable.
    var name = snapshot.val().trainName;
    var des = snapshot.val().destination;
    var first = snapshot.val().firstTrain;
    var freq = snapshot.val().frequency;

    // newTrain Info
    console.log(name);
    console.log(des);
    console.log(first);
    console.log(freq);

    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(des),
        $("<td>").text(first),
        $("<td>").text(freq)
    );

    // Append the new row to the table
    $("#newTable").append(newRow);
});