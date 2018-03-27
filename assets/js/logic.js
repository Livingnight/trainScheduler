// Initialize Firebase
var config = {
    apiKey: "AIzaSyDSC3-pUc9zrbanzxGxrV0AsVFs06Y9igM",
    authDomain: "train-schedule-32258.firebaseapp.com",
    databaseURL: "https://train-schedule-32258.firebaseio.com",
    projectId: "train-schedule-32258",
    storageBucket: "",
    messagingSenderId: "865577324467"
};
firebase.initializeApp(config);

var data = firebase.database();
var train = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
//click event listener for submitting new data to database
$("#submit").on("click", function(event){
    //prevent page from reloading on submit
    event.preventDefault();
    //setting values of input boxes to variables
    train = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTime").val().trim();
    frequency = $("#Frequency").val().trim();
    //pushing new data to the website in a new child
    data.ref().push({
       train: train,
       dest: destination,
       firstTrain: firstTrain,
       frequency: frequency,
       timeAdded: moment().unix()
    });
    //logging the items to be pushed
    console.log("logging the push items");
    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log("--------------")

});
//database event listener looking for new children objects added to the database
data.ref().on("child_added", function(snapshot){
    //making the table body for the data to be added to
    var tableBody = $("#t-body");
    //making the row for the data to go inside
    var tableRow = $("<tr>");

    console.log("logging itmes from the database");
    console.log(snapshot.val().train);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().timeAdded);
    console.log("----------------------");

    tableRow.append("<th>" + snapshot.val().train + "</th>" +
        "<th>" + snapshot.val().dest + "</th>" +
        "<th>" + snapshot.val().frequency + " minutes" + "</th>");
    tableBody.append(tableRow);


});