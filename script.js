const words = {
    'a': 'avocado',
    'b': 'broccoli',
    'c': 'carrot',
    'd': 'durian',
    'e': 'eggplant',
    'f': 'fat',
    'g': 'garlic',
    'i': 'ice',
    'j': 'jalapeno',
    'l': 'lemon',
    'm': 'mushroom',
    'o': 'onion',
    'p': 'peach',
    'r': 'radish',
    't': 'tomato',
    'v': 'violin',
    'w': 'watermelon',
};

/** get DOM elements */
const result = document.getElementById("result");
const image = document.getElementById("image");

/** audio setting */
const chop = new Audio(''); // chop sound
const done = new Audio(''); // enter or space
const waste = new Audio(''); // backspace

/** initialize */
let input = '';
let currentword = '';

function addDomElement(tag, attrs) {
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
    result.appendChild(el);
    return el;
}

document.addEventListener("keydown", function(e) {
    console.log("Key pressed: ", e.key);
    switch (e.key) {
        case "Backspace":
            // 음식을 버림

            // 초기화 작업
            input = '';
            image.src = '';
            while (result.firstChild) {
                result.removeChild(result.firstChild);
            }
            break;
        case "Enter":
        case " ":
            // 완성되면 넘어감
            if (input === currentword) {
                // 초기화 작업
                input = '';
                image.src = '';
                while (result.firstChild) {
                    result.removeChild(result.firstChild);
                }
            } else {
                // 헛손질
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
                currentword = words[e.key]; // 키값으로 단어 찾음
                console.log('currentword: ', currentword);
                image.src = './image/' + currentword + '.png';
            }
            if (currentword.startsWith(input)) {
                if (currentword[input.length] === e.key) {
                    input = input + e.key.toLowerCase();
                    addDomElement("span", { text: e.key.toLowerCase() });
                    // sound play
                } else {
                    // 헛손질
                }
            }
            console.log(input);
            break;
    }
});