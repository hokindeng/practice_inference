// script.js

const fs = require('fs');

// Create a new directory named 'newFolder'
const folderName = './newFolder';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log('Directory created successfully');
  } else {
    console.log('Directory already exists');
  }
} catch (err) {
  console.error(err);
}

function save_local_mapping() {
// Base set of items
  const items = [0, 1, 2, 3, 4];

// Generate all permutations of the items
  const allPermutations = generatePermutations(items);

// Select the first 3 unique permutations for our mappings
  const mappings = allPermutations.slice(0, 3);

// Save the mappings to a local file
  saveMappings(mappings);
}

function generatePermutations(array) {
    let result = [];

    function permute(arr, m = []) {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    }

    permute(array);
    return result;
}

function saveMappings(mappings) {
    const fileName = "mappings.txt";
    const json = JSON.stringify(mappings, null, 2);
    const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function redirectToSecondPage() {
    // Redirect to second_page.html
    save_local_mapping();
    window.location.href = "second_page.html";
}