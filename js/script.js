// 1º ENIGMA

var plainAlphabet = "abcdefghijklmnopqrstuvwxyz:()!¡,'";
var encryptedAlphabet = "qw,ert(yuio'pa:sdfg!hjklz¡xcv)bnm";

let unencryptedText;
let encryptedText;
let letter;

// ---------- Encrypt ----------

var encrypt = () => {
    unencryptedText = document.getElementById('textDecrypt').value;
    encryptedText = '';
    letter;

    for (var iText = 0; iText < unencryptedText.length; iText++) {

        if (unencryptedText[iText] == ' ') {
            encryptedText += ' ';
        }

        for (var i = 0; i < plainAlphabet.length; i++) {

            if (plainAlphabet[i] == unencryptedText[iText]) {

                letter = encryptedAlphabet[i];

                encryptedText += letter;
            }
        }
    }
    document.getElementById('textEncrypt').value = encryptedText;
}

// ---------- Decrypt ----------

var decrypt = () => {
    unencryptedText = '';
    encryptedText = document.getElementById('textEncrypt').value;
    letter;

    for (var iText = 0; iText < encryptedText.length; iText++) {

        if (encryptedText[iText] == ' ') {
            unencryptedText += ' ';
        }

        for (var i = 0; i < encryptedAlphabet.length; i++) {

            if (encryptedAlphabet[i] == encryptedText[iText]) {

                letter = plainAlphabet[i];

                unencryptedText += letter;
            }
        }
    }
    document.getElementById('textDecrypt').value = unencryptedText;
}

// ---------- Buttons ----------

document.getElementById('buttonEncrypt').addEventListener('click', encrypt);
document.getElementById('buttonDecrypt').addEventListener('click', decrypt);


// 2º GENERADOR ALEATORIO

const numberArray = [];
let aux = [];

// ---------- Generate numbers ----------

var randomPick = (n, min, max) => {
    const random = (max - min) + 1;

    for (let i = 0; i < n; i++) {
        let numberRandom = Math.floor((Math.random() * random) + min);
        numberArray.push(numberRandom);

    }
}

// ---------- Search repeating numbers----------

var searchRepeat = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {

                let count = 0;

                for (let k = 0; k < aux.length; k++) {
                    if(aux[k] === array[i]) {
                        count++;
                    }
                }

                if (count == 0) {
                    aux.push(array[i]);
                }
            }
        }
    }
    return aux;
}

// ---------- Delete repeating numbers ----------

var removeRepeats = (array, aux) => {
    for (let j = 0; j < aux.length; j++) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == aux[j]) {
                array.splice(i, 1);
            }
        }
    }
    aux.splice(0, aux.length);
}

// ---------- Replace deleted numbers ----------

var completeArray = (array, n, min, max) => {

    const random = (max - min) + 1;

    while (array.length != n) {
        let numberRandom = Math.floor((Math.random() * random) + min);
        numberArray.push(numberRandom);
    }
}

// ---------- Check if they happen again ----------

var bucle = (array, aux, n, min, max) => {
    removeRepeats(array, aux);
    completeArray (array, n, min, max);
    searchRepeat(array);
}

// ---------- Algorithm ----------

var algorithm = (array, aux, n, min, max) =>{
    randomPick(n, min, max);
    searchRepeat(array);
    removeRepeats(array, aux);
    completeArray (array, n, min, max);
    searchRepeat(array)

    while (aux.length != 0) {
        bucle(array, aux, n, min, max);
    }
}

// ---------- Call function ----------

algorithm(numberArray, aux, 10, 1, 100);

console.log (`Array de 10 números entre 1 y 100 sin repetir: "${numberArray}"`);