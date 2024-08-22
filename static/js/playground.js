const playgroundDiv = document.querySelector("#playground");
let sortingId = null;

function shuffle(arr) {
    // Shuffle an array

    const len = arr.length;

    for (let i = 0; i < len; ++i) {
        let ind = Math.floor(Math.random() * len);
        let temp = arr[i];

        arr[i] = arr[ind];
        arr[ind] = temp;
    }
}

function genArr(sortingType, inputSize) {
    // Generate a random array according to the given sorting type
    let arr = [];

    // for cycle sort, create a range from 1 to inputSize and shuffle it
    if (sortingType == "cyclic") {
        for (let i = 1; i < inputSize + 1; ++i)
            arr.push(i  * 99 / inputSize);  // Transform i to lie between 0 and 100 (drawArr uses value of i as it's height)
        shuffle(arr);
    } else
        for (let i = 0; i < inputSize; ++i)
            arr.push(10 + Math.random() * 89);  // Push random numbers between 10 and 99
    
    return arr;
}

function start(sortingType, inputSize, speed) {
    // Empty the playgroundDiv
    playgroundDiv.innerHTML = "";

    // Generate Array

    // Show "Generating array" in playground
    playgroundDiv.classList.add("generating");

    const arr = genArr(sortingType, inputSize);

    // Remove "generating array" from playground
    playgroundDiv.classList.remove("generating");

    if (sortingType == "bubble")
        step = bubbleSort(arr);
    else if (sortingType == "insertion")
        step = insertionSort(arr);
    else if (sortingType == "selection")
        step = selectionSort(arr);
    else if (sortingType == "cyclic")
        step = cyclicSort(arr);

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
        if (cInd != undefined && i == cInd) {
            cntxt.fillStyle = "#ff0000";
            special = true;
        }
        else if (mInd != undefined && i == mInd) {
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

function cyclicSort(arr) {
    // Handles Cyclic Sort, returns step function

    const cnv = document.createElement("canvas");
    cnv.width = playgroundDiv.clientWidth;
    cnv.height = playgroundDiv.clientHeight;

    playgroundDiv.appendChild(cnv);

    drawArr(cnv, arr);

    let i = 0;
    const iLimit = arr.length;
    let sorted = false;

    function step() {
        // Returns if sorting is complete or not

        if (sorted) return true;
        
        // Undo the transform done in genArr() function and round the value to prevent
        // occasional decimal errors like 4 becoming 4.0000000001 or something
        const val = Math.round(arr[i] * iLimit / 99);
        const targetInd = val - 1;

        if (i == targetInd) {
            i += 1;
            drawArr(cnv, arr, i);
        } else {
            const temp = arr[targetInd];
            arr[targetInd] = arr[i];
            arr[i] = temp;

            drawArr(cnv, arr, i, targetInd);
        }

        if (i == iLimit)
            sorted = true;

        return sorted;
    }

    return step;
}