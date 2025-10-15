/** useState같은 놈 */
function createState(initialState) {
    let state = initialState;
    const listeners = [];
  
    const get = () => state;
    const set = (updater) => {
        // 부분 업데이트 지원 (React의 setState처럼)
        const nextState = typeof updater === 'function' ? updater(state) : updater;
        state = { ...state, ...nextState };
        listeners.forEach(fn => fn(state));
    };
    const subscribe = (fn) => listeners.push(fn);
  
    return [get, set, subscribe];
}

/** 초기화 */
const words = ["avocado", "banana", "cherry", "durian"];
const [getState, setState, onStateChange] = createState({
    currentWordIndex: 0,
    typed: "",
});

/** DOM 요소 어쩌구 */
const input = document.getElementById("textInput");
const currentWord = document.getElementById("currentWord");

/** 렌더링... 인데 그림으로 어케 수정함묘 */
onStateChange((state) => {
    const target = words[state.currentWordIndex];
    currentWord.textContent = `목표 단어: ${target}`;

    if (target.startsWith(state.typed)) {
        /** 맞았을 때: 제대로 썰림 */
    } else {
        /** 틀렸을 때: 헛손질 */
    }

    if (state.typed === target) {
        /** 다 입력했을 때 */

        // 엔터나 스페이스나 문장기호 쓰면 넘어감
    }
});

// 5️⃣ 입력 이벤트 → 상태 갱신
input.addEventListener("input", (e) => {
    setState({ typed: e.target.value });
});

/
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const state = getState();
        const target = words[state.currentWordIndex];
        const typed = state.typed;
  
        if (typed === target) {
            /** 맞았을 때 */
  
            /** 다음 단어로 이동 */
            if (state.currentWordIndex < words.length - 1) {
                setState({
                    currentWordIndex: state.currentWordIndex + 1,
                    typed: "",
                });
                input.value = "";
            } else {
                /** 다 완료됐을 때? */
                input.disabled = true;
            }
        } else {
            /** 정답이 아닌채로 엔터쳤을 때 */
        }
    }
});  

// 6️⃣ 초기 렌더
setState({}); // 초기 렌더링 트리거