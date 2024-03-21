// script.js
let music1 = document.querySelector(".music1")
let music2 = document.querySelector(".music2")
let music3 = document.querySelector(".music3")
let element = document.querySelector('.context_cue');
let number_of_trial = 10
let each_trial_time = 5000
let marmot_show_time = 3000
let set_of_stimuli = 20
let trials_of_inference_block = 150
let min_trial_number_in_a_inference_block = 6
let max_trial_number_in_a_inference_block = 12
let number_of_inference_stimuli_mappings = 15
let hammer_show_time = marmot_show_time / 2
let not_hit_yet = 1 // this is to only allow one hit
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
let start_game = document.querySelector(".start_game")
let mapping_1 = [0, 1, 2, 3, 4]
let mapping_2 = [0, 1, 2, 3, 4]
let mapping_3 = [0, 1, 2, 3, 4]
create_all_mappings()
console.log('MAPP1',mapping_1)
console.log('MAPP2',mapping_2)
console.log('MAPP3',mapping_3)

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
    run_experiment()
    document.addEventListener('keydown', handleKeyPress);
}

async function run_experiment() {
    //await training_mapping_1()
    //await training_mapping_2()
    //await training_mapping_3()
    await entering_inference()
    await training_inference()
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function training_mapping_1() {
    context_change_into_rose()
    let stimuli = generate_stimuli(set_of_stimuli);
    for (let i = 0; i < number_of_trial; i++) {
        trial_start_time = new Date().getTime();
        let this_trial_data = one_training_trial_pilot(i, stimuli);
        trial.innerHTML = String(i + 1)
        await delay(each_trial_time); // Wait for 5 seconds
        not_hit_yet = 1;
        data.push({trial_number: i, trial_data: this_trial_data, trial_start: trial_start_time});
    }
}

async function training_mapping_2() {
    current_map = mapping_2
    context_change_into_blue()
    let stimuli = generate_stimuli(set_of_stimuli);
    for (let i = 0; i < number_of_trial; i++) {
        trial_start_time = new Date().getTime();
        let this_trial_data = one_training_trial_pilot(i, stimuli);
        trial.innerHTML = String(i + 1)
        await delay(each_trial_time); // Wait for 5 seconds
        not_hit_yet = 1;
        data.push({trial_number: i, trial_data: this_trial_data, trial_start: trial_start_time});
    }
}

async function training_mapping_3() {
    current_map = mapping_3
    context_change_into_purple()
    let stimuli = generate_stimuli(set_of_stimuli);
    for (let i = 0; i < number_of_trial; i++) {
        trial_start_time = new Date().getTime();
        let this_trial_data = one_training_trial_pilot(i, stimuli);
        trial.innerHTML = String(i + 1)
        await delay(each_trial_time); // Wait for 5 seconds
        not_hit_yet = 1;
        data.push({trial_number: i, trial_data: this_trial_data, trial_start: trial_start_time});
    }
}

async function one_training_trial_pilot(tri, sti) {
    let single_trial_data = []
    trial_stimulus_number = sti[tri]
    console.log('WHERE IS STI' + trial_stimulus_number)
    document.querySelector('.game' + trial_stimulus_number).innerHTML = show_mouse
    await delay(marmot_show_time)
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
    console.log('what is wrong here')
    console.log(pressedTime)
    if ((pressedTime - trial_start_time) < marmot_show_time && not_hit_yet) {
        keep_displaying = 1;
        not_hit_yet = 0;
    }
    if (keyIndex === trial_stimulus_number && keep_displaying) {
        score_number++
        score.innerHTML = String(score_number)
        music3.play()
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = show_mouse_and_hammer
        }, 3)
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = empty
        }, 3 + hammer_show_time)
    } else if (keyIndex !== '-1' && keep_displaying) {
        music2.play()
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = render_hammer
        }, 3)
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = empty
        }, 3 + hammer_show_time)
    }
}

function generate_stimuli(set_of_stimuli) {
    let temp = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < set_of_stimuli; j++) {
            temp.push(i);
        }
    }
    shuffleArray(temp)
    return temp
}

function generate_stimuli_for_inference_block(num_of_stimuli) {
    let n_of_sets = Math.floor(num_of_stimuli / 5);
    let temp = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < n_of_sets + 1; j++) { // you need one more set to actually cover all
            temp.push(i);
        }
    }
    shuffleArray(temp)
    let new_Arr;
    new_Arr = temp.slice(0, num_of_stimuli);
    return new_Arr
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
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_rose');
    } else {
        console.log('NOT EXIST AT ALL')
    }
}

function context_change_into_blue(){
    if (element) {
        element.classList.remove('context_cue_rose');
        element.classList.add('context_cue_blue');
    } else {
        console.log('NOT EXIST AT ALL')
    }
}

function context_change_into_purple(){
    if (element) {
        element.classList.remove('context_cue_blue');
        element.classList.add('context_cue_purple');
    } else {
        console.log('NOT EXIST AT ALL')
    }
}

async function entering_inference(){
    show_inference_Image()
    await delay(10000)
    context_entering_inference_block_make_null()
}

function context_entering_inference_block_make_null(){
    if (element) {
        element.classList.remove('context_cue_purple');
        element.classList.add('context');
    } else {
        console.log('NOT EXIST AT ALL')
    }
}

async function training_inference() {
    let inference_trial_display_number = 1;
    for (let inference_index = 0; inference_index < inference_stimuli_sequence.length; inference_index++) {
        console.log('inference_stimuli_sequence', inference_stimuli_sequence)
        console.log('inference_index', inference_index)
        current_map = getCurrentMapping(inference_stimuli_sequence[inference_index])
        let num_of_trials_in_this_block = array_or_number_of_training_trials_in_each_inference_mapping[inference_index]
        let stimuli_sequence_at_this_block = generate_stimuli_for_inference_block(num_of_trials_in_this_block)
        // go into the inference block
        console.log('num_of_trials_in_this_block', num_of_trials_in_this_block)
        for (let j = 0; j < num_of_trials_in_this_block; j++){
            console.log('J', j)
            console.log('used mapping in this trial' + current_map + 'WEIRD')
            trial_start_time = new Date().getTime();
            let this_trial_data = one_training_trial_pilot(j, stimuli_sequence_at_this_block);
            trial.innerHTML = String(inference_trial_display_number)
            inference_trial_display_number = inference_trial_display_number + 1;
            await delay(each_trial_time); // Wait for 5 seconds
            not_hit_yet = 1;
            data.push({trial_number: inference_index, trial_data: this_trial_data, trial_start: trial_start_time});
        }
    }
}

let inference_stimuli_sequence = generateValidInferenceSequence(number_of_inference_stimuli_mappings)
console.log(inference_stimuli_sequence)
let array_or_number_of_training_trials_in_each_inference_mapping = distributeApples(number_of_inference_stimuli_mappings,
    trials_of_inference_block, min_trial_number_in_a_inference_block, max_trial_number_in_a_inference_block)
console.log(array_or_number_of_training_trials_in_each_inference_mapping)

function distributeApples(bagCount, totalApples, minApples, maxApples) {
    let bags = new Array(bagCount).fill(minApples); // Step 1
    let remainingApples = totalApples - bagCount * minApples; // Initially 60 in this case
    // Randomly distribute the remaining apples
    while (remainingApples > 0) {
        for (let i = 0; i < bagCount && remainingApples > 0; i++) {
            // Determine the max number that can be added to this bag
            let maxToAdd = Math.min(maxApples - bags[i], remainingApples);
            if (maxToAdd > 0) {
                let add = Math.floor(Math.random() * maxToAdd) + 1;
                bags[i] += add;
                remainingApples -= add;
            }
        }
    }
    let currentTotal = bags.reduce((acc, val) => acc + val, 0);
    if (currentTotal !== totalApples) {
        console.error("Total apples mismatch. Adjust the distribution logic.");
    }
    return bags;
}

function isValidSequence(sequence) {
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] === sequence[i - 1]) {
            return false;
        }
    }
    return true;
}

function generateValidInferenceSequence(n) {
    if (n % 3 !== 0) throw new Error("n must be divisible by 3.");
    // Initialize the sequence with equal numbers of 1, 2, and 3.
    let sequence = Array.from({ length: n }, (_, index) => 1 + index % 3);
    // Shuffle until the sequence is valid (no consecutive numbers are the same).
    do {
        shuffleArray(sequence);
    } while (!isValidSequence(sequence));
    return sequence;
}

function getCurrentMapping(i) {
    let selectedMapping;
    if (i === 1) {
        selectedMapping = mapping_1;
    } else if (i === 2) {
        selectedMapping = mapping_2;
    } else if (i === 3) {
        selectedMapping = mapping_3;
    } else {
        selectedMapping = null; // Or any default value you prefer
    }
    return selectedMapping;
}

// Example usage
console.log(getCurrentMapping(1)); // This will print mapping_1
console.log(getCurrentMapping(2)); // This will print mapping_2
console.log(getCurrentMapping(3)); // This will print null or your defined default value

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

// Function to show inference image
function show_inference_Image() {
  // Get the image container
  const container = document.getElementById('inference-image-container');

  // Create an image element
  const img = document.createElement('img');
  img.src = 'image/to_start_inference_block.jpg'; // The relative path to your local image
  img.alt = 'inference instruction'; // Alternative text for the image

  // Add the image to the container
  container.appendChild(img);

  // Remove the image after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    img.remove();
  }, 8000);
}


