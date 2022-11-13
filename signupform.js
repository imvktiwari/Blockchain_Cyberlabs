var firebaseConfig = {
    apiKey: "AIzaSyAjuIc1C2Yg_QYAdgwso_mvaEVOhL8ZrVs",
    authDomain: "find-teammate-bdf14.firebaseapp.com",
    projectId: "find-teammate-bdf14",
    storageBucket: "find-teammate-bdf14.appspot.com",
    messagingSenderId: "798285481516",
    appId: "1:798285481516:web:b0428d0b7966922955f389",
    measurementId: "G-4GMDNDNQHX"
};


// Initialize Firebase 
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
    // Get all our input fields
    fname = document.getElementById('fname').value
    age = document.getElementById('age').value
    clg = document.getElementById('clg').value
    yos = document.getElementById('yos').value
    plang = document.getElementById('plang').value
    glink = document.getElementById('glink').value
    llink = document.getElementById('llink').value
    number = document.getElementById('number').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    //Validate input fields

    if (validate_field(fname) == false || validate_field(age) == false || validate_field(clg) == false || validate_field(yos) == false || validate_field(plang) == false || validate_field(glink) == false || validate_field(llink) == false || validate_field(number) == false || validate_field(email) == false || validate_field(password) == false || validate_field(cpassword) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                fname: fname,
                age: age,
                clg: clg,
                yos: yos,
                plang: plang,
                glink: glink,
                llink: llink,
                number: number,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            alert('User Logged In!!')

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}




function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}