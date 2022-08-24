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
        db.collection("mainPage").doc("section3").collection("portfolio").get().then(doc => {
            let html = '';
            doc.forEach(doc => {
                let section = `
                <div class="slide">
                            <div>
                                <img style="width:100%; height:100%" src="${doc.data().image}">
                            </div>
                        </div>
                    `
                    html += section
                    $('.slider').slick('slickAdd', section);
            });
            section3.innerHTML = html
        })
    }
}
let section3 = document.querySelector(".slider_wrapper").children[0].children[0]
let section3_ = new Section3()
section3_.section3()
//                                      ''' SECTION 4 '''
class Section4 extends DisplayMainPage {
    section4() {
        db.collection("mainPage").doc("section4").onSnapshot(doc => {
                let html = '';
                section4Sub.children[0].children[1].innerHTML = `
                <span>${doc.data().subheader1}</span>`
                section4Sub.children[0].children[2].innerHTML = `
                <div>${doc.data().subtext1}</div>`
                section4Sub.children[1].children[1].innerHTML = `
                <span>${doc.data().subheader2}</span>`
                section4Sub.children[1].children[2].innerHTML = `
                <div>${doc.data().subtext2}</div>`
                section4Sub.children[2].children[1].innerHTML = `
                <span>${doc.data().subheader3}</span>`
                section4Sub.children[2].children[2].innerHTML = `
                <div>${doc.data().subtext3}</div>`
                section4Image.innerHTML = `<img src="${doc.data().image}">`
                let section = `
                    <h2>${doc.data().header}</h2>
                    ${doc.data().text}
                    `
                html += section
                section4.innerHTML = html
            
            
        })
    }
}
let section4 = document.querySelector(".section_3_1_2_text")
let section4Image = document.querySelector(".section_3_1_1") 
let section4Sub = document.querySelector(".squares_2")
let section4_ = new Section4()
section4_.section4()
//                                      ''' SECTION 5 '''
class Section5 extends DisplayMainPage {
    section5() {
        db.collection("mainPage").doc("section5").onSnapshot(doc => {
            s5_1.children[0].children[1].innerHTML = `${doc.data().text1}`
            s5_1.children[0].children[2].innerHTML = `${doc.data().text2}`
            s5_1.children[0].children[3].innerHTML = `${doc.data().text3}`
            s5_2.children[0].children[1].innerHTML = `${doc.data().text4}`
            s5_2.children[0].children[2].innerHTML = `${doc.data().text5}`
            s5_2.children[0].children[3].innerHTML = `${doc.data().text6}`
            s5_3.children[0].children[1].innerHTML = `${doc.data().text7}`
            s5_3.children[0].children[2].innerHTML = `${doc.data().text8}`
            s5_3.children[0].children[3].innerHTML = `${doc.data().text9}`
            s5_4.children[0].children[1].innerHTML = `${doc.data().text10}`
            s5_4.children[0].children[2].innerHTML = `${doc.data().text11}`
            s5_4.children[0].children[3].innerHTML = `${doc.data().text12}`
        })
    }
}
let s5_1 = document.getElementById("s5_1")
let s5_2 = document.getElementById("s5_2")
let s5_3 = document.getElementById("s5_3")
let s5_4 = document.getElementById("s5_4")
let section5_ = new Section5()
section5_.section5()