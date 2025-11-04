const words = {
    'a': ['avocado', 'apple'],
    'b': ['broccoli'],
    'c': ['carrot'],
    'd': ['durian'],
    'e': ['eggplant'],
    'f': ['fly'],
    'g': ['garlic'],
    'h': ['halloween'],
    'i': ['ice'],
    'j': ['jalapeno'],
    'k': ['kiwi'],
    'l': ['lemon'],
    'm': ['mushroom'],
    'n': ['nut'],
    'o': ['onion'],
    'p': ['peach', 'pumpkin'],
    'q': ['quince'],
    'r': ['radish'],
    's': ['strawberry'],
    't': ['tomato'],
    'u': ['umbrella'],
    'v': ['violin'],
    'w': ['watermelon'],
    'x': ['xylophone'],
    'y': ['yellow'],
    'z': ['zero'],
};

/** get DOM elements */
const result = document.getElementById("result");
const image = document.getElementById("image");
const knife = document.getElementById("knife");
const timer = document.getElementById("timer");
const saving = document.getElementById("saving");

/** audio setting */
const chop = new Audio('./sound/cut.mp3'); // chop sound
const drag = new Audio('./sound/slide.mp3'); // enter or space
const waste = new Audio('./sound/waste.mp3'); // backspace

/** initialize */
let input = '';
let currentword = '';
let save = [];

let time = 30;
let correctness = 0;
let incorrecness = 0;

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

/** move the knife */
function cut() {
    knife.classList.remove("knifeAnimation");
    void knife.offsetWidth;
    knife.classList.add("knifeAnimation");
    knife.addEventListener("animationend", () => {
        knife.classList.remove("knifeAnimation");
    }, { once: true });
}

function saveVeg() {
    drag.play();
    image.classList.remove("saveAnimation");
    void image.offsetWidth;
    image.classList.add("saveAnimation");
    image.addEventListener("animationend", () => {
        image.classList.remove("saveAnimation");
        image.src = '';
    }, { once: true });
}

function wasteVeg() {
    waste.play();
    image.classList.remove("wasteAnimation");
    void image.offsetWidth;
    image.classList.add("wasteAnimation");
    image.addEventListener('animationend', () => {
        image.classList.remove("wasteAnimation");
        image.src = '';
    }, { once: true });
}

document.addEventListener("keydown", function(e) {
    console.log("Key pressed: ", e.key);
    switch (e.key) {
        case "Backspace":
            wasteVeg();
            input = '';
            while (result.firstChild) {
                result.removeChild(result.firstChild);
            }
            break;
        case "Enter":
        case " ":
            if (input === currentword) {
                saveVeg();
                input = '';
                while (result.firstChild) {
                    result.removeChild(result.firstChild);
                }
                save.push(currentword);
                addDomElement(saving, 'p', {
                    text: currentword,
                    style: 'margin: 0;'
                });
                console.log(save);
            } else {
                cut();
                incorrecness += 1;
            }
            break;
        case "Shift":
        case "CapsLock":
        case "Control":
        case "Alt":
        case "F1":
        case "F2":
        case "F3":
        case "F4":
        case "F5":
        case "F6":
        case "F7":
        case "F8":
        case "F9":
        case "F10":
        case "F11":
        case "F12":
            break;
        default:
            if (input == '') {
                image.classList.remove("wasteAnimation");
                image.classList.remove("saveAnimation");
                const wordList = words[e.key];
                currentword = wordList[Math.floor(Math.random() * wordList.length)]; // 키값으로 단어 찾음
                console.log('currentword: ', currentword);
                image.src = './image/' + currentword + '.png';
            }
            cut();
            if (currentword.startsWith(input)) {
                if (currentword[input.length] === e.key) {
                    input = input + e.key.toLowerCase();
                    addDomElement(result, "p", { text: e.key.toLowerCase() });
                    chop.currentTime = 0;
                    chop.play();
                    correctness += 1;
                } else {
                    incorrecness += 1;
                }
            }
            console.log(input);
            break;
    }
});

const countdown = setInterval(() => {
    timer.textContent = time;
    time --;
    if (time < 0) {
        clearInterval(countdown);
        timer.textContent = 'Time over';
        if (save.length == 0) {
            save = ['null'];
        }
        sessionStorage.setItem('savingVeg', JSON.stringify(save));
        sessionStorage.setItem('correct', Math.round(correctness / (correctness + incorrecness) * 100));
        window.location.href = './result/index.html';
    }
}, 1000);

window.addEventListener("load", () => {
    sessionStorage.removeItem("savingVeg"); // 새로고침 시 자동 리셋
    sessionStorage.removeItem("correct");
});