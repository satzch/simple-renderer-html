
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
    let result = matrixMultiply([vertex] , projectionMatrix);

    if (LOG_All || LOG) console.log("Resulting Projected Vertex: ", result);
    
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