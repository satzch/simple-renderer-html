let cube = Cube();

let rotationX = 0;
let rotationZ = 0.5;

let cameraDir = [0, 0, -1];

function render() {
    clearScreen();
    // bresenhamLine(300, 400, 200, 200, "white");
    // drawLine(300, 300, 50, 50, "white");

    // For all entries(index) of tries,
    // Transform and project the vertices(coord) of each
    // All coordinates were in normalized device coordinates
    // So convert each from normalized coordinates to screen coordinates
    // Store the group of vertices for one triangle and draw it
    for (let index of cube.tries) {
        if (LOG || LOG_All)
            console.log("---- TRIANGLE ----> ");
        
        let culled = false;
        let triangle = []
        for (let coord of index) {
            if (LOG || LOG_All)
                console.log("---- Rotating Vertex ----> ");

            let rotatedCoordX = rotateAroundXAxis(cube.vertices[coord], rotationX)[0];
            let rotatedCoord = rotateAroundZAxis(rotatedCoordX, rotationZ)[0];
            // console.log("Rotated Normal Coord", rotatedCoord);


            if (LOG || LOG_All) 
                console.log("-- Shifting vertex away from screen (positive z-direction) -->");
            rotatedCoord[2] += 2.0;

            if (LOG || LOG_All) 
                console.log("---- Projecting the Vertex ---->");
            let projectedNormalVertexCoord = projectToScreen(rotatedCoord)[0];
            
            projectedNormalVertexCoord[0] /= projectedNormalVertexCoord[3]
            projectedNormalVertexCoord[1] /= projectedNormalVertexCoord[3]

            if (LOG || LOG_All) 
                console.log("-- Converting from Normalized Device Coordinates to Screen Coordinates -->");
            projectedScreenCoord = normalToScreen(projectedNormalVertexCoord[0], projectedNormalVertexCoord[1])
            projectedScreenCoord.push(projectedNormalVertexCoord[2]);
            projectedScreenCoord.push(projectedNormalVertexCoord[3]);
            triangle.push(projectedScreenCoord);
        }

        if (LOG || LOG_All) {
            console.log("-- Resultant Triangle Coordinates -->");
            console.log(triangle);
        }


        let vector1 = []
        vector1.push(triangle[1][0] - triangle[0][0]);
        vector1.push(triangle[1][1] - triangle[0][1]);
        vector1.push(triangle[1][2] - triangle[0][2]);
        let vector1Length = Math.hypot(vector1[0], vector1[1], vector1[2]);
        vector1[0] /= vector1Length;
        vector1[1] /= vector1Length;
        vector1[2] /= vector1Length;
        // console.log(vector1)

        let vector2 = []
        vector2.push(triangle[2][0] - triangle[0][0]);
        vector2.push(triangle[2][1] - triangle[0][1]);
        vector2.push(triangle[2][2] - triangle[0][2]);
        let vector2Length = Math.hypot(vector2[0], vector2[1], vector2[2]);
        vector2[0] /= vector2Length;
        vector2[1] /= vector2Length;
        vector2[2] /= vector2Length;
        // console.log(vector2)

        let normal = crossProductVec3(vector1, vector2);
        // console.log("Normal", normal)


        let dotProd = dotProduct(normal, cameraDir);
        // console.log("Dot Product: ", dotProd);

        if (dotProd >= 0) culled = true;
        



        if (culled) continue;
        drawTriangle(
            triangle[0][0], triangle[0][1],
            triangle[1][0], triangle[1][1],
            triangle[2][0], triangle[2][1],
            "white"
        )

    }

    if (LOG || LOG_All) console.log("Frame done.")
    rotationX += 0.01;
    rotationZ += 0.005;
    requestAnimationFrame(render);
}

render();