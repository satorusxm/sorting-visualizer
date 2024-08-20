const playgroundDiv = document.querySelector("#playground");

function start(sortingType, inputSize) {
    // Empty the playgroundDiv
    playgroundDiv.innerHTML = "";

    // Generate Array

    // TODO: Show "Generating array" in playground

    const arr = new Array();
    for (let i = 0; i < inputSize; ++i)
        arr.push(10 + Math.random() * 89);  // Push random numbers between 10 and 99

    // TODO: Remove "generating array" from playground

    if (sortingType == "bubble")
        step = bubbleSort(arr);
    else if (sortingType == "insertion")
        step = insertionSort(arr);

    let id = setInterval(() => {
        let finished = step();
        if (finished) {
            stopFunction = null;
            startBtn.classList.remove("running");
        }
    }, 1);

    return () => {clearInterval(id)};
}

function drawArr(cnv, arr, cInd, mInd) {
    // Draw an array on a canvas
    const len = arr.length;
    const width = 100 / len;
    const cntxt = cnv.getContext("2d");

    // Empty the canvas
    cntxt.fillStyle = "#ffffff";
    cntxt.fillRect(0, 0, cnv.width, cnv.height);

    // Draw array
    cntxt.fillStyle = "#1793e6";

    const w = (perc) => cnv.width * perc / 100;
    const h = (perc) => cnv.height * perc / 100;

    for (let i = 0; i < len; ++i) {
        const height = arr[i];

        if (cInd && i == cInd)
            cntxt.fillStyle = "#ff0000";
        else if (mInd && i == mInd)
            cntxt.fillStyle = "#00ff00";
        
        cntxt.fillRect(
            w(i * width),
            h(100 - height),
            w(width),
            h(height)
        );

        if (cInd && i == cInd || mInd && i == mInd)
            cntxt.fillStyle = "#1793e6";
    }
}

function bubbleSort(arr) {
    // Handles bubble sort, returns step function

    const cnv = document.createElement("canvas");
    cnv.width = playgroundDiv.clientWidth;
    cnv.height = playgroundDiv.clientHeight;

    playgroundDiv.appendChild(cnv);

    drawArr(cnv, arr);

    let currentInd = 1;
    let indLimit = arr.length;
    let sorted = false;

    function step() {
        // Returns if sorting is completed

        if (sorted) return true;

        if (arr[currentInd] < arr[currentInd - 1]) {
            let temp = arr[currentInd];
            arr[currentInd] = arr[currentInd - 1];
            arr[currentInd - 1] = temp;
        }

        drawArr(cnv, arr, currentInd);
        currentInd += 1;
        if (currentInd == indLimit) {
            currentInd = 0;
            indLimit -= 1;
            
            if (indLimit == 0)
                sorted = true;
        }

        return sorted;
    }

    return step;
}

function insertionSort(arr) {
    // Handles insertion sort, returns step function

    const cnv = document.createElement("canvas");
    cnv.width = playgroundDiv.clientWidth;
    cnv.height = playgroundDiv.clientHeight;

    playgroundDiv.appendChild(cnv);

    drawArr(cnv, arr);

    let currentInd = 0;
    let indLimit = arr.length;
    let maxInd = 0;
    let sorted = false;

    function step() {
        // Returns if sorting is done

        if (sorted) return true;

        if (arr[maxInd] < arr[currentInd]) {
            maxInd = currentInd;
        }

        drawArr(cnv, arr, currentInd, maxInd);

        currentInd += 1;

        if (currentInd == indLimit) {
            let temp = arr[currentInd - 1];
            arr[currentInd - 1] = arr[maxInd];
            arr[maxInd] = temp;

            currentInd = 0;
            maxInd = 0;
            indLimit -= 1;

            if (indLimit == 0)
                sorted = true;
        }

        return sorted;
    }

    return step;
}
