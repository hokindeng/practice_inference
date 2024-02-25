// script.js


let music1 = document.querySelector(".music1")
let music2 = document.querySelector(".music2")
let music3 = document.querySelector(".music3")
let trial = document.querySelector(".trial")
let end_game = document.querySelector(".end_game")
// Begin

function redirectToSecondPage() {
    //Redirect to second_page.html
    window.location.href = "second_page.html";
    music1.volume = 0.1
    music1.play()
    one_trial()
}

// Learning

let innerHtml = ` <img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png" 
 style="transform: translateY(100%) !important;" class="mouse_img"/></div> <div class="hammer"><img src="image/hammer.png" 
 style="transform: translateY(100%) !important;" class="hammer"/></div>`

let GameIndex = ''      // 当前地鼠处于哪个位置
let fraction = 9       // 当前得分
let timeNumber = 0      // 当前时间
let timer1 = null       // 第一个计时器
let timer2 = null       // 第一个计时器

function one_trial(){
    let score = document.querySelector(".score")
    score.innerHTML = fraction
    let mouse_img = document.querySelector('.mouse_img')
    mouse_img.style.transform = 'translateY(0%)'
}