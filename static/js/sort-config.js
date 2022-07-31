const inputSizeInp = document.querySelector("#input-size");
const inputSizeDisp = document.querySelector("#input-size-display");
const startBtn = document.querySelector("#start");
let stopSorting = null;

inputSizeInp.addEventListener("input", (e) => {
    inputSizeDisp.innerText = inputSizeInp.value;
})

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

        stopSorting = start(sortingType, inputSize);

        startBtn.classList.add("running");
    }
});