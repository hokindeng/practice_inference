let start_game = document.querySelector(".start_game")
let start_btn = document.querySelector(".start_btn")
let music1 = document.querySelector(".music1")
let music2 = document.querySelector(".music2")
let music3 = document.querySelector(".music3")
let score = document.querySelector(".score")
let time = document.querySelector(".time")
let restart = document.querySelector(".restart")
let end_game = document.querySelector(".end_game")

let innerHtml = ` <img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png" 
 style="transform: translateY(100%) !important;" class="mouse_img"/></div>`

// Corrected canvas initialization
let canvas = document.getElementById('myCanvas');
canvas.style.zIndex = "100";
const ctx = canvas.getContext('2d');

// Circle properties
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 1000; // Adjust the size of the circle

// Draw a black circle
ctx.beginPath(); // Start a new path
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false); // Create a circle
ctx.fillStyle = 'black'; // Set the fill color
ctx.fill(); // Fill the circle

// Instruction page

start_btn.onclick = function () {
    start_game.style.top = '-100%'
    music1.volume = 0.1
    music1.play()
}

let GameIndex = ''      // 当前地鼠处于哪个位置
let fraction = 0        // 当前得分
let timeNumber = 0      // 当前时间
let timer1 = null       // 第一个计时器
let timer2 = null       // 第一个计时器

function timer() {
    timer1 = setInterval(function () {
        timeNumber = timeNumber + 1
        time.innerHTML = '00 : ' + (timeNumber < 10 ? '0' + timeNumber : timeNumber)
        if(timeNumber >= 60){
            // 游戏结束
            let game_score_number = document.querySelector(".game_score_number")
            game_score_number.innerHTML = fraction
            end_game.style.top = 0
            // 清除定时器
            clearTimeout(timer1)
            clearTimeout(timer2)
            music1.pause()
            music2.pause()
            music3.pause()
        }
    },1000)
    timer2 = setInterval(function () {
        // 获取随机出现的位置
        GameIndex = Math.floor(Math.random() * 9)
        document.querySelector('.game' + GameIndex).innerHTML = innerHtml
        setTimeout(function () {
            let mouse_img = document.querySelector('.mouse_img')
            mouse_img.style.transform = 'translateY(0%)'
        }, 20)
        // 经过两秒钟后将位置隐藏，因为需要500毫秒的动画执行因此经过500毫秒后删除
        setTimeout(function () {
            let mouse_img = document.querySelector('.mouse_img')
            if (mouse_img) {
                mouse_img.style.transform = 'translateY(100%)'
            } else {
                return
            }
            setTimeout(function () {
                let mouse = document.querySelector('.mouse')
                // 获取随机值 让其随机出现
                // 先删除叜出现
                if (mouse) {
                    // 删除时要把 上一次的位置清空 不然按下依然会积分
                    GameIndex = ''
                    mouse.parentNode.removeChild(mouse);
                }
            }, 500)
        }, 2000)
    }, 3000)
}
