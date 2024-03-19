// script.js
let music1 = document.querySelector(".music1")
let music2 = document.querySelector(".music2")
let music3 = document.querySelector(".music3")

let empty = '<div><img src="image/img1.jpg"/></div>'
let show_mouse = `<img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png" 
style="transform: translateX(-37px) translateY(-90px) scale(1.8) !important;" class="mouse"/></div>`;
let render_hammer = `<img src="image/img1.jpg"/> <div class="hammer"><img src="image/hammer.png" 
style="transform: translateX(-90px) translateY(-130px) scale(2) !important;" class="hammer"/></div>`;
let show_mouse_and_hammer = `
<img src="image/img1.jpg"/>
<div class="mouse_and_hammer_together">
    <img src="image/mouse2.png" style="transform: translateX(-37px) translateY(-90px) scale(1.8) !important;" />
    <img src="image/hammer.png" style="transform: translateX(-90px) translateY(-130px) scale(2) !important;" />
</div>
`;

let pressedTime = ''
let trial_stimulus_number = '-1'
let not_hit_yet = 1
let start_game = document.querySelector(".start_game")
let mapping_1 = [0, 1, 2, 3, 4]
let mapping_2 = [0, 1, 2, 3, 4]
let mapping_3 = [0, 1, 2, 3, 4]
let current_map = mapping_1
let data = []; // data for each trial will be stored here
let score = document.querySelector(".score")
let trial = document.querySelector(".trial")
let score_number = 0
let trial_start_time = 0;
score.innerHTML = String(score_number)
trial.innerHTML = String(0)

function create_all_mappings(){
    mapping_1 = shuffleArray(mapping_1)
    mapping_2 = shuffleArray(mapping_2)
    mapping_3 = shuffleArray(mapping_3)
}

async function playMusicLoop(music) {
  // Ensure that the music can loop
  music.loop = true;
  // Set the volume of the music
  music.volume = 0.1;
  // Play the music
  music.play();
}

function redirectToSecondPage() {
    start_game.style.top = '-100%'
    playMusicLoop(music1)
    training_mapping_1()
    document.addEventListener('keydown', handleKeyPress);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function training_mapping_1() {
    context_change_into_rose()
    let stimuli = generate_stimuli();
    for (let i = 0; i < 100; i++) {
        trial_start_time = new Date().getTime();
        let this_trial_data = one_training_trial_pilot(i, stimuli);
        trial.innerHTML = String(i + 1)
        await delay(7000); // Wait for 5 seconds
        not_hit_yet = 1;
        data.push({trial_number: i, trial_data: this_trial_data, trial_start_time});
    }
}

async function one_training_trial_pilot(tri, sti) {
    let single_trial_data = []
    trial_stimulus_number = sti[tri]
    console.log('WHERE IS STI' + trial_stimulus_number)
    document.querySelector('.game' + trial_stimulus_number).innerHTML = show_mouse
    await delay(3000)
    document.querySelector('.game' + trial_stimulus_number).innerHTML = empty
    return single_trial_data
}

const handleKeyPress = (event) => {
    pressedTime = new Date().getTime();
    console.log(pressedTime)
    // Get the current time in milliseconds
    // Remove the event listener after capturing the first key press
    key_visualization(event)
};

function key_visualization(event) {
    let keyIndex = '-1'
    let keep_displaying = 0
    switch (event.key) {
        case 'h':
            keyIndex = current_map[0]
            break
        case 'u':
            keyIndex = current_map[1]
            break
        case 'i':
            keyIndex = current_map[2]
            break
        case 'l':
            keyIndex = current_map[3]
            break
        case 'b':
            keyIndex = current_map[4]
            break
    }
    console.log('what iswrong heere')
    console.log(pressedTime)
    if ((pressedTime - trial_start_time) < 3000 && not_hit_yet) {
        keep_displaying = 1;
        not_hit_yet = 0;
    }
    if (keyIndex === trial_stimulus_number && keep_displaying) {
        score_number++
        score.innerHTML = String(score_number)
        music3.play()
        let hammer_exist = document.querySelector('.hammer')
        if (hammer_exist) {
            hammer_exist.parentNode.removeChild(hammer_exist);
        }
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = show_mouse_and_hammer
        }, 1000)
    } else if (keyIndex !== '-1' && keep_displaying) {
        let hammer_exist = document.querySelector('.hammer')
        if (hammer_exist) {
            hammer_exist.parentNode.removeChild(hammer_exist);
        }
        music2.play()
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = render_hammer
        }, 1000)
    }
}

function generate_stimuli() {
    let temp = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 20; j++) {
            temp.push(i);
        }
    }
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

