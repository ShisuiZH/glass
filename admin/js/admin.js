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
    // доделать
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
            <p id="deliveryStatus">${doc.data().deliveryStatus}</p>
            </div>
            `

            html += calcOrders;
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    document.getElementById("btn" + index).addEventListener('click', (e) => {
                        console.log(doc.id)
                        db.collection("orders").doc(user.email).collection("user_order").doc(doc.id).delete().then(() => {
                            console.log("Заказ завершен");
                        })
                    })
                    document.getElementById("delivery-status" + index).addEventListener('click', (e) => {
                        db.collection("orders").doc(user.email).collection("user_order").doc(doc.id).update({
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
//                                  START EDIT MAIN PAGE
class EditMainPage {
    constructor(header, text) {
        this.header = header;
        this.text = text;
    }

}
class Section1 extends EditMainPage {
    addService() {
        db.collection("mainPage").doc("section1").set({
            header: this.header,
            text: this.text,
        }).then(() => {
            console.log("Секция 1 обновлена")
        })
    }
}
//                                      ''' SECTION 1 '''
let editSection1Form = document.getElementById("section1-form")
db.collection("mainPage").doc("section1").get().then((doc) => {
    editSection1Form.children[0].value = doc.data().header;
    editSection1Form.children[1].value = doc.data().text;
})
editSection1Form.children[2].addEventListener('click', (e) => {
    e.preventDefault()
    let section1 = new Section1(editSection1Form.children[0].value, editSection1Form.children[1].value)
    section1.addService()
})

//                                      ''' SECTION 2 '''
let section2 = document.querySelector(".section2")
function renderSection2(data) {
    let html = '';
    data.forEach(function callback(doc, index) {
        const list = `<div style="border: 5px solid;" class="section2${index}">
                <input value="${doc.data().header}">
                <input value="${doc.data().text}">
                <button onclick="section2DeleteService('${doc.id}')">Удалить</button>
                <button id="btnu${index}">Редактировать</button>
                </div>`
        html += list
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                document.querySelector(".section2" + index).addEventListener('click', (e) => {
                    if (e.target.id == "btnu" + index) {
                        db.collection("mainPage").doc("section2").collection("services").doc(doc.id).update({
                            header: document.querySelector(".section2" + index).children[0].value,
                            text: document.querySelector(".section2" + index).children[1].value,
                        }).then(() => {
                            console.log("Услуга обновлена")
                        })
                    }
                })
            }
        })
    })
    section2.children[3].innerHTML = html
}
function section2AddService() {
    db.collection("mainPage").doc("section2").collection("services").add({
        header: section2.children[0].value,
        text: section2.children[1].value,
    }).then(() => {
        console.log("Услуга добавлена")
    })
}
function section2DeleteService(id) {
    db.collection("mainPage").doc("section2").collection("services").doc(id).delete().then(() => {
        console.log("Услуга удалена")
    }).catch(() => {
        console.log("Ошибка")
    })
}
//                                     ''' SECTION 3 '''
class Section3 {
    constructor(image) {
        this.image = image;
    }

    addPortfolio() {
        let image = this.image;
        let storageRef = firebase.storage().ref(`${image.name}`);
        storageRef.put(image).then(() => {
            storageRef.getDownloadURL().then((url) => {
                db.collection("mainPage").doc("section3").collection("portfolio").add({
                    image: url,
                }).then(() => {
                    console.log("Портфолио добавлено")
                })
            })
        })
    }
    deletePortfolio(id) {
        db.collection("mainPage").doc("section3").collection("portfolio").doc(id).delete().then(() => {
            console.log("Портфолио удалено")
        })
    }
}
let editSection3Form = document.querySelector(".section3")
function renderSection3(data) {
    let html = '';
    data.forEach(function callback(doc, index) {
        const list = `<div style="border: 5px solid;" class="section3${index}">
                <img src="${doc.data().image}">
                <input type="file">
                <button onclick="section3DeletePortfolio('${doc.id}')">Удалить</button>
                <button id="btnu${index}">Редактировать</button>
                </div>`
        html += list
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                document.querySelector(".section3" + index).addEventListener('click', (e) => {
                    if (e.target.id == "btnu" + index) {
                        image = document.querySelector(".section3" + index).children[3].files[0]
                        let storageRef = firebase.storage().ref(`${image.name}`);
                        storageRef.put(image).then(() => {
                            storageRef.getDownloadURL().then((url) => {
                                db.collection("mainPage").doc("section3").collection("portfolio").doc(doc.id).update({
                                    image: url,
                                }).then(() => {
                                    console.log("Портфолио обновлено")
                                })
                            })
                        })
                    }
                })
            }
        })
    }
    )
    editSection3Form.children[2].innerHTML = html
}
editSection3Form.children[1].addEventListener('click', (e) => {
    e.preventDefault()
    let section3 = new Section3(editSection3Form.children[0].files[0])
    section3.addPortfolio()
})
function section3DeletePortfolio(id) {
    let section3 = new Section3()
    section3.deletePortfolio(id)
}
//                                     ''' SECTION 4 '''
class Section4 extends EditMainPage {
    constructor(header, text, subheader1, subtext1, subheader2, subtext2, subheader3, subtext3, image) {
        super(header, text)
        this.image = image;
        this.subheader1 = subheader1;
        this.subtext1 = subtext1;
        this.subheader2 = subheader2;
        this.subtext2 = subtext2;
        this.subheader3 = subheader3;
        this.subtext3 = subtext3;
    }
    addImage() {
        let image = this.image;
        let storageRef = firebase.storage().ref(`${image.name}`);
        storageRef.put(image).then(() => {
            storageRef.getDownloadURL().then((url) => {
                db.collection("mainPage").doc("section4").update({
                    image: url,
                }).then(() => {
                    console.log("Картинка добавлена")
                })
            })
        })
    }
    deleteImage() {
        db.collection("mainPage").doc("section4").update({
            image: "",
        }).then(() => {
            console.log("Картинка удалена")
        }).catch(() => {
            console.log("Ошибка")
        })
    }
    addText() {
        db.collection("mainPage").doc("section4").update({
            header: this.header,
            subheader1: this.subheader1,
            subheader2: this.subheader2,
            subheader3: this.subheader3,
            text: this.text,
            subtext1: this.subtext1,
            subtext2: this.subtext2,
            subtext3: this.subtext3,
        }).then(() => {
            console.log("Текст добавлен")
        })
    }
}
let editSection4Form = document.querySelector(".section4")
function renderSection4(data) {
     editSection4Form.children[0].value = data.data().header
    editSection4Form.children[1].value = data.data().text
    editSection4Form.children[2].value = data.data().subheader1
    editSection4Form.children[3].value = data.data().subtext1
    editSection4Form.children[4].value = data.data().subheader2
    editSection4Form.children[5].value = data.data().subtext2
    editSection4Form.children[6].value = data.data().subheader3
    editSection4Form.children[7].value = data.data().subtext3
}
editSection4Form.children[8].addEventListener('click', (e) => {
    e.preventDefault()
    let section4 = new Section4(editSection4Form.children[0].value, editSection4Form.children[1].value,
        editSection4Form.children[2].value, editSection4Form.children[3].value, editSection4Form.children[4].value,
        editSection4Form.children[5].value, editSection4Form.children[6].value, editSection4Form.children[7].value)
    section4.addText()
})
editSection4Form.children[10].addEventListener('click', (e) => {
    e.preventDefault()
    let section4 = new Section4("", "", "", "", "", "", "", "", editSection4Form.children[9].files[0])
    section4.addImage()
})
editSection4Form.children[11].addEventListener('click', (e) => {
    e.preventDefault()
    let section4 = new Section4()
    section4.deleteImage()
})
//                                     ''' SECTION 5 '''
class Section5 {
    constructor(text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12) {
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.text4 = text4;
        this.text5 = text5;
        this.text6 = text6;
        this.text7 = text7;
        this.text8 = text8;
        this.text9 = text9;
        this.text10 = text10;
        this.text11 = text11;
        this.text12 = text12;
    }
    addText() {
        db.collection("mainPage").doc("section5").update({
            text1: this.text1,
            text2: this.text2,
            text3: this.text3,
            text4: this.text4,
            text5: this.text5,
            text6: this.text6,
            text7: this.text7,
            text8: this.text8,
            text9: this.text9,
            text10: this.text10,
            text11: this.text11,
            text12: this.text12,
        }).then(() => {
            console.log("Текст добавлен")
        })
    }
}
let editSection5Form = document.querySelector(".section5")
function renderSection5(data) {
    editSection5Form.children[1].value = data.data().text1
    editSection5Form.children[2].value = data.data().text2
    editSection5Form.children[3].value = data.data().text3
    editSection5Form.children[5].value = data.data().text4
    editSection5Form.children[6].value = data.data().text4
    editSection5Form.children[7].value = data.data().text4
    editSection5Form.children[9].value = data.data().text4
    editSection5Form.children[10].value = data.data().text4
    editSection5Form.children[11].value = data.data().text4
    editSection5Form.children[13].value = data.data().text4
    editSection5Form.children[14].value = data.data().text4
    editSection5Form.children[15].value = data.data().text4
}
editSection5Form.children[16].addEventListener('click', (e) => {
    e.preventDefault()
    let section5 = new Section5(
        editSection5Form.children[1].value,
        editSection5Form.children[2].value,
        editSection5Form.children[3].value,
        editSection5Form.children[5].value,
        editSection5Form.children[6].value,
        editSection5Form.children[7].value,
        editSection5Form.children[9].value,
        editSection5Form.children[10].value,
        editSection5Form.children[11].value,
        editSection5Form.children[13].value,
        editSection5Form.children[14].value,
        editSection5Form.children[15].value)
    section5.addText()
})
//                                  END EDIT MAIN PAGE