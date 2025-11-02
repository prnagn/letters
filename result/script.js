if (!sessionStorage.getItem('savingVeg')) {
    window.location.href = '../index.html';
}

const saving = JSON.parse(sessionStorage.getItem('savingVeg'));
const correctness = sessionStorage.getItem('correct');

console.log(saving);
console.log(correctness);

const ingredient = document.getElementById("saving");
const button = document.getElementById("retry");
const result = document.getElementById("result");

let ingr = {};

/** add DOM elements */
function addDomElement(parent, tag, attrs) {
    const el = document.createElement(tag);
    if (attrs) {
        for (const k in attrs) {
            if (k === "text") {
                el.textContent = attrs[k];
            } else {
                el.setAttribute(k, attrs[k]);
            }
        }
    }
    parent.appendChild(el);
    return el;
}

/** Make a title */
let prefix = 'A ';
let title = 'sandwich';
let suffix = '';

if (saving.includes('null')) {
    result.textContent = "Just bread";
} else {
    if (saving.includes('ice')) {
        prefix += 'cool ';
    }

    if (saving.includes('violin') || saving.includes('xylophone')) {
        prefix += 'melodious ';
    }

    if (saving.includes('halloween')) {
        prefix += 'trick or treat ';
        title = 'sandwitch'
        if (saving.includes('garlic')) {
            suffix += " repeling vampires"
        }
    }

    if (saving.includes('umbrella')) {
        suffix += ' in rainy day';
    }

    result.textContent = prefix + title + suffix;

    for (let v of saving) {
        if (v in ingr) {
            ingr[v] += 1;
        } else {
            ingr[v] = 1;
        }
    }

    for (let obj in ingr) {
        const size = 16 + ingr[obj] * 2;
        addDomElement(ingredient, 'p', {
            text: obj,
            style: `font-size: ${size}px; margin: 0px;` });
    }
}

/** button onclick */
button.addEventListener('click', () => {
    sessionStorage.removeItem('savingVeg');
    sessionStorage.removeItem('correct');
    window.location.href = '../index.html';
});