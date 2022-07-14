const createForm = document.querySelector("#create-form");
const loginButtons = document.querySelectorAll(".login")
const exit = document.querySelector(".signOut")
const statusEmail = document.querySelector(".status-email")
const statusFname = document.querySelector(".status-fname")
const status = document.querySelector(".status")
const statusGuest = document.querySelector(".status")
const calculator = document.querySelector(".calculator")
const loginInputs = document.getElementById("login-inputs")

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let uid = user.uid;
        db.collection('users').doc(uid).get().then((snapshot)=>{
            let order = new Order(uid, snapshot.data().first_name, "1000", "2", new Date(), snapshot.data().city, snapshot.data().address, "Kaspi", "Delivery", "Waiting");
            order.toDB();
        })
    } else {
      // User is signed out
    }
  });
function createAdmin(cancelAd){
    let makeAdminForm = document.getElementById("make-admin-form")
    let email = makeAdminForm['email-admin-form'].value
    db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if(cancelAd === null){
                db.collection('users').doc(doc.id).update({
                    isAdmin: false,
                }).then(()=>{
                    console.log("Админ отменен")
                })
            }else{
                db.collection('users').doc(doc.id).update({
                    isAdmin: true,
                }).then(()=>{
                    console.log("Админ выдан")
                })
            }
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
// function showNav(user) {
//     if (user) {
//         status.innerHTML = `
//         <h3>Customer</h3>
//         `
//         db.collection('users').doc(user.uid).get().then((doc)=>{
//             const html = `
//             <div> ${user.email} </div>
//             <p> ${doc.data().first_name}</p>
//             <p> ${doc.data().second_name}</p>
//             <input placeholder="Адрес" value='${doc.data().addres}'>
//             <input placeholder="Город" value='${doc.data().city}'>
//             <input placeholder="Номер телефона" value='${doc.data().phoneNumber}'>
//             <button id="change">Изменить</button>
//             `
//             statusEmail.innerHTML = html
//             change.addEventListener('click', (e)=>{
//                     db.collection('users').doc(user.uid).update({
//                         addres: statusEmail.children[3].value,
//                         city: statusEmail.children[4].value,
//                         phoneNumber: statusEmail.children[5].value,
//                     }).then(()=>{
//                         console.log("Изменения внесены")
//                     })
//                 })
//         })
//     } else {
//         statusEmail.innerHTML = ``
//         status.innerHTML = `
//         <h3>Guest</h3>
//         `
//     }
// }
function gener(uid) {
}
        //     let makeAdminForm = document.getElementById("make-admin-form")
        //     let html = `
        //     <h4>${doc.data().email}</h4>
        //     <h4>${doc.data().email}</h4>
        //     <button id="makeAdmin">Сделать админа</button>
            
        //     <button id="cancelAdmin">Отменить админа</button>
        //     `
        //     makeAdminForm.innerHTML = html
    //     makeAdmin.addEventListener('click', (e)=>{
    //         db.collection('users').doc(uid).update({
    //             isAdmin: true,
    //         }).then(()=>{
    //             console.log("Админ выдан")
    //         })
    //     })
    //     cancelAdmin.addEventListener('click', (e)=>{
    //         db.collection('users').doc(uid).update({
    //             isAdmin: false,
    //         }).then(()=>{
    //             console.log("админ отменен")
    //         })
    //     })
    // })
    // db.collection("products").doc().get().then(snapshot=>{
    //     let data = snapshot.data()
    //     let createForm = document.getElementById("create-product-form")
    //     createForm['header-product'].setAttribute('value', data.header)
    //     createForm['text-product'].setAttribute('value', data.text)
    // })
// //                               ADD to collection
function createProduct() {
    db.collection("products").add({
        header: createForm['header-product'].value,
        text: createForm['text-product'].value,
    }).then(()=>{
        console.log("Отправлено")
    }
    )
}
//                                  end of ADD to collection
class Order {
    constructor(uid, name, totalPrice, count, date, city, address, paymentMethod, deliveryType, status) {
        this.uid = uid;
        this.name = name;
        this.totalPrice = totalPrice;
        this.count = count;
        this.date = date;
        this.city = city;
        this.address = address;
        this.paymentMethod = paymentMethod;
        this.deliveryType = deliveryType;
        this.status = status;
    }
    toDB() {
        console.log(this.uid, this.name, this.totalPrice, this.count, this.date, this.city, this.address, this.paymentMethod, this.deliveryType, this.status)
    }
  }