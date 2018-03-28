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
       frequency: frequency
    });
    //logging the items to be pushed
    console.log("logging the push items");
    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log("--------------")
    $("#trainName").val('');
    $("#destination").val('');
    $("#firstTime").val('');
    $("#Frequency").val('');

});
//database event listener looking for new children objects added to the database
data.ref().on("child_added", function(snapshot){
    //making the table body for the data to be added to
    console.log(minutes);

    var tableBody = $("#t-body");
    //making the row for the data to go inside
    var tableRow = $("<tr>");

    console.log("logging items from the database");
    console.log(snapshot.val().train);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    // console.log(snapshot.val().curTime);
    console.log("----------------------");

    //get the current time when the page is loaded,
    //subtract the current time by the first train time then % by frequency to get how long until next train.
    //add time until next train to the current time to show when the time the next train will arrive.
    //take into account that after 60 minutes the hour starts again from 0
    //append the value for the time and then the number of minutes until the next train.
    var timeStamp = moment(snapshot.val().firstTrain, "h:mm");

    console.log(timeStamp.toString());
    var minutes = moment().diff(timeStamp, 'minutes') ;
    console.log("this is the difference in minutes: " + minutes);
    // if(minutes % snapshot.val().frequency === 0){
    //     var minsAway = snapshot.val().frequency
    // }else{
    //     minsAway = minutes % snapshot.val().frequency;
    //
    // }
    var tRemainder = minutes % snapshot.val().frequency;
    var minsAway = snapshot.val().frequency - tRemainder;
    console.log("this is the minutes away");
    console.log(minsAway);

    var nextTrain = moment().add(minsAway, "minutes");
    var nextTime = moment(nextTrain, "h:mm").format("h:mm").toString();
    console.log("this is the next train time: " + nextTime);

    tableRow.append("<td>" + snapshot.val().train + "</td>" +
        "<td>" + snapshot.val().dest + "</td>" +
        "<td>" + snapshot.val().frequency + "</td>" +
        "<td>" + nextTime + "</td>" +
        "<td>" + minsAway + "</td>");
    tableBody.append(tableRow);


});