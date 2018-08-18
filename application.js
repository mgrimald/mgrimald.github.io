// https://firebase.google.com/docs/database/web/read-and-write

// https://firebase.google.com/docs/database/security/securing-data

// https://firebase.google.com/docs/reference/js/

// https://firebase.google.com/docs/reference/js/firebase.database.Reference#on

// https://console.firebase.google.com/u/0/project/crud-app-tutorial/database/crud-app-tutorial/data
// https://console.firebase.google.com/u/0/project/crud-app-tutorial/authentication/providers

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

const dataTable = firebase.database().ref("randomName/");

const getAllDatasAndCheckForNewOne = function () {
  dataTable.on('child_added', function(dataSnapshot) {
    dataKey = dataSnapshot.key;
    data = dataSnapshot.val();

    const payload = data.payload;
    const createdTime = data.createdTime;
    const user = data.user;
    const hstr = `
    <tr id="dataKey_${dataKey}">
      <td>${user}</td>
      <td>${createdTime}</td>
      <td>
        ${payload}
      </td>
      <td>
        ${dataKey}
      </td>
      <td>
        <button onclick="eraseContent('${dataKey}');">erase(update)</button>
      </td>
      <td>
        <button onclick="deleteData('${dataKey}');">delete</button>
      </td>
    </tr>
    `

    $('#myTable > tbody:last-child').append(hstr);
  });
}

const checkForDataUpdated = function () {
  dataTable.on('child_changed', function(dataSnapshot) {
    console.log(dataSnapshot);
    dataKey = dataSnapshot.key;
    data = dataSnapshot.val();

    const payload = data.payload;
    const createdTime = data.createdTime;
    const user = data.user;
    const hstr = `
    <tr id="dataKey_${dataKey}">
      <td>${user}</td>
      <td>${createdTime}</td>
      <td>
        ${payload}
      </td>
      <td>
        ${dataKey}
      </td>
      <td>
        <button onclick="eraseContent('${dataKey}');">erase(update)</button>
      </td>
      <td>
        <button onclick="deleteData('${dataKey}');">delete</button>
      </td>
    </tr>
    `

    $(`#dataKey_${dataKey}`).replaceWith(hstr);
  });
}

const checkForDataRemoved = function () {
  dataTable.on('child_removed', function(dataSnapshot) {
    console.log("event: removed: ", dataSnapshot);
    const dataKey = dataSnapshot.key;
    $(`#dataKey_${dataKey}`).detach();
  });
}

// Save a new recommendation to the database, using the input in the form
const addData = function () {

  // Get input values from each of the form elements
  const userId = (firebase.auth().currentUser ? firebase.auth().currentUser.uid : "Anon");
  const payload = $("#payload").val();
  
  const newData = {
    createdTime: firebase.database.ServerValue.TIMESTAMP,
    'user': userId,
    'payload': payload
  };

  dataTable.push(newData);
  console.log("data: ", newData);
  $('#payload').val("");//reset to empty
  return false;//to add if you don't want the page to reload
};

function getValue(dataKey){
  firebase.database().ref('randomName/' + dataKey).once('value').then(function(dataSnapshot){
    console.log("dataKey:", dataSnapshot.key);
    console.log("dataVal:", dataSnapshot.val());
    return dataSnapshot.val();
  })
}

function eraseContent(dataKey){
  firebase.database().ref('randomName/' + dataKey).set({
    createdTime: 0,
    erasedTime: firebase.database.ServerValue.TIMESTAMP,
    user: "[ERASED]",
    payload: "[ERASED]"
  });
  //firebase.database().ref('randomName/' + dataKey).set(null);
}

function deleteData(dataKey){
  console.log("removing: ", dataKey);
  firebase.database().ref('randomName/' + dataKey).remove();
}

// Google API 
// https://medium.com/google-cloud/using-google-apis-with-firebase-auth-and-firebase-ui-on-the-web-46e6189cf571
// https://developers.google.com/calendar/quickstart/js
var configApi = {
  clientId: "882607191338-shoghehf5rkthrv6d2lssu898bml2b71.apps.googleusercontent.com",
  scope: [
     "email",
     "profile",
     "https://www.googleapis.com/auth/calendar"
  ],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
}

function toggleSignIn(connectWithRedirect = true) {
  //if user is not yet know
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    provider.addScope("https://www.googleapis.com/auth/calendar");

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
  }
}

function handleIfUserIsSignedIn() {
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      $('#loggin').html(`Hello ${firebase.auth().currentUser.email || firebase.auth().currentUser.uid} [${token}], would you like to sign out ?`)
    } else if (result.user || firebase.auth().currentUser){
      $('#loggin').html(`Hello ${firebase.auth().currentUser.email || firebase.auth().currentUser.uid}, would you like to sign out ?`)
    }
    else {
      console.log("user is not signed in")
      $('#loggin').html(`SIGN IN RIGHT HERE`);
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
  });
}

function handleGoogleApiSignIn() {
  // This function will trigger when there is a login event
  firebase.auth().onAuthStateChanged(function(user) {
    // Make sure there is a valid user object

    // C'est un beau bordel, malheureusement leur chargement de gapi.client ne se fait pas tel que prévu
    // voir issue https://github.com/google/google-api-javascript-client/issues/399
    if(user){
      function loadAndInitGAPI() {
        return new Promise((resolve, reject) => {
          let script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = 'https://apis.google.com/js/api.js'
          script.onload = e => {
            gapi.load('client:auth2', _ => {
              console.log('loaded GAPI')
              function initGAPI(){
                console.log("here 1");
                if (!gapi || !gapi.client){ 
                  return reject('no gapi.client')
                }
                gapi.client.init({
                  apiKey: config.apiKey,
                  clientId: configApi.clientID,
                  discoveryDocs: configApi.discoveryDocs,
                  scope: configApi.scopes,
                })
                .then(_ => {
                  console.log('initialised GAPI')
                  GAPIiniOK = true
                }).catch(error => {
                console.log("here 3");
                  return reject(error)
                })
              }
              setTimeout(initGAPI, 10)
            })
          }
          document.getElementsByTagName('head')[0].appendChild(script)
        })
      }
      loadAndInitGAPI();
    }
    else {
      //user is not signed in.
    }
  })
}

function addEventToCalendar() {
  if (!firebase.auth().currentUser){
    toggleSignIn(false);//false to use popup login and (maybe one day) avoid loosing form datas.
  }
  else {
    firebase.auth().currentUser.getIdToken()
    .then(function(token) {
      return gapi.client.calendar.events.list({
       calendarId: "primary",
       timeMin: new Date().toISOString(),
       showDeleted: false,
       singleEvents: true,
       maxResults: 10,
       orderBy: "startTime"
      })  
     })
    .then(function(response) {
      console.log(response);  
    });
  }
}

      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
        pre.appendChild(document.createElement("br"));
      }

      
      function listUpcomingEventsForAllCalendars() {
        if (!firebase.auth().currentUser){
          toggleSignIn(false);//false to use popup login and (maybe one day) avoid loosing form datas.
        }
        else {
          firebase.auth().currentUser.getIdToken()
          .then(function(token) {
            return gapi.client.calendar.calendarList.list({
              'calendarId': 'fr.french#holiday@group.v.calendar.google.com',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            })
           })
          .then(function(response) {
            console.log(response);
          });
        }
      }
      function listUpcomingEventsForCalendar(calendarId) {
        if (!firebase.auth().currentUser){
          toggleSignIn(false);//false to use popup login and (maybe one day) avoid loosing form datas.
        }
        else {
          firebase.auth().currentUser.getIdToken()
          .then(function(token) {
            return gapi.client.calendar.events.list({
              'calendarId': calendarId,
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            })
           })
          .then(function(response) {
            var events = response.result.items;
            appendPre('Upcoming events:');

            if (events.length > 0) {
              for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                  when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
              }
            } else {
              appendPre('No upcoming events found.');
            }
          });
        }
      }

//don't forget
$(window).on('load', function () {
  $("#dataForm").submit(addData);
  handleIfUserIsSignedIn();
  handleGoogleApiSignIn();
  getAllDatasAndCheckForNewOne();
  checkForDataUpdated();
  checkForDataRemoved();
});
