// All functions are mostly my self implementation
// So there might be some mistakes present

function putPixel(x, y, color) {
    let temp = ctx.fillStyle;
    ctx.fillStyle = color;
    // In HTML canvas, y increases downwards but I need y increase upwards
    ctx.fillRect(x, Constants.screenHeight - y, 1, 1);
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
    // In HTML canvas, y increases downwards but I need y increase upwards
    ctx.moveTo(x0, Constants.screenHeight - y0);
    ctx.lineTo(x1, Constants.screenHeight - y1);
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
 * @param {number[]} vector - a array consisting of vector components. any length
 */
function normalizeVec(vector) {
    // calculate the square root of sum of squares of the vector components to get the length
    // let vectorLength = Math.hypot(vector[0], vector[1], vector[2]);
    let vectorLength = 0;
    for (let v of vector) {
        vectorLength += v*v;
    }
    vectorLength = Math.sqrt(vectorLength);

    for (let i = 0; i < vector.length; i++) {
        vector[i] /= vectorLength;
    }
    return vector;
}


// I think this is where I should stop the polygon fill algorithm
// I know a lots of optimization and rules can be introduced
// But this is a learning project so I am keeping it limited for now, maybe upgrade it in future
// Will again make a Renderer using OpenGl or Vulkan or maybe other, there I will try to expore all the optimizations 

/**
 * Draws a filled triangle with the given coordinates and color.
 * @param {number[]} triangle - triangle to be drawn. An array of triangle coordinates in screen space, given in anti-clockwise order.
 * @param {string} color 
 */
function fillTriangle(triangle, color) {
    let [x0, y0, x1, y1, x2, y2] = triangle;

    // find bounding box around the given triangle coordinates
    let xMin = Math.min(x0, x1, x2);
    let yMin = Math.min(y0, y1, y2);
    let xMax = Math.max(x0, x1, x2);
    let yMax = Math.max(y0, y1, y2);


    let bias0 = isTopOrLeftSide([x0, y0], [x1, y1]) ? 0 : 1;
    let bias1 = isTopOrLeftSide([x1, y1], [x2, y2]) ? 0 : 1;
    let bias2 = isTopOrLeftSide([x2, y2], [x0, y0]) ? 0 : 1;
    let biases = [bias0, bias1, bias2];

    // Don't need for now
    // let color1 = Color(255, 0, 0, 1);
    // let color2 = Color(0, 255, 0, 1);
    // let color3 = Color(0, 0, 255, 1);

    areaOfTriangle = edgeFunction([x0, y0], [x1, y1], [x2, y2]);

    for (let i = yMin; i < yMax; i++) {
        for (let j = xMin; j < xMax; j++) {

            // moved the checks here to make it easier to calculate Barycentric coordinates in one go
            let ABP = edgeFunction([x0, y0], [x1, y1], [j, i]) + biases[0];
            let BCP = edgeFunction([x1, y1], [x2, y2], [j, i]) + biases[1];
            let CAP = edgeFunction([x2, y2], [x0, y0], [j, i]) + biases[2];

            
            // old conditional: checkPointInsideTriangle(j, i, triangle, biases)
            // check if point is inside triangle 
            if (ABP < 0 && BCP < 0 && CAP < 0) {
                
                // Don't need the below commented part for now
                // Barycentric coordinates
                // let weightA = ABP/areaOfTriangle;
                // let weightB = BCP/areaOfTriangle;
                // let weightC = CAP/areaOfTriangle;

                // let rColor = (weightA * color1.r) + (weightB * color2.r) + (weightC * color3.r);
                // let gColor = (weightA * color1.g) + (weightB * color2.g) + (weightC * color3.g);
                // let bColor = (weightA * color1.b) + (weightB * color2.b) + (weightC * color3.b);
                // let resultColor = `rgb(${rColor}, ${gColor}, ${bColor})`;
                
                putPixel(j, i, color);
            }
        }
    }
}

/**
 * Returns true if point (x, y) is inside given triangle. Returns false otherwise.
 * @param {number} x - x coordinate of point to be checked 
 * @param {number} y - y coordinate of point to be checked
 * @param {number[]} triangle - array consisting of triangle coordinates in anti-clockwise order 
 * @returns 
 */
function checkPointInsideTriangle(x, y, triangle, biases) {
    let [x0, y0, x1, y1, x2, y2] = triangle;

    let ABP = edgeFunction([x0, y0], [x1, y1], [x, y]) + biases[0];
    let BCP = edgeFunction([x1, y1], [x2, y2], [x, y]) + biases[1];
    let CAP = edgeFunction([x2, y2], [x0, y0], [x, y]) + biases[2];

    return (ABP < 0 && BCP < 0 && CAP < 0);
}

/**
 * Returns negative number if P is on the left of vector AB.
 * For more info check this article by Jason Tsorlinis:
 * https://jtsorlinis.github.io/rendering-tutorial/
 * @param {number[]} A 
 * @param {number[]} B 
 * @param {number[]} P 
 */
function edgeFunction(A, B, P) {
    return (B[0] - A[0]) * (P[1] - A[1]) - (B[1] - A[1]) * (P[0] - A[0]);
}

/**
 * Returns true if the edge connecting v1 and v2 is top flat edge or left edge of the triangle.
 * False otherwise
 * @param {number[]} v1 - vertex of triangle
 * @param {number[]} v2 - vertex of triangle
 * @returns 
 */
function isTopOrLeftSide(v1, v2) {
    let edge = [v2[0]-v1[0], v2[1]-v1[1]];
    // if the edge vector has y coordinate of 0, that means it is flat horizontally
    // And edge's x coordinate < 0 means it is pointing to the left as our triangle coordinates are 
    // given in anticlockwise order.
    // Hope this rough ascii diagram helps
    //     v2 <---------v1
    //     *         .*
    //     *     .*
    //     * .*
    //     v0
    let isTopFlatSide = edge[1] == 0 && edge[0] < 0;
    let isLeftSide = edge[1] > 0;

    return isTopFlatSide || isLeftSide;
}


function Color(r,g,b,a) {
    return {
        r: r,
        g: g,
        b: b,
        a: a
    }
}

function getColor(intensity) {
    return `rgb(${intensity*255} 0 0)`;
}