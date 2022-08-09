const createForm = document.querySelector("#create-form"), loginButtons = document.querySelectorAll(".login"),
    exit = document.querySelector(".signOut"),
    aboutUser = document.querySelector(".status-email"),
    statusFname = document.querySelector(".status-fname"),
    privilege = document.querySelector(".status"),
    statusGuest = document.querySelector(".status"),
    calculator = document.querySelector(".calculator"),
    loginInputs = document.getElementById("login-inputs")

function createAdmin(cancelAd) {
    let makeAdminForm = document.getElementById("make-admin-form")
    let email = makeAdminForm['email-admin-form'].value
    db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (cancelAd === null) {
                db.collection('users').doc(doc.id).update({
                    isAdmin: false,
                }).then(() => {
                    console.log("Админ отменен")
                })
            } else {
                db.collection('users').doc(doc.id).update({
                    isAdmin: true,
                }).then(() => {
                    console.log("Админ выдан")
                })
            }
        })
    })
}

//                                  START PERSONAL Cabinet
function personalCabinet(user) {
    try {
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.data().isAdmin === false) {
                privilege.innerHTML = `
                <h3>Покупатель</h3>
                `
                db.collection('users').doc(user.uid).get().then((doc) => {
                    document.querySelector(".nav_buttons").innerHTML = `${user.email} <button onclick="signOut()">Выход</button>`
                    const html = `
                    <p> ${doc.data().first_name}</p>
                    <p> ${doc.data().second_name}</p>
                    <input placeholder="Адрес" value='${doc.data().addres}'>
                    <input placeholder="Город" value='${doc.data().city}'>
                    <input placeholder="Номер телефона" value='${doc.data().phoneNumber}'>
                    <button id="change">Изменить</button>
                    <button onclick="signOut()">Выход</button>
                    `
                    aboutUser.innerHTML = html
                    change.addEventListener('click', (e) => {
                        db.collection('users').doc(user.uid).update({
                            addres: aboutUser.children[3].value,
                            city: aboutUser.children[4].value,
                            phoneNumber: aboutUser.children[5].value,
                        }).then(() => {
                            console.log("Изменения внесены")
                        })
                    })
                })
            } else if (doc.data().isAdmin === true) {
                privilege.innerHTML = `
                <h3>Менеджер</h3><a href='../admin/adminpanel.html'>Перейти</a></h3>
                `
                db.collection('users').doc(user.uid).get().then((doc) => {
                    document.querySelector(".nav_buttons").innerHTML = `${user.email} <button onclick="signOut()">Выход</button>`
                    const html = `
                <p> ${doc.data().first_name}</p>
                <p> ${doc.data().second_name}</p>
                <input placeholder="Адрес" value='${doc.data().addres}'>
                <input placeholder="Город" value='${doc.data().city}'>
                <input placeholder="Номер телефона" value='${doc.data().phoneNumber}'>
                <button id="change">Изменить</button>
                <button onclick="signOut()">Выход</button>
                `
                    aboutUser.innerHTML = html
                    change.addEventListener('click', (e) => {
                        db.collection('users').doc(user.uid).update({
                            addres: aboutUser.children[3].value,
                            city: aboutUser.children[4].value,
                            phoneNumber: aboutUser.children[5].value,
                        }).then(() => {
                            console.log("Изменения внесены")
                        })
                    })
                })
            }
        })
    } catch (e) { }
}
//                                  END PERSONAL Cabinet

//                                  START ADD PRODUCTS
function addProduct() {
    let createProductForm = document.getElementById("create-product-form")
    db.collection("products").add({
        header: createProductForm.children[0].value,
        text: createProductForm.children[1].value,
    }).then(function (docRef) {
        createProductForm.children[4].innerHTML = "Товар добавлен"
        file = createProductForm.children[2].files[0];
        storageRef = firebase.storage().ref(`${file.name}`);
        storageRef.put(file).then(() => {
            storageRef.getDownloadURL().then((url) => {
                db.collection("products").doc(docRef.id).update({
                    image: url
                }).catch(() => {
                    console.log("Изображение не добавлено")
                })
            })
        })
    }
    )
}

function showProducts(data) {
    let products = document.querySelector(".product-list")
    try {
        let html = '';
        data.forEach(function callback(doc, index) {
            const list = `<div style="border: 5px solid;" class="product${index}">
                <input value="${doc.data().header}">
                <input value="${doc.data().text}">
                <img style="width:100px; height:100px;" src="${doc.data().image}">
                <input type="file">
                <button id="btnd${index}">Удалить</button>
                <button id="btnu${index}">Редактировать</button>
                </div>`
            html += list
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    document.querySelector(".product" + index).addEventListener('click', (e) => {
                        if (e.target.id == "btnd" + index) {
                            db.collection("products").doc(doc.id).delete().then(() => {
                                console.log("Товар удален")
                            })
                        }
                        if (e.target.id == "btnu" + index) {
                            file = document.querySelector(".product" + index).children[3].files[0];
                            storageRef = firebase.storage().ref(`${file.name}`);
                            storageRef.put(file).then(() => {
                                storageRef.getDownloadURL().then((url) => {
                                    db.collection("products").doc(doc.id).update({
                                        image: url
                                    }).catch(() => {
                                        console.log("Изображение не добавлено")
                                    })
                                })
                            })
                            db.collection("products").doc(doc.id).update({
                                header: document.querySelector(".product" + index).children[0].value,
                                text: document.querySelector(".product" + index).children[1].value,
                            }).then(() => {
                                console.log("Товар обновлен")
                            })
                        }
                    })
                }
            })
        })
        products.innerHTML = html

    } catch (e) {
        console.log(e)
    }
}
//                                  END ADD PRODUCTS
//                                  TRACK ORDER
function trackOrder(uid) {
    let ordersTable = document.querySelector(".section1_2")
    db.collection("orders").doc(uid.email).collection("user_order").get().then(snapshot => {
        let html = '';
        snapshot.docs.forEach(function callback(doc, index) {
            const list = `
            <div class="section1_2_1 a${index}">${doc.data().id}</div>
            <div class="section1_2_2 a${index}">${doc.data().date}</div>
            <div class="section1_2_3 a${index}">${doc.data().deliveryStatus}</div>
            <div class="section1_2_4 a${index}">${doc.data().totalPrice}</div>
            <button id="btnd${index}">Удалить</button>
            `
            html += list
        })
        ordersTable.innerHTML = html
    })
}

trackOrder()
//                                  END TRACK ORDER