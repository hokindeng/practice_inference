// script.js

let start_game = document.querySelector(".start_game")
let background_music = document.querySelector(".music1")


let render_hammer = `<img src="image/img1.jpg"/> <div class="hammer"><img src="image/hammer.png" 
style="transform: translateX(-70px) translateY(-100px) scale(2) !important;" class="hammer"/>
<img src="image/empty_circle.png" style="transform:  translateX(-30px) translateY(-180px) scale(.6)"/></div>`;

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
    GameIndex = Math.floor(Math.random() * 9)
    document.querySelector('.game' + GameIndex).innerHTML = render_hammer
}