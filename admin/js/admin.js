const createForm = document.querySelector("#create-form"), loginButtons = document.querySelectorAll(".login"),
    exit = document.querySelector(".signOut"),
    aboutUser = document.querySelector(".status-email"),
    statusFname = document.querySelector(".status-fname"),
    privilege = document.querySelector(".status"),
    statusGuest = document.querySelector(".status"),
    calculator = document.querySelector(".calculator")

function createAdmin(cancelAd) {
    let makeAdminForm = document.getElementById("make-admin-form")
    let email = makeAdminForm['email-admin-form'].value
    db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
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
//                                  END ADD PRODUCTS
//                                  START SHOW CALCULATOR ORDERS
function showCalculator(data) {
    let userOrders = document.querySelector(".user_orders");
    try {
        let html = '';
        data.forEach(function callback(doc, index) {
            const calcOrders = `
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
            <option value="Подтвержден">Подтвержден</option>
            <option value="Комплектуется">Комплектуется</option>
            <option value="Отправка">Отправка</option>
            <option value="Доставка">Доставка</option>
            <option value="Доставлен">Доставлен</option>
            </select>
            <p>${doc.data().deliveryStatus}</p>
            </div>
            `
            html += calcOrders;
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
        userOrders.innerHTML = html
    } catch (e) {
        console.log(e)
    }
}

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
                            if (file) {
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
                            } else {
                                db.collection("products").doc(doc.id).update({
                                    header: document.querySelector(".product" + index).children[0].value,
                                    text: document.querySelector(".product" + index).children[1].value,
                                }).then(() => {
                                    console.log("Товар обновлен")
                                })
                            }
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
