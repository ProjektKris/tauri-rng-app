const invoke = window.__TAURI__.invoke;
// const step = .1; // in seconds

// elements
const outputBox = document.getElementById("output");
const input = document.getElementById("input");
const inputBox = document.getElementById("input-box");
const intervalInputBox = document.getElementById("interval-input-box");

let interval;
let rolling = false;

input.addEventListener("submit", e => {
    // prevent the page from refreshing
    e.preventDefault();

    // dont start another roll if theres one currently in progress
    if (!rolling) {
        // get input
        let txt = inputBox.value;

        // invoke to the rust backend
        invoke("get_result_command", { input: txt }).then((message) => {
            let i = 0;
            rolling = true;
            console.log(message);
            interval = setInterval(() => {
                if (i < message.length) {
                    outputBox.innerText = message[i];
                    i++;
                } else {
                    clearInterval(interval);
                    interval = null;
                    rolling = false;
                }
            }, intervalInputBox.value);
        }).catch(e => console.error(e));
    }
});