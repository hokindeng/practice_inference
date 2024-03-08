// script.js

let start_game = document.querySelector(".start_game")
let background_music = document.querySelector(".music1")
let render_hammer = `<img src="image/img1.jpg"/> <div class="hammer"><img src="image/hammer.png" 
style="transform: translateX(-70px) translateY(-100px) scale(2) !important;" class="hammer"/></div>`;
let mapping_1 = [1, 2, 3, 4, 5]
let mapping_2 = [1, 2, 3, 4, 5]
let mapping_3 = [1, 2, 3, 4, 5]
let data = []; // data for each trial will be stored here
let score = document.querySelector(".score")
let trial = document.querySelector(".trial")
let score_number = 0
score.innerHTML = String(score_number)
let trial_number = 0
trial.innerHTML = String(trial_number)

function create_all_mappings(){
    mapping_1 = shuffleArray(mapping_1)
    mapping_2 = shuffleArray(mapping_2)
    mapping_3 = shuffleArray(mapping_3)
}

function redirectToSecondPage() {
    start_game.style.top = '-100%'
    background_music.volume = 0.1
    background_music.play()
    context_change_into_rose()
    downloadArrayAsFile(data, "myData.json");
}

function training_mapping_1() {
    context_change_into_rose()
    let stimuli = generate_stimuli();
    for (let i = 0; i < 100; i++) {
        one_training_trial(trial_number, stimuli, mapping_1)
    }
}

function one_training_trial(){
    GameIndex = Math.floor(Math.random() * 9)
    document.querySelector('.game' + GameIndex).innerHTML = render_hammer
}

function generate_stimuli() {
    let temp = [0]*20 + [2]*20 + [4]*20 + [6]*20 + [8]*20
    shuffleArray(temp)
    return temp
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

function downloadArrayAsFile(array, filename) {
    // Convert the array to a string format (e.g., JSON)
    const jsonString = JSON.stringify(array);
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], {type: "application/json"});
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a temporary anchor (`a`) element
    const a = document.createElement("a");
    // Set the download attribute of the anchor to the filename
    a.download = filename;
    // Set the href of the anchor to the Blob URL
    a.href = url;
    // Append the anchor to the document body temporarily
    document.body.appendChild(a);
    // Trigger the download by simulating a click on the anchor
    a.click();
    // Clean up by removing the temporary anchor and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

