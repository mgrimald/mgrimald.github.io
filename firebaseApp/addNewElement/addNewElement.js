var config = {
  apiKey: "AIzaSyCYITqcsz_WGOU9v8EqW7-ochsMJ4hp4vI",
  authDomain: "crud-app-tutorial.firebaseapp.com",
  databaseURL: "https://crud-app-tutorial.firebaseio.com",
  projectId: "crud-app-tutorial",
  storageBucket: "crud-app-tutorial.appspot.com",
  messagingSenderId: "121345780044"
};

firebase.initializeApp(config);
console.log("firebase initialized");

// Save a new recommendation to the database, using the input in the form
const addData = function () {
  const client = $("#clientName").val();
  const phone = $("#clientPhone").val();
  const email = $("#clientEmail").val();
  const occupants = $("#occupants").val();
  const optionanimal = $("#optionanimal").val();
  const start = $("#start").val();
  const end = $("#end").val();
  const price = $("#price").val();


  const payment_method = $("#payment_method").val();
  const duration_in_seconds = $("#duration_in_seconds").val();
  const pick_up_time = $("#pick_up_time").val();

  const newData = {
    createdTime: firebase.database.ServerValue.TIMESTAMP,
    driver: null,
    client:{
        name: (client ? client : "nom par default"),
        phone: (phone  ? phone : "0123456789"),
        email: (email  ? email : "client@email.com"),
    },
    price: (price ? price : 55),
    occupants: (occupants ? occupants : 1),
    optionanimal: (optionanimal ? optionanimal : false),
    payment_method: (payment_method ? payment_method : "liquid"),
    coordonate_start:{
        text: (start ? start : "addresse de départ non spécifiée"),
        longitude: 50.34321,
        latitude: -1.42
    },
    coordonate_end:{
        text: (end ? end : "addresse d'arrivée non spécifiée"),
        longitude: 51,
        latitude: 12.11111111
    },
    duration_in_seconds: (duration_in_seconds ? duration_in_seconds : 60 * 60 * 12),
    pick_up_time: (pick_up_time ? pick_up_time : "12:39"),
    createdByApi: true,
  };

  firebase.database().ref("reservation/searching/").push(newData, x=>{console.log(x); if (!x) alert("sucess")});
  console.log("data sent: ", newData);
  
  // $('#payload').val("");//reset to empty

  return false;//to add if you don't want the page to reload
};




//don't forget
$(window).on('load', function () {
  $("#dataForm").submit(addData);
});