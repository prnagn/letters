const words = {
    'a': 'avocado',
    'b': 'broccoli',
    'c': 'carrot',
    'd': 'durian',
    'e': 'eggplant',
    'f': 'fly',
    'g': 'garlic',
    'h': 'halloween',
    'i': 'ice',
    'j': 'jalapeno',
    'l': 'lemon',
    'm': 'mushroom',
    'n': 'nut',
    'o': 'onion',
    'p': 'peach',
    'q': 'quince',
    'r': 'radish',
    's': 'strawberry',
    't': 'tomato',
    'u': 'umbrella',
    'v': 'violin',
    'w': 'watermelon',
    'x': 'xylophone',
    'y': 'yee',
    'z': 'zero',
};

/** get DOM elements */
const result = document.getElementById("result");
const image = document.getElementById("image");
const knife = document.getElementById("knife");
const saving = document.getElementById("saving");

/** audio setting */
// const chop = new Audio(''); // chop sound
// const drag = new Audio(''); // enter or space
// const waste = new Audio(''); // backspace

/** initialize */
let input = '';
let currentword = '';
let save = {}

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

document.addEventListener("keydown", function(e) {
    console.log("Key pressed: ", e.key);
    switch (e.key) {
        case "Backspace":
            // 음식을 버림
            // waste.play();

            input = '';
            image.src = '';
            while (result.firstChild) {
                result.removeChild(result.firstChild);
            }
            break;
        case "Enter":
        case " ":
            if (input === currentword) {
                input = '';
                image.src = '';
                while (result.firstChild) {
                    result.removeChild(result.firstChild);
                }
                // drag.play();
                if (currentword in save) {
                    save[currentword] = save[currentword] + 1;
                } else {
                    save[currentword] = 1;
                }
                addDomElement(saving, 'p', {text: currentword});
                console.log(save);
            } else {
                cut();
                // 헛손질
            }
            break;
        case "Shift":
        case "CapsLock":
            break;
        case "Control":
            window.location.href = './result/index.html';
            break;
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
                currentword = words[e.key]; // 키값으로 단어 찾음
                console.log('currentword: ', currentword);
                image.src = './image/' + currentword + '.png';
            }

            cut();
            if (currentword.startsWith(input)) {
                if (currentword[input.length] === e.key) {
                    input = input + e.key.toLowerCase();
                    addDomElement(result, "p", { text: e.key.toLowerCase() });
                    // chop.play();
                } // 헛손질은 아무 일도 일어나지 않는것인가
            }
            console.log(input);
            break;
    }
});