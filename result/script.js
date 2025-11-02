if (!sessionStorage.getItem('savingVeg')) {
    window.location.href = '../index.html';
}

const body = document.getElementById("body");
const ingredient = document.getElementById("saving");
const button = document.getElementById("retry");
const result = document.getElementById("result");
const accuracy = document.getElementById('accuracy');

const saving = JSON.parse(sessionStorage.getItem('savingVeg'));
const correctness = sessionStorage.getItem('correct');

console.log(saving);
console.log(correctness);
accuracy.textContent = 'accuracy: ' + correctness + '%';

// const xylophone = new Audio('');
// const violin = new Audio('');
const halloween = new Audio('../sound/halloween.mp3');

let ingr = {};
let flag = [];

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

function curtainEffect() {

}

function halloweenEffect() {
    console.log('this is halloween!');
    halloween.play();
    // 애니메이션을넣어
}

function rainEffect() {

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

    if (saving.includes('violin')) {
        prefix += 'melodious ';
        flag.push('violin');
    }

    if (saving.includes('xylophone')) {
        prefix += 'melodious ';
        flag.push('xylophone');
    }

    if (saving.includes('halloween')) {
        prefix += 'trick or treat ';
        title = 'sandwitch'
        if (saving.includes('garlic')) {
            suffix += " repeling vampires"
        }
        flag.push('halloween');
    }

    if (saving.includes('umbrella')) {
        suffix += ' in rainy day';
        flag.push('umbrella');
    }

    if (saving.includes('zero')) {
        suffix += ' for @i_zer0_swimming_';
        addDomElement(body, 'button', {
            text: 'visit',
            id: 'instagram'
        });

        const visitBtn = document.getElementById('instagram');
        visitBtn.addEventListener('click', () => {
            window.location.href = 'https://instagram.com/i_zer0_swimming_/';
        })
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
        const size = 16 + ingr[obj] * 4;
        addDomElement(ingredient, 'p', {
            text: obj,
            style: `font-size: ${size}px; margin: 0px;` });
    }
}


document.addEventListener('keydown', (e) => {
    curtainEffect();
    if (flag.includes('halloween')) {
        console.log('This is halloween, ');
        halloweenEffect();
    } else {
        if (flag.includes('umbrella')) {
            rainEffect();
        }
        if (flag.includes('violin')) {
            // violin.play();
        }
        if (flag.includes('xylophone')) {
            // xylophone.play();
        }
    }
});


/** button onclick */
button.addEventListener('click', () => {
    sessionStorage.removeItem('savingVeg');
    sessionStorage.removeItem('correct');
    window.location.href = '../index.html';
});