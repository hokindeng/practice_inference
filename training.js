let start_game = document.querySelector(".start_game")
let start_btn = document.querySelector(".start_btn")
let music1 = document.querySelector(".music1")
let music2 = document.querySelector(".music2")
let music3 = document.querySelector(".music3")
let score = document.querySelector(".score")
let time = document.querySelector(".time")
let restart = document.querySelector(".restart")
let end_game = document.querySelector(".end_game")
const canvas = document.getElementById('myCanvas').style.zIndex = "10";

// Instruction page

start_btn.onclick = function () {
    start_game.style.top = '-100%'
    music1.volume = 0.1
    music1.play()
    timer()
}

let innerHtml = ` <img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png" 
 style="transform: translateY(100%) !important;" class="mouse_img"/></div>`

const ctx = canvas.getContext('2d');
let GameIndex = ''      // 当前地鼠处于哪个位置
let fraction = 0        // 当前得分
let timeNumber = 0      // 当前时间
let timer1 = null       // 第一个计时器
let timer2 = null       // 第一个计时器

drawInstructions()

// Draw the instructions on the canvas.
function drawInstructions() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Pizza Delivery Game", canvas.width / 2, canvas.height / 2 - 180);
  ctx.fillText("Your task is to deliver all pizzas as fast as possible.", canvas.width / 2, canvas.height / 2 - 130);
  ctx.fillText("The current deliver spot is marked by a pizza slice.", canvas.width / 2, canvas.height / 2 - 80);
  ctx.fillText('Move your car with "w", "s", "j", and "l" to drive to the deliver spot.', canvas.width / 2, canvas.height / 2 - 30);
  ctx.fillText("The faster you are, the higher the tip will be.", canvas.width / 2, canvas.height / 2 + 20);
  // Draw the Start Game button
  ctx.fillStyle = "lightgray";
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 120, 200, 50);
  ctx.fillStyle = "black";
  ctx.fillText("Start Game", canvas.width / 2, canvas.height / 2 + 150);
  // Draw the car and pizza images
  ctx.drawImage(carImg, canvas.width*0.05, canvas.height*0.05, canvas.height*0.14, canvas.height*0.07);
  ctx.drawImage(targetImg, canvas.width*0.9, canvas.height*0.04, canvas.height*0.1, canvas.height*0.1);
}

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
