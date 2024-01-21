let start_game = document.querySelector(".start_game")
let start_btn = document.querySelector(".start_btn")
let music1 = document.querySelector(".music1")
let music2 = document.querySelector(".music2")
let music3 = document.querySelector(".music3")
let score = document.querySelector(".score")
let time = document.querySelector(".time")
let restart = document.querySelector(".restart")
let end_game = document.querySelector(".end_game")

// Instruction page

start_btn.onclick = function () {
    start_game.style.top = '-100%'
    music1.volume = 0.1
    music1.play()
}

let innerHtml = ` <img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png" 
 style="transform: translateY(100%) !important;" class="mouse_img"/></div>`

let GameIndex = ''      // 当前地鼠处于哪个位置
let fraction = 0        // 当前得分
let timeNumber = 0      // 当前时间
let timer1 = null       // 第一个计时器
let timer2 = null       // 第一个计时器

