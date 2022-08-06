const createForm = document.querySelector("#create-form"), loginButtons = document.querySelectorAll(".login"), exit = document.querySelector(".signOut"),statusEmail = document.querySelector(".status-email"),statusFname = document.querySelector(".status-fname"),status = document.querySelector(".status"),statusGuest = document.querySelector(".status"),calculator = document.querySelector(".calculator"),loginInputs = document.getElementById("login-inputs"),userOrders = document.querySelector(".user_orders")


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
        if (user) {
            status.innerHTML = `
        <h3>Customer</h3>
        `
            db.collection('users').doc(user.uid).get().then((doc) => {
                const html = `
            <div> ${user.email} </div>
            <p> ${doc.data().first_name}</p>
            <p> ${doc.data().second_name}</p>
            <input placeholder="Адрес" value='${doc.data().addres}'>
            <input placeholder="Город" value='${doc.data().city}'>
            <input placeholder="Номер телефона" value='${doc.data().phoneNumber}'>
            <button id="change">Изменить</button>
            `
                statusEmail.innerHTML = html
                change.addEventListener('click', (e) => {
                    db.collection('users').doc(user.uid).update({
                        addres: statusEmail.children[3].value,
                        city: statusEmail.children[4].value,
                        phoneNumber: statusEmail.children[5].value,
                    }).then(() => {
                        console.log("Изменения внесены")
                    })
                })
            })
        } else {
            status.innerHTML = `<h3>Guest</h3>`
        }
    } catch (e) { }
}
//                                  END PERSONAL Cabinet

//                                  START ORDERS
function showCalculator() {
    db.collection("orders").get().then(snapshot => {
        try {
            console.log(snapshot)
            snapshot.docs.forEach(function callback(doc, index) {
                const html = `
            <div style="border: 5px solid;" class="order${index}">
            <p>${doc.data().email}</p>
            <p>${doc.data().category}</p>
            <p>${doc.data().width}</p>
            <p>${doc.data().height}</p>
            <p>${doc.data().zakalka}</p>
            <p>${doc.data().rezka}</p>
            <p>${doc.data().quantity}</p>
            <p>${doc.data().edgeTreatment}</p>
            <p>${doc.data().edgeTreatmentType}</p>
            <p>${doc.data().facet}</p>
            <p>${doc.data().firstSide}</p>
            <p>${doc.data().secondSide}</p>
            <p>${doc.data().hole}</p>
            <p>${doc.data().holeCount}</p>
            <p>${doc.data().holeDiametr}</p>
            <p>${doc.data().cutout}</p>
            <p>${doc.data().insideCutout}</p>
            <p>${doc.data().outsideCutout}</p>
            <p>${doc.data().sandBlasting}</p>
            <p>${doc.data().sandBlastingType}</p>
            <p>${doc.data().engraving}</p>
            <p>${doc.data().engravingMeter}</p>
            <p>${doc.data().laminating}</p>
            <p>${doc.data().laminatingType}</p>
            <p>${doc.data().oplata}</p>
            <p>${doc.data().totalPrice}</p>
            <p>${doc.data().deliveryType}</p>
            <p>${doc.data().comment}</p>
            <p>${doc.data().date}</p>
            <button id="btn${index}">Заказ завершен</button>
            <select id="delivery-status${index}">
            <option value="Готовится">Готовится</option>
            <option value="Отправлено">Отправлено</option>
            <option value="В пути">В пути</option>
            <option value="Прибыло">Прибыло</option>
            </select>
            <p>${doc.data().deliveryStatus}</p>
            </div>
            `
                userOrders.innerHTML += html
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        document.getElementById("btn" + index).addEventListener('click', (e) => {
                            console.log(doc.id)
                            db.collection("orders").doc(doc.id).delete().then(() => {
                                console.log("Заказ завершен");
                            })
                        })
                        document.getElementById("delivery-status" + index).addEventListener('click', (e) => {
                            console.log(document.getElementById("delivery-status" + index).value)
                            db.collection("orders").doc(doc.id).update({
                                deliveryStatus: document.getElementById("delivery-status" + index).value
                            })
                        })
                    }
                })
            })
        } catch (e) {
            console.log(e)
        }
    })
}
//                                  END ORDERS

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
