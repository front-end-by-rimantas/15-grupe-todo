"use strict";

/*
TIKSLAS: Jei norime stebeti paspaudimus ant elemento ir reikia atspausdinti jo tekstini turini

1. Susirasti dominanti elementa
2. Inicijuoti ivykio stebejima, duodami nuoroda i funkcija, kuria reikia iskviesti vykdyti
3. Nurodyti ka daryti, kai ivyks stebimas ivykis ant norimo elemento

*/

// 1.
const pirmas = document.querySelector('.btn.pirmas');
const antras = document.querySelector('.btn.antras');

// 2.
pirmas.addEventListener('click', pirmosiosVeiksmas);
antras.addEventListener('click', antrosiosVeiksmas)

// 3.
let pirmojiKartai = 0;
function pirmosiosVeiksmas() {
    pirmojiKartai++;
    return console.log('Pirmasis buvo paspaustas:', pirmojiKartai);
}

let antrosiosPaspaudimuKiekis = 0;
function antrosiosVeiksmas() {
    antrosiosPaspaudimuKiekis++;
    return console.log('Antra:', antrosiosPaspaudimuKiekis);
}