const playgroundDiv = document.querySelector("#playground");
let sortingId = null;

function start(sortingType, inputSize, speed) {
    // Empty the playgroundDiv
    playgroundDiv.innerHTML = "";

    // Generate Array

    // Show "Generating array" in playground
    playgroundDiv.classList.add("generating");

    const arr = new Array();
    for (let i = 0; i < inputSize; ++i)
        arr.push(10 + Math.random() * 89);  // Push random numbers between 10 and 99

    // Remove "generating array" from playground
    playgroundDiv.classList.remove("generating");

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

        let special = false;
        if (cInd && i == cInd) {
            cntxt.fillStyle = "#ff0000";
            special = true;
        }
        else if (mInd && i == mInd) {
            cntxt.fillStyle = "#00ff00";
            special = true;
        }

        if (special) {
            let temp = cntxt.fillStyle;
            cntxt.fillStyle = "#e6e6e6";
            cntxt.fillRect(w(i * width), 0, w(width), h(100));
            cntxt.fillStyle = temp;
        }
        
        cntxt.fillRect(
            w(i * width),
            h(100 - height),
            w(width),
            h(height)
        );

        if (special)
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

function insertionSort(arr) {
    // Handles Insertion sort, returns step function

    const cnv = document.createElement("canvas");
    cnv.width = playgroundDiv.clientWidth;
    cnv.height = playgroundDiv.clientHeight;

    playgroundDiv.appendChild(cnv);

    drawArr(cnv, arr);

    let i = 0;
    let j = 1;
    let jLimit = arr.length;
    let sorted = false;

    function step() {
        // Returns if array is sorted or not

        if (sorted) return true;

        let found = false;

        if (arr[j] > arr[i]) {
            arr = arr.slice(0, i + 1).concat([arr[j]]).concat(arr.slice(i + 1, j)).concat(arr.slice(j + 1));
            found = true;
        } else if (i == 0) {
            arr = [arr[j]].concat(arr.slice(0, j)).concat(arr.slice(j + 1));
            found = true;
        }

        drawArr(cnv, arr, i, j);

        if (found) {
            j += 1;
            i = j - 1;

            if (j == jLimit)
                sorted = true;
        } else i -= 1;

        return sorted;
    }

    return step;
}