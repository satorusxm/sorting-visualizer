const inputSizeInp = document.querySelector("#input-size");
const inputSizeDisp = document.querySelector("#input-size-display");
const startBtn = document.querySelector("#start");
let stopFunction;

inputSizeInp.addEventListener("input", (e) => {
    inputSizeDisp.innerText = inputSizeInp.value;
})

startBtn.addEventListener("click", (e) => {
    if (startBtn.classList.contains("running")) {
        // TODO: Stop sorting
        if (stopFunction) stopFunction();

        startBtn.classList.remove("running");
    } else {
        const sortingType = document.querySelector("#sorting-type").value.toLowerCase();
        const inputSize = parseInt(inputSizeInp.value);

        stopFunction = start(sortingType, inputSize);

        startBtn.classList.add("running");
    }
});