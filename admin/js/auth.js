const firebaseConfig = {
  apiKey: "AIzaSyAt4uqhaKoDUS6lsq5O03TyObFj03LHwjk",
  authDomain: "glass-59fe9.firebaseapp.com",
  databaseURL: "https://glass-59fe9-default-rtdb.firebaseio.com",
  projectId: "glass-59fe9",
  storageBucket: "glass-59fe9.appspot.com",
  messagingSenderId: "899374852173",
  appId: "1:899374852173:web:fd5bca39ee0ec906e6d404",
  measurementId: "G-BFPNK6YMVT"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//                                      SIGNUP / SIGNOUT
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    personalCabinet(user)
  }else{
    personalCabinet()
  }
})
function signUpWithEmailPassword() {
  // [START auth_signup_password]
  const registrationFormAdmin = document.getElementById("registration-admin");
  const email = registrationFormAdmin['reg-email'].value;
  const password = registrationFormAdmin['reg-password'].value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    db.collection("users").doc(userCredential.user.uid).set({
      first_name: registrationFormAdmin['reg-name'].value,
      email: registrationFormAdmin['reg-email'].value,
      isAdmin: false,
    })
    firebase.auth().currentUser.sendEmailVerification()
    firebase.auth().useDeviceLanguage()
    console.log("Регистрация прошла успешна! Подтвердите email и ожидайте подтверждения от супер админа")
  }).catch((error) => {
      var errorMessage = error.message;
      if(errorMessage == "The email address is already in use by another account."){
        console.log("Email уже зарегестрирован")
      }else{
        console.log("Введите email/пароль")
        console.log(errorMessage)
      }
    });
  // [END auth_signup_password]
}
function signInWithEmailPassword() {
  // [START auth_signin_password]
  let loginAdminForm = document.getElementById("login-admin");
  const email = loginAdminForm['login-email'].value;
  const password = loginAdminForm['login-password'].value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("Загрузка...")
      let emailVerified = userCredential.user.emailVerified != true ? "Подтвердите email":"Ваш email подтвержден"
      db.collection("users").doc(userCredential.user.uid).get().then(snapshot=>{
        if(snapshot.data().isAdmin == true && userCredential.user.emailVerified == true){
          console.log("Вы администратор")
          window.location.href="adminpanel.html"
        }else{
          console.log("Вы пользователь")
          console.log(emailVerified)
        }
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      if(errorMessage == "There is no user record corresponding to this identifier. The user may have been deleted."){
        alert("Пользователь не найден, проверьте правильность написания email'a")
      }else if(errorMessage == "The password is invalid or the user does not have a password."){
        alert("Неверный пароль. Проверьте правильность написания пароля")
      }else if(errorMessage == "The email address is badly formatted."){
        alert("Клетки ввода должны быть заполнены")
      }
    });
    // [END auth_signin_password]
  }
function signOut() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    console.log("Выход")
    window.location.href="auth.html"
  }).catch((error) => {
    // An error happened.
  });
  // [END auth_sign_out]
}

function resetPassword(){
  let email = document.getElementById("email-reset-password").value
  firebase.auth().sendPasswordResetEmail(email)
  .then((userCredential)=>{
    firebase.auth().useDeviceLanguage()
    console.log('email sent!')
  }).catch((error)=>{
    alert("error!")
  });
}
//                              SIGNUP / SIGNOUT
$('.hide').on('click', function(){
  if($("#login-password").attr('type') == "password" || $("#reg-password").attr('type') == "password"){
    $('#login-password').attr('type', 'text');
    $('#reg-password').attr('type', 'text');
    $("#hide1").toggle();
    $("#show1").hide();
    $("#hide2").toggle();
    $("#show2").hide();
  } else {
    $('#login-password').attr('type', 'password');
    $('#reg-password').attr('type', 'password');
    $("#hide1").toggle();
    $("#show1").show();
    $("#hide2").toggle();
    $("#show2").show();
	}
})