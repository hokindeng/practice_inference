// script.js

let start_game = document.querySelector(".start_game")
let background_music = document.querySelector(".music1")


// let innerHtml = ` <img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png"
// style="transform: translateY(100%) !important;" class="mouse_img"/></div> <div class="hammer"><img src="image/hammer.png"
// style="transform: translateY(100%) !important;" class="hammer"/></div>`

function redirectToSecondPage() {
    start_game.style.top = '-100%'
    background_music.volume = 0.1
    background_music.play()
    one_trial()
}

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