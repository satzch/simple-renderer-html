let obj = Cube();

let rotationX = 0;
let rotationY = 0.1;
let rotationZ = 0;

let cameraDir = [0, 0, 1]; // temp

obj.setPosition(new Vector(0, 0, -2));

function render() {
    clearScreen();
    clearDepthBuffer();
    clearColorBuffer();

    
    obj.setRotation(new Vector(rotationX, rotationY, rotationZ));
    obj.render();

    if (!Settings.wireframeOn && Settings.useColorBuffer) {
        flushColorBuffer();
    }

    
    if (LOG || LOG_All) console.log("Frame done.")

    
    if (Settings.rotateX) {
        rotationX = 1;
    } else {
        rotationX = 0;
    }
    if (Settings.rotateY) {
        rotationY = 1;
    } else {
        rotationY = 0;
    }
    if (Settings.rotateZ) {
        rotationZ = 1;
    } else {
        rotationZ = 0;
    }
    requestAnimationFrame(render);
}
render();

/**
 * 
 * @param {number} vertex - The vertex to be rotated
 * @param {number} [x=] (optional) - Angle(in radians) to rotate vertex around the X-axis
 * @param {number} [y=] (optional) - Angle(in radians) to rotate vertex around the Y-axis
 * @param {number} [z=] (optional) - Angle(in radians) to rotate vertex around the Z-axis
 * @returns {object} transformed object
 * @example
 * for (let indexes of cube.tries) {
 *   for (let vertexIndex of indexes) {
 *     rotateVertex(cube.vertices[vertex], rotationX, rotationY, rotationZ);
 *   }
 * }
 * 
 * // if rotation is required only in one axis (say z-axis)
 * rotateVertex(vertex, 0, 0, rotationZ);
 */
function rotateVertex(vertex, x = 0, y = 0, z = 0) {
    let rotatedCoordX = rotateAroundXAxis(vertex, x)[0];
    let rotatedCoordXZ = rotateAroundZAxis(rotatedCoordX, z)[0];
    let rotatedCoord = rotateAroundYAxis(rotatedCoordXZ, y)[0];
    return rotatedCoord;
}