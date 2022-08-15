//                                  DISPLAY EMAIL
function personalCabinet(user) {
    document.querySelector(".nav_buttons").innerHTML = `${user.email} <button onclick="signOut()">Выход</button>`
}
//                                  END DISPLAY EMAIL

//                                  START DISPLAY MAIN PAGE
class DisplayMainPage {
    constructor(header, text, image) {
        this.header = header;
        this.text = text;
        this.image = image;
    }
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
//                                      ''' SECTION 1 '''
let section1 = document.querySelector(".header_content")
let displayMainPage = new DisplayMainPage()
displayMainPage.section1()
//                                      ''' SECTION 2 '''
