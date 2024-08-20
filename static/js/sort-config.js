const inputSizeInp = document.querySelector("#input-size");
const inputSizeDisp = document.querySelector("#input-size-display");
const speedInp = document.querySelector("#speed");
const speedDisp = document.querySelector("#speed-display");
const startBtn = document.querySelector("#start");
let stopSorting = null;

inputSizeInp.addEventListener("input", (e) => {
    inputSizeDisp.innerText = inputSizeInp.value;
});

speedInp.addEventListener("input", (e) => {
    speedDisp.innerText = speedInp.value;
});

startBtn.addEventListener("click", (e) => {
    if (startBtn.classList.contains("running")) {
        // TODO: Stop sorting
        if (stopSorting != null)
            stopSorting();
        
        stopSorting = null;

        startBtn.classList.remove("running");
    } else {
        const sortingType = document.querySelector("#sorting-type").value.toLowerCase();
        const inputSize = parseInt(inputSizeInp.value);
        const speed = parseInt(speedInp.value);

        stopSorting = start(sortingType, inputSize, speed);

        startBtn.classList.add("running");
    }
});