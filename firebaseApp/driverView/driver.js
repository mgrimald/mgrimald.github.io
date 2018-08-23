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

const dataTableSearching = firebase.database().ref("reservation/searching/");

const convertTime = function (str) {
    var dateVal = str;
    var date = new Date( parseFloat( dateVal));
    return (
        date.getDate() + "/" +
        (date.getMonth() + 1) + "/" +
        date.getFullYear() + " " +
        date.getHours() + ":" +
        date.getMinutes() + ":" +
        date.getSeconds()
    );
}

/*
  {
    createdTime: firebase.database.ServerValue.TIMESTAMP,
    driver: null,
    client:{
        name: (client ? client : "nom par default"),
        phone: (phone  ? phone : "0123456789"),
        email: (email  ? email : "client@email.com"),
    },
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
  }
*/

const formatDataTableForAvailable = function(data, dataKey){
    const createdTime = convertTime(data.createdTime);
    const pick_up_time = data.pick_up_time;
    const name = data.client.name;
    const phone = data.client.phone;
    const price = data.price;
    const duration_in_minutes = data.duration_in_seconds / 60;
    const start = data.coordonate_start.text;
    const end = data.coordonate_end.text;

    const hstr = `
    <tr id="dataKey_available_${dataKey}">
      <td>${pick_up_time}</td>
      <td>${name}</td>
      <td>${start}</td>
      <td>${end}</td>
      <td>${price}€</td>
      <td>${duration_in_minutes} minutes</td>
      <td>${createdTime}</td>
      <td>
        <button onclick="seeDetailsAvailable('${dataKey}');">voir détails</button>
      </td>
    </tr>
    `;
    return hstr;
}

const formatDataTableForDetailsAvailable = function(data, dataKey){
    const createdTime = convertTime(data.createdTime);
    const pick_up_time = data.pick_up_time;
    const name = data.client.name;
    const phone = data.client.phone;
    const price = data.price;
    const duration_in_minutes = data.duration_in_seconds / 60;
    const start = data.coordonate_start.text;
    const end = data.coordonate_end.text;

    const hstr = `
    <tbody>
    <tr id="dataKey_available_${dataKey}">
      <td>${pick_up_time}</td>
      <td>${name}</td>
      <td>${start}</td>
      <td>${end}</td>
      <td>${price}€</td>
      <td>${duration_in_minutes} minutes</td>
      <td>${createdTime}</td>
      <td>
        <button onclick="takeRide('${dataKey}');">take the ride</button>
      </td>
    </tr>
    </tbody>
    `;
    return hstr;
}

function seeDetailsAvailable(dataKey) {
  firebase.database().ref('reservation/searching/' + dataKey).once('value', function(dataSnapshot) {
    const dataKey = dataSnapshot.key;
    const data = dataSnapshot.val();
    $('#detailsAvailableTable > tbody').replaceWith(formatDataTableForDetailsAvailable(data, dataKey));
  });
}

const formatDataTableForTaken = function(data, dataKey){
    const createdTime = convertTime(data.createdTime);
    const pick_up_time = data.pick_up_time;
    const name = data.client.name;
    const phone = data.client.phone;
    const price = data.price;
    const duration_in_minutes = data.duration_in_seconds / 60;
    const start = data.coordonate_start.text;
    const end = data.coordonate_end.text;

    const hstr = `
    <tr id="dataKey_taken_${dataKey}">
      <td>${pick_up_time}</td>
      <td>${name}</td>
      <td>${start}</td>
      <td>${end}</td>
      <td>${price}€</td>
      <td>${duration_in_minutes} minutes</td>
      <td>${phone}</td>
      <td>${createdTime}</td>
      <td>
        <button onclick="seeDetailsTaken('${dataKey}');">see details</button>
      </td>
    </tr>
    `;

    return hstr;
}

function seeDetailsTaken(dataKey) {
  firebase.database().ref('reservation/accepted/' + firebase.auth().currentUser.uid + "/" + dataKey).once('value', function(dataSnapshot) {
    const dataKey = dataSnapshot.key;
    const data = dataSnapshot.val();
    $('#detailsTakenTable > tbody').replaceWith(formatDataTableForDetailsTaken(data, dataKey));
  });
}

const formatDataTableForDetailsTaken = function(data, dataKey){
    const createdTime = convertTime(data.createdTime);
    const pick_up_time = data.pick_up_time;
    const name = data.client.name;
    const phone = data.client.phone;
    const price = data.price;
    const duration_in_minutes = data.duration_in_seconds / 60;
    const start = data.coordonate_start.text;
    const end = data.coordonate_end.text;

    const hstr = `
    <tbody>
    <tr id="dataKey_details_taken_${dataKey}">
      <td>${pick_up_time}</td>
      <td>${name}</td>
      <td>${start}</td>
      <td>${end}</td>
      <td>${price}€</td>
      <td>${duration_in_minutes} minutes</td>
      <td>${phone}</td>
      <td>${createdTime}</td>
      <td>
        <button onclick="sendSms('${dataKey}');">open sms app</button>
      </td>
      <td>
        <button onclick="finishRide('${dataKey}');">course finie</button>
      </td>
    </tr>
    </tbody>
    `;
    return hstr;
}

const getAllDatasAndCheckForNewOne = function () {
  dataTableSearching.on('child_added', function(dataSnapshot) {
    const dataKey = dataSnapshot.key;
    const data = dataSnapshot.val();
    if (!data.driver)
        $('#availableTable > tbody:last-child').append(formatDataTableForAvailable(data, dataKey));
    else
        console.log("a driver has already taken this ride");
  });
  firebase.database().ref('reservation/accepted/' + firebase.auth().currentUser.uid).on('child_added', function(dataSnapshot) {
    const dataKey = dataSnapshot.key;
    const data = dataSnapshot.val();
    if (data.driver == firebase.auth().currentUser.uid)
        $('#takenTable > tbody:last-child').append(formatDataTableForTaken(data, dataKey));
  });
  /*firebase.database().ref('reservation/completed/' + firebase.auth().currentUser.uid).limitToLast(5).on('child_added', function(dataSnapshot) {
    // https://firebase.google.com/docs/reference/js/firebase.database.Query#limitToLast
    const dataKey = dataSnapshot.key;
    const data = dataSnapshot.val();
    if (data.driver == firebase.auth().currentUser.uid)
        $('#completedTable > tbody:last-child').append(formatDataTableForTaken(data, dataKey));
  });*/
}

const checkForDataUpdated = function () {
  dataTableSearching.on('child_changed', function(dataSnapshot) {
    dataKey = dataSnapshot.key;
    data = dataSnapshot.val();

    if (data.driver){
      console.log("this shouldn't happen");
        //remove bc a driver has taken the reservation
         $(`#dataKey_available_${dataKey}`).detach();
         $(`#dataKey_details_available_${dataKey}`).parent().detach();
    } else {
        //update bc some change in the data happened
        $(`#dataKey_available_${dataKey}`).replaceWith(formatDataTableForAvailable(data, dataKey));
        $(`#dataKey_details_available_${dataKey}`).parent().replaceWith(formatDataTableForDetailsAvailable(data, dataKey));
    }
  });
  firebase.database().ref('reservation/accepted/' + firebase.auth().currentUser.uid).on('child_changed', function(dataSnapshot) {
    dataKey = dataSnapshot.key;
    data = dataSnapshot.val();

    if (data.driver != firebase.auth().currentUser.uid){
        //remove bc a driver has taken the reservation
         $(`#dataKey_taken_${dataKey}`).detach();
         $(`#dataKey_details_taken_${dataKey}`).parent().remove();
    } else {
        //update bc some change in the data happened
        $(`#dataKey_taken_${dataKey}`).replaceWith(formatDataTableForTaken(data, dataKey));
        $(`#dataKey_details_taken_${dataKey}`).parent().replaceWith(formatDataTableForDetailsTaken(data, dataKey));
    }
    $(`#dataKey_taken_${dataKey}`).replaceWith(formatDataTableForTaken(data, dataKey));
  });
}

const checkForDataRemoved = function () {
  dataTableSearching.on('child_removed', function(dataSnapshot) {
    const dataKey = dataSnapshot.key;

    //remove from list
    $(`#dataKey_available_${dataKey}`).detach();
    $(`#dataKey_details_available_${dataKey}`).parent().detach();
  });
  firebase.database().ref('reservation/accepted/' + firebase.auth().currentUser.uid).on('child_removed', function(dataSnapshot) {
    console.log("data removed: ", dataSnapshot);
    const dataKey = dataSnapshot.key;

    //remove from list
    $(`#dataKey_taken_${dataKey}`).detach();
    $(`#dataKey_details_taken_${dataKey}`).parent().detach();
  });
}

function takeRide(dataKey){
    if (confirm(`Are you sure you want to accept the ride ?`)) {
        firebase.database()
        .ref('reservation/searching/' + dataKey + '/driver')
        .set(
            firebase.auth().currentUser.uid,
            function(error){
                if (error){
                    console.log("The reservation failed: ", error);
                    alert("The reservation failed");
                }
                else {
                    console.log("the reservation seems successfull");
                }
            }
        );
    }
}

function finishRide(dataKey){
    if (confirm(`Are you sure you want to archive this ride ?`)) {
      firebase.database()
      .ref('reservation/accepted/' + firebase.auth().currentUser.uid + "/" + dataKey +"/finishedTime")
      .set(firebase.database.ServerValue.TIMESTAMP);
    }
}

function sendSms(dataKey){
  firebase.database().ref('reservation/accepted/' + firebase.auth().currentUser.uid + "/" + dataKey).once('value', function(dataSnapshot) {
    const dataKey = dataSnapshot.key;
    const data = dataSnapshot.val();
    const phone = data.client.phone;
    alert("in a smartphone, it would open the sms app with the phone number ready filled: " + phone);
    console.log("phone:", phone);
  });
}

function toggleSignIn(connectWithRedirect = true) {
  //if user is not yet know
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    //provider.addScope("https://www.googleapis.com/auth/calendar");

    if (connectWithRedirect) {
      console.log("calling signIn by redirect method");
      firebase.auth().signInWithRedirect(provider);
    }
    else {
        alert("Pop up are usually blocked, plz click in the top right or top left of your browser to see the authentification page");
        firebase.auth().signInWithPopup(provider).then(function(result) {
          console.log("user successfully connected with pop up");
          //...
          $('#loggin').html(`Hello ${firebase.auth().currentUser.email || firebase.auth().currentUser.uid}, would you like to sign out ?`);
        });
    }
  } else {
    console.log("calling signOut");
    firebase.auth().signOut();
    $('#loggin').html(`SIGN IN RIGHT HERE`);
    alert("you can only see this page if you are signed in, plz sign in");
    document.location.reload();
  }
}

function handleIfUserIsSignedIn() {
  return (
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log("a");
        $('#loggin').html(`Hello ${firebase.auth().currentUser.email || firebase.auth().currentUser.uid}, would you like to sign out ?`)
      } else if (result.user || firebase.auth().currentUser){
        console.log("b");
        $('#loggin').html(`Hello ${firebase.auth().currentUser.email || firebase.auth().currentUser.uid}, would you like to sign out ?`)
      }
      else {
        console.log("user is not signed in")
        $('#loggin').html(`SIGN IN RIGHT HERE`);
        toggleSignIn();
        //user is not logged in
      }
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error("Sign in error: ", error);
      }
    })
  );
}

function switchViewAvailable() {
  $('#availableContent').toggleClass("in-visible");
  $('#availableButton').toggleClass("in-visible");
}

function switchViewTaken() {
  $('#takenContent').toggleClass("in-visible");
  $('#takenButton').toggleClass("in-visible");
}

function switchView() {
  console.log("switchView");
  switchViewTaken();
  switchViewAvailable();
}

const requestPermission = function() {
  console.log('Requesting permission...');
  firebase.messaging().requestPermission().then(function() {
    console.log('Notification permission granted.');
    saveToken();
  }).catch(function(err) {
    console.error('Unable to get permission to notify.', err);
  });
};

const saveToken = function() {
  firebase.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notificationTokens/' + currentToken).set(true);
    } else {
      requestPermission();
    }
  }).catch(function(err) {
    console.error('Unable to get messaging token.', err);
    if (err.code === 'messaging/permission-default') {
      window.fcmErrorContainer.innerText = 'You have not enabled notifications on this browser. To enable notifications reload the page and allow notifications using the permission dialog.';
    } else if (err.code === 'messaging/notifications-blocked') {
      window.fcmErrorContainer.innerHTML = 'You have blocked notifications on this browser. To enable notifications follow these instructions: <a href="https://support.google.com/chrome/answer/114662?visit_id=1-636150657126357237-2267048771&rd=1&co=GENIE.Platform%3DAndroid&oco=1">Android Chrome Instructions</a><a href="https://support.google.com/chrome/answer/6148059">Desktop Chrome Instructions</a>';
    }
  });
};

const eraseToken = function() {
  firebase.messaging().getToken().then(function(currentToken) {
    if (currentToken) {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notificationTokens/' + currentToken).set(false);
    } else {
      requestPermission();
    }
  }).catch(function(err) {
    console.error('Unable to remove messaging token.', err);
    if (err.code === 'messaging/permission-default') {
      window.fcmErrorContainer.innerText = 'You have not enabled notifications on this browser. To enable notifications reload the page and allow notifications using the permission dialog.';
    } else if (err.code === 'messaging/notifications-blocked') {
      window.fcmErrorContainer.innerHTML = 'You have blocked notifications on this browser. To enable notifications follow these instructions: <a href="https://support.google.com/chrome/answer/114662?visit_id=1-636150657126357237-2267048771&rd=1&co=GENIE.Platform%3DAndroid&oco=1">Android Chrome Instructions</a><a href="https://support.google.com/chrome/answer/6148059">Desktop Chrome Instructions</a>';
    }
  });
}

const eraseAllToken = function() {
  firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notificationTokens/').set(false);
}


const onMessage = function(payload) {
  console.log('Notifications received.', payload);

  // Normally our Function sends a notification payload, we check just in case.
  if (payload.notification) {
    // If notifications are supported on this browser we display one.
    // Note: This is for demo purposes only. For a good user experience it is not recommended to display browser
    // notifications while the app is in focus. In a production app you probably want to only display some form of
    // in-app notifications like the snackbar (see below).
    if (window.Notification instanceof Function) {
      // This displays a notification if notifications have been granted.
      new Notification(payload.notification.title, payload.notification);
    }
    // Display the notification content in the Snackbar too.
    window.snackbar.MaterialSnackbar.showSnackbar({message: payload.notification.body});
  }
};

//don't forget
$(window).on('load', function () {
  handleIfUserIsSignedIn().then(_ => {
    window.fcmErrorContainer = document.getElementById('fcm-error-container');
    window.snackbar = document.getElementById('demo-snackbar');
    firebase.messaging().onMessage(onMessage);
    getAllDatasAndCheckForNewOne();
    checkForDataUpdated();
    checkForDataRemoved();
    switchViewAvailable();
  });
  //$(ID).toggleClass( "bounce" )
});