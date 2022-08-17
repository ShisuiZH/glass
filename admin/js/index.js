//                                  DISPLAY EMAIL
function personalCabinet(user) {
    document.querySelector(".nav_buttons").innerHTML = `${user.email} <button onclick="signOut()">Выход</button>`
}
//                                  END DISPLAY EMAIL

//                                  START DISPLAY MAIN PAGE
class DisplayMainPage {
    constructor(header, text) {
        this.header = header;
        this.text = text;
    }
}
//                                      ''' SECTION 1 '''
class Section1 extends DisplayMainPage {
    section1() {
        db.collection("mainPage").doc("section1").onSnapshot(doc => {
            let html = '';
            let section = `
                <h1 class="header_text_1">${doc.data().header}</h1>
                <div class="header_text_2">${doc.data().text}</div>
                `
            html += section
            section1.innerHTML = html
        })
    }
}
let section1 = document.querySelector(".header_content")
let section1_ = new Section1()
section1_.section1()
//                                      ''' SECTION 2 '''
class Section2 extends DisplayMainPage {
    section2() {
        db.collection("mainPage").doc("section2").collection("services").onSnapshot(doc => {
            let html = '';
            doc.forEach(doc => {
                let section = `
                <div class="square_1">
                            <div>
                                <h2>${doc.data().header}</h2>
                                <span>
                                ${doc.data().text}
                                </span>
                            </div>
                            
                            <button class="button_2">Подробнее</button>
                </div>
                    `
                html += section
            });
            section2.innerHTML = html
        })
    }
}
let section2 = document.querySelector(".squares_1")
let section2_ = new Section2()
section2_.section2()
//                                      ''' SECTION 3 '''
class Section3 {
    section3() {
        db.collection("mainPage").doc("section3").collection("portfolio").onSnapshot(doc => {
            let html = '';
            doc.forEach(doc => {
                let section = `
                <div class="slide">
                            <div>
                                <img  src="${doc.data().image}">
                            </div>
                        </div>
                    `
                    $('.slider').slick('slickAdd', section);
                html += section
            });
            section3.innerHTML = html
        })
    }
}
let section3 = document.querySelector(".slider_wrapper").children[0].children[0]
let section3_ = new Section3()
section3_.section3()