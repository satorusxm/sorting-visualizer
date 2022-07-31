const playgroundDiv = document.querySelector("#playground");
let sortingId = null;

function start(sortingType, inputSize, speed) {
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
    else if (sortingType == "selection")
        step = selectionSort(arr);

    let sortingId = setInterval(() => {
        let finished = step();
        if (finished) {
            clearInterval(sortingId);
            sortingId = null;
            startBtn.classList.remove("running");
        }
    }, 100 / speed);

    function stopSorting() {
        if (sortingId != null) {
            clearInterval(sortingId);
            sortingId = null;
        }
    }

    return stopSorting;
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

function selectionSort(arr) {
    // Handles Selection sort, returns step function

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

function insertionSort(srcArr) {
    // Handles Insertion sort, returns step function

    const cnvSrc = document.createElement("canvas");  // Canvas for source array
    const cnvTrg = document.createElement("canvas");  // Canvas for target array

    for (const cnv of [cnvSrc, cnvTrg]) {
        cnv.width = playgroundDiv.clientWidth;
        cnv.height = (playgroundDiv.clientHeight / 2) - 5;

        playgroundDiv.appendChild(cnv);
    }

    let targetArr = new Array(srcArr.length).fill(0);

    let srcInd = 0;
    let srcIndLimit = srcArr.length;
    let tarInd = 0;
    let tarIndLimit = targetArr.length;
    let sorted = false;

    function step() {
        // Returns if sorting is complete
        
        if (sorted) return true;

        let found = false;

        if (targetArr[tarInd] > srcArr[srcInd]) {
            targetArr = targetArr.slice(1, tarInd).concat([srcArr[srcInd]]).concat(targetArr.slice(tarInd));
            found = true;
        }

        if (!found && tarInd == tarIndLimit - 1) {
            targetArr = targetArr.slice(1).concat([srcArr[srcInd]]);
            found = true;
        }

        drawArr(cnvSrc, srcArr, srcInd);
        drawArr(cnvTrg, targetArr, tarInd);

        if (found) {
            tarInd = 0;
            srcInd += 1;

            if (srcInd == srcIndLimit)
                sorted = true;
        } else {
            tarInd += 1;
        }

        return sorted;
    }

    return step;
}