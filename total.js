// script.js

let start_game = document.querySelector(".start_game")
let background_music = document.querySelector(".music1")
let render_hammer = `<img src="image/img1.jpg"/> <div class="hammer"><img src="image/hammer.png" 
style="transform: translateX(-70px) translateY(-100px) scale(2) !important;" class="hammer"/></div>`;
let mapping_1 = [1, 2, 3, 4, 5]
let mapping_2 = [1, 2, 3, 4, 5]
let mapping_3 = [1, 2, 3, 4, 5]

function create_all_mappings(){
    mapping_1 = shuffleArray(mapping_1)
    mapping_2 = shuffleArray(mapping_2)
    mapping_3 = shuffleArray(mapping_3)
}

function redirectToSecondPage() {
    start_game.style.top = '-100%'
    background_music.volume = 0.1
    background_music.play()
    one_trial()
    context_change_into_rose()
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

// Initialize the array with numbers 1 to 5
let numbers = [1, 2, 3, 4, 5];
// Shuffle the array to get a random order
shuffleArray(numbers);
// Log the shuffled array to the console
console.log(numbers);


let GameIndex = ''      // 当前地鼠处于哪个位置
let fraction = 9       // 当前得分
let timeNumber = 0      // 当前时间
let timer1 = null       // 第一个计时器
let timer2 = null       // 第一个计时器

function one_trial(){
    GameIndex = Math.floor(Math.random() * 9)
    document.querySelector('.game' + GameIndex).innerHTML = render_hammer
}

function context_change_into_rose(){
    let element = document.querySelector('.context_cue');
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_rose');
    }
}

function context_change_into_blue(){
    let element = document.querySelector('.context_cue');
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_blue');
    }
}

function context_change_into_purple(){
    let element = document.querySelector('.context_cue');
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_purple');
    }
}