//                                  DISPLAY EMAIL
function personalCabinet(user){
    console.log(user)
    document.querySelector(".nav_buttons").innerHTML = `${user.email} <button onclick="signOut()">Выход</button>`
}
//                                  END DISPLAY EMAIL