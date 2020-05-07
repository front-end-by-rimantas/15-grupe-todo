"use strict";

// 1.
const mygtukai = document.querySelectorAll('.btn');

// 2.
for ( let k=0; k<mygtukai.length; k++ ) {
    mygtukai[k].addEventListener('click', paspaudimas);
}

// 3.
let paspaudimuKiekis = Array(mygtukai.length).fill(0);

function paspaudimas( event ) {
    const paspaustasElementas = event.target;
    const duomenys = paspaustasElementas.dataset;
    const index = parseInt(duomenys.number);
    
    paspaudimuKiekis[index - 1]++;
    console.log(paspaudimuKiekis);
    
    return console.log(`Paspaustas ${index}: ${paspaudimuKiekis[index - 1]} kartu.`);
}


console.log(paspaudimuKiekis);
