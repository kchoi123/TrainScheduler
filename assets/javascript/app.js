// Firebsae
var config = {
    apiKey: "AIzaSyB4YlEfsY277auMDWYMMeVOkR8s4tjzBmw",
    authDomain: "train-e04ae.firebaseapp.com",
    databaseURL: "https://train-e04ae.firebaseio.com",
    projectId: "train-e04ae",
    storageBucket: "train-e04ae.appspot.com",
    messagingSenderId: "754734947721"
};
firebase.initializeApp(config);

// Calling Firebase
var database = firebase.database();

// On click for submit button
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
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

// Create Firebase event for adding newTrain to the database and a row in the html when a user adds an entry
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

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var min = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + min);

    // Next Train
    var next = moment().add(min, "minutes");
    console.log("ARRIVAL TIME: " + moment(next).format("hh:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(des),
        $("<td>").text(freq),
        $("<td>").text(moment(next).format("hh:mm a")),
        $("<td>").text(min)
    );

    // Append the new row to the table
    $("#newTable").append(newRow);
});