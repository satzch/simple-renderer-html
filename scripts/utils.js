// All functions are my self implementation
// So there might be some mistakes present

function putPixel(x, y, color) {
    let temp = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.fillStyle = temp;
}

function clearScreen() {
    if (LOG || LOG_All) console.log("Clear Screen");

    ctx.fillStyle = Constants.backgroundColor;
    ctx.fillRect(0, 0, Constants.screenWidth, Constants.screenHeight);
}

function bresenhamLine(x0, y0, x1, y1, color) {
    if (LOG_All) console.log("Drawing line using Bresenham Algorithm");

    let dx = x1 - x0;
    let dy = y1 - y0;
    let D = 2 * dy - dx;
    for (let x = x0, y = y0; x < x1; x++) {
        putPixel(x, y, color);

        if (D > 0) {
            y++;
            D = D - 2 * dx;
        }
        D += 2 * dy;
    }
}

function drawLine(x0, y0, x1, y1, color) {
    if (LOG_All) console.log("Drawing line using canvas inbuilt functions");

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function normalToScreen(x, y) {
    if (LOG || LOG_All) console.log("Converted Normal Coordinates to Screen Coordinates");

    x += 1;
    y += 1;
    x = x / 2;
    y = y / 2;
    x *= Constants.screenWidth;
    y *= Constants.screenHeight;

    if (LOG || LOG_All) console.log("Resultant Screen Coordinates: [", x, ",", y, "]");

    return [x, y];
}

/**
 * returns the result of matrix multiplication of A and B
 * @param {number[][]} A 
 * @param {number[][]} B 
 * @returns {number[][]}
 */
function matrixMultiply(A, B) {
    if (LOG || LOG_All)
        console.log("Matrix Multiply: ", A, " and ", B);

    if (A[0].length != B.length) return null;
    let C = new Array(A.length);
    for (let i = 0; i < A.length; i++) {
        C[i] = new Array(B[0].length);
        for (let j = 0; j < B[0].length; j++) {
            C[i][j] = 0;
            for (let k = 0; k < C[i].length; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

function drawTriangle(x0, y0, x1, y1, x2, y2, color) {
    if (LOG_All) console.log("Drawing triangle");

    drawLine(x0, y0, x1, y1, color);
    drawLine(x1, y1, x2, y2, color);
    drawLine(x2, y2, x0, y0, color);
}

function projectToScreen(vertex) {
    if (LOG || LOG_All)
        console.log("Projecting 3D to 2D using Projection Matrix");

    if (vertex.length == 3) vertex.push(1);

    // returns 2d array consisting of required result as the first element or only element
    // 1x4 Matrix X 4x4 Matrix = 1x4 Matrix
    let result = matrixMultiply([vertex] , projectionMatrix)[0];

    if (LOG_All || LOG) console.log("Resulting Projected Vertex: ", result);
    result[0] /= result[3]
    result[1] /= result[3]
    
    return result;
}

function rotateAroundXAxis(vertex, angle) {
    if (LOG || LOG_All)
        console.log("Rotating the vertex: ", vertex, "by", angle, "radians around the x-axis");

    if (vertex.length == 3) vertex.push(1);
    // let radians = angle * Math.PI / 180;
    let radians = angle;
    const rotationMatrix = [
        [1, 0, 0, 0],
        [0, Math.cos(radians), -Math.sin(radians), 0],
        [0, Math.sin(radians), Math.cos(radians), 0],
        [0, 0, 0, 1]
    ]
    return matrixMultiply([vertex], rotationMatrix);
}

function rotateAroundZAxis(vertex, angle) {
    if (LOG || LOG_All)
        console.log("Rotating the vertex: ", vertex, "by", angle, "radians around the z-axis");

    if (vertex.length == 3) vertex.push(1);
    // let radians = angle * Math.PI / 180;
    let radians = angle;
    const rotationMatrix = [
        [Math.cos(radians), -Math.sin(radians), 0, 0],
        [Math.sin(radians), Math.cos(radians), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
    let rotatedCoord = matrixMultiply([vertex], rotationMatrix);
    return rotatedCoord;
}


function rotateAroundYAxis(vertex, angle) {
    if (LOG || LOG_All)
        console.log("Rotating the vertex: ", vertex, "by", angle, "radians around the y-axis");

    if (vertex.length == 3) vertex.push(1);
    // let radians = angle * Math.PI / 180;
    let radians = angle;
    const rotationMatrix = [
        [Math.cos(radians), 0, Math.sin(radians), 0],
        [0, 1, 0, 0],
        [-Math.sin(radians), 0, Math.cos(radians), 0],
        [0, 0, 0, 1]
    ];
    let rotatedCoord = matrixMultiply([vertex], rotationMatrix);
    return rotatedCoord;
}


function dotProduct(A, B) {
    if (LOG || LOG_All)
        console.log("Dot Product: ", A, "and", B);

    if (A.length != B.length) return null;
    let result = 0;
    for (let i = 0; i < A.length; i++) {
        result += (A[i] * B[i]);
    }
    return result;
}

/**
 * Returns the cross product using the first three values of the arrays passed
 * representing the x, y and z of a vector3
 * @param {number[]} A - any length array can be passed, but only the first three elements will be considered
 * @param {number[]} B - any length array can be passed, but only the first three elements will be considered
 * @returns {number[]} cross product of A and B as an array of length 3.
 */
function crossProductVec3(A, B) {
    if (A.length < 3 || B.length < 3) return null;
    let x = A[1] * B[2] - A[2] * B[1];
    let y = A[2] * B[0] - A[0] * B[2];
    let z = A[0] * B[1] - A[1] * B[0];
    return [x, y, z];
}

/**
 * Returns the unit vector along the passed vector
 * @param {number[]} vector
 */
function normalizeVec(vector) {
    // calculate the square root of sum of squares of the vector components to get the length
    let vectorLength = Math.hypot(vector[0], vector[1], vector[2]);
    vector[0] /= vectorLength;
    vector[1] /= vectorLength;
    vector[2] /= vectorLength;
    return vector;
}