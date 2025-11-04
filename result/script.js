if (!sessionStorage.getItem('savingVeg')) {
    window.location.href = '../index.html';
}

const body = document.getElementById("body");
const accuracy = document.getElementById('accuracy');
const images = document.getElementById('images');
const ingredient = document.getElementById("saving");
const button = document.getElementById("retry");
const result = document.getElementById("result");

const saving = JSON.parse(sessionStorage.getItem('savingVeg'));
const correctness = sessionStorage.getItem('correct');

if (saving.length == 0) {
    window.location.href = '../index.html';
}

console.log(saving);
console.log(correctness);
accuracy.textContent = 'accuracy: ' + correctness + '%';

const vE = new Audio('../sound/violin_e.mp3');
const vGb = new Audio('../sound/violin_gb.mp3');
const vAb = new Audio('../sound/violin_ab.mp3');
const vA = new Audio('../sound/violin_a.mp3');
const vB = new Audio('../sound/violin_b.mp3');
const vDED = new Audio('../sound/violin_ded.mp3');
const vB1 = new Audio('../sound/violin_b1.mp3');
const vnotes = [
    vE, vGb, vAb, vA, vB, vB1
];

const xC = new Audio('../sound/xylophone_c.mp3');
const xD = new Audio('../sound/xylophone_d.mp3');
const xE = new Audio('../sound/xylophone_e.mp3');
const xF = new Audio('../sound/xylophone_f.mp3');
const xG = new Audio('../sound/xylophone_g.mp3');
const xA = new Audio('../sound/xylophone_a.mp3');
const xB = new Audio('../sound/xylophone_b.mp3');
const xnotes = [
    xA, xB, xC, xD, xE, xF, xG
];

const halloween = new Audio('../sound/halloween.mp3');
const rain = new Audio('../sound/rain.mp3');

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

/** effects function */
function halloweenEffect() {
    console.log('this is halloween!');
    addDomElement(body, 'img', {
        src: '../image/bat.png',
        id: 'bats',
    });
    const bats = document.getElementById('bats');
    bats.addEventListener('animationend', () => {
        bats.remove();
    });
}

function batEffect() {
    console.log('bat flies');
    addDomElement(body, 'img', {
        src: '../image/bat.png',
        id: 'bat',
        key: (Math.random() * 100).toString(),
        style: `position: fixed; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; width: 160px;`,
    });
    const bat = document.getElementById('bat');
    bat.addEventListener('animationend', () => {
        console.log('remove');
        bat.remove();
    });
}

function violinEffect() {
    console.log('violin');
    addDomElement(body, 'img', {
        src: '../image/note.png',
        id: 'note',
        key: (Math.random() * 100).toString(),
        style: `position: fixed; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; width: 50px;`,
    });

    const sound = vnotes[Math.floor(Math.random() * vnotes.length)];
    sound.currentTime = 0;
    sound.play();

    const note = document.getElementById('note');
    note.addEventListener('animationend', () => {
        note.remove();
    });
}

function xylophoneEffect() {
    console.log('xylophone');
    addDomElement(body, 'img', {
        src: '../image/note.png',
        id: 'note',
        key: (Math.random() * 100).toString(),
        style: `position: fixed; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; width: 50px;`,
    });

    const sound = xnotes[Math.floor(Math.random() * xnotes.length)];
    sound.currentTime = 0;
    sound.play();

    const note = document.getElementById('note');
    note.addEventListener('animationend', () => {
        note.remove();
    });
}

function rainEffect() {
    rain.currentTime = 0;
    rain.play();
}

/** Make a title */
let prefix = 'A ';
let title = 'sandwich';
let suffix = '';

if (saving.includes('null')) {
    prefix = 'Just ';
    title = 'bread';

    let pos = 36;
    images.style.height = `${pos + 400}px`;
    addDomElement(images, 'img', {
        src: '../image/bread.png',
        style: `width: 540px; position: absolute; top: ${pos}px; left: 50%; transform: translate(-50%, 2%)`,
    });
    pos -= 36;
    addDomElement(images, 'img', {
        src: '../image/bread.png',
        style: `width: 540px; position: absolute; top: ${pos}px; left: 50%; transform: translate(-50%, 2%);`,
    });
    addDomElement(ingredient, 'p', {
        text: 'Only Bread',
        style: `font-size: 20px; margin: 0px;`
    });
    accuracy.textContent = 'accuracy: ??';

} else {
    const notVeg = [
        'ice',
        'violin',
        'xylophone',
        'halloween',
        'umbrella',
        'yellow',
        'zero'
    ];

    if (saving.includes('ice')) {
        prefix += 'cool ';
    }

    if (saving.includes('violin')) {
        prefix += 'classical ';
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

    if (saving.includes('yellow')) {
        prefix += 'yellow ';
    }

    if (saving.includes('umbrella')) {
        suffix += ' in rainy day';
        flag.push('umbrella');
    }

    if (saving.includes('zero')) {
        suffix += ' for @myhomework.zer0';
        addDomElement(body, 'button', {
            text: 'visit',
            id: 'instagram'
        });

        const visitBtn = document.getElementById('instagram');
        visitBtn.addEventListener('click', () => {
            window.location.href =
                'https://instagram.com/myhomework.zer0/';
        })
    }

    const realIngr = saving.filter((v) => !notVeg.includes(v));
    console.log(realIngr);

    const h = 36;
    const elems = 2 + realIngr.length - 1;
    let pos = elems * h;
    images.style.height = `${pos + 400}px`;

    addDomElement(images, 'img', {
        src: '../image/bread.png',
        style: `width: 540px; position: absolute; top: ${pos}px; left: 50%; transform: translate(-50%, 2%)`,
    });

    pos -= h;

    for (let v of realIngr) {
        addDomElement(images, 'img', {
            src: `../image/${v}.png`,
            style: `width: 480px; height: 480px; object-fit: cover; position: absolute; top: ${pos}px; left: 50%; transform-origin: 50% 50%; transform: translate(-55%, -14%) skewX(10deg) rotate(15deg);`,
        });
        
        pos -= h;
    }

    addDomElement(images, 'img', {
        src: '../image/bread.png',
        style: `width: 540px; position: absolute; top: ${pos}px; left: 50%; transform: translate(-50%, 2%);`,
    });

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

result.textContent = prefix + title + suffix;

if (flag.includes('halloween')) {
    console.log('This is halloween, ');
    halloweenEffect();
}

document.addEventListener('keydown', (e) => {
    if (flag.includes('halloween')) {
        batEffect();
        if (halloween.currentTime == 0) {
            halloween.play();
            console.log('halloween!');
        }
    } else {
        if (flag.includes('umbrella')) {
            rainEffect();
        }
        if (flag.includes('violin')) {
            violinEffect();
        }
        if (flag.includes('xylophone')) {
            xylophoneEffect();
        }
    }
});

/** button onclick */
button.addEventListener('click', () => {
    sessionStorage.removeItem('savingVeg');
    sessionStorage.removeItem('correct');
    window.location.href = '../index.html';
});