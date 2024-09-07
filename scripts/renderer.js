let obj = Cube();

let rotationX = 0;
let rotationY = 0.1;
let rotationZ = 0;

let cameraDir = [0, 0, 1]; // temp

function render() {
    clearScreen();

    // bresenhamLine(300, 400, 200, 200, "white");
    // drawLine(300, 300, 50, 50, "white");

    // For all indexes of tries,
    // Transform and project the vertices of each
    for (let indexes of obj.tries) {
        if (LOG || LOG_All)
            console.log("---- TRIANGLE ----> ");
        
        let isCulled = false;
        
        // Store the group of vertices for the triangle to draw it later
        let triangle = []
        for (let vertexIndex of indexes) {
            if (LOG || LOG_All)
                console.log("---- Rotating Vertex ----> ");
            
            let rotatedVertex = rotateVertex(obj.vertices[vertexIndex], rotationX, rotationY, rotationZ);

            if (LOG || LOG_All)
                console.log("Rotated Normal Coord: ", rotatedVertex);

            if (LOG || LOG_All) 
                console.log("-- Shifting vertex away from screen (towards positive z-direction) -->");

            rotatedVertex[2] += 8.0;

            if (LOG || LOG_All) 
                console.log("---- Projecting the Vertex ---->");

            let projectedNormalVertexCoord = projectToScreen(rotatedVertex);


            // All coordinates were in normalized device coordinates
            // So converting each from normalized coordinates to screen coordinates
            if (LOG || LOG_All)
                console.log("-- Converting from Normalized Device Coordinates to Screen Coordinates -->");

            projectedScreenCoord = normalToScreen(projectedNormalVertexCoord[0], projectedNormalVertexCoord[1])
            projectedScreenCoord = [...projectedScreenCoord, projectedNormalVertexCoord[2], projectedNormalVertexCoord[3]];

            
            triangle.push(projectedScreenCoord);
        }

        if (LOG || LOG_All) {
            console.log("-- Resultant Triangle Coordinates -->");
            console.log(triangle);
        }

        // a vector is derived by subtracting one vertex from another
        // here vertex being a cartesian point represents the position vector
        let vector1 = [
            triangle[1][0] - triangle[0][0],
            triangle[1][1] - triangle[0][1],
            triangle[1][2] - triangle[0][2]
        ];

        let vector2 = [
            triangle[2][0] - triangle[0][0],
            triangle[2][1] - triangle[0][1],
            triangle[2][2] - triangle[0][2]
        ]
        
        vector1 = normalizeVec(vector1);
        vector2 = normalizeVec(vector2);

        let normal = crossProductVec3(vector1, vector2);
        // console.log("Normal", normal)

        let dotProd = dotProduct(normal, cameraDir);
        // console.log("Dot Product: ", dotProd);

        if (dotProd >= 0) isCulled = true;
        

        if (isCulled) continue;
        drawTriangle(
            triangle[0][0], triangle[0][1],
            triangle[1][0], triangle[1][1],
            triangle[2][0], triangle[2][1],
            "white"
        )

        let triangleVec2 = []; 
        for (let triag of triangle) {
            triangleVec2.push(triag[0]);
            triangleVec2.push(triag[1]);
        }

        fillTriangle(triangleVec2, "red");

    }

    if (LOG || LOG_All) console.log("Frame done.")
    // rotationX += 0.01;
    rotationY += 0.006;
    // rotationZ += 0.005;
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