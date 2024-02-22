// script.js

function redirectToSecondPage() {
    // Redirect to second_page.html
    window.location.href = "second_page.html";
}

// generate local mapping
num_symb = 5
key_list = ["h", "u", "i", "l",'space'];
x_symb = [0, 1, 2, 3, 4];  // 5 stimuli indexed as 0:4; response key is always indexed as 0:4
symb_perm = permute(x_symb); // permutation
symb_map_rnd = Math.floor(rng * symb_perm.length) // choose a random permutation from symb_perm
symb_map_ind = symb_perm[symb_map_rnd];  // re-arrange symb index based on selected permutation
for (var i = 0, _pj_a = num_symb; (i < _pj_a); i += 1) {
symb_map.push(symb[symb_map_ind[i]]);
}
// this re-arranged symb: [s2, 24, 23, s1, s7 ...]; response key index does not change still 1:8; so mapping changes
// so now, symb_map is a list of only 8 elements;
// form a list of 96 elements 8*16 and randomize it; this would be the sequential of trial of a block

// to determine whether the response is correct for each trial
actual_choice = key_list.indexOf(actual_press);
propose_choice = symb_map_push(i)
//check if actual_choice == propose_choice

function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}