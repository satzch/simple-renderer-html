let cube = Cube();

let rotationX = 0;
let rotationZ = 0.5;
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
        
        let triangle = []
        for (let coord of index) {
            if (LOG || LOG_All)
                console.log("---- Rotating Vertex ----> ");

            let rotatedCoordX = rotateAroundXAxis(cube.vertices[coord], rotationX)[0];
            let rotatedCoord = rotateAroundZAxis(rotatedCoordX, rotationZ)[0];
            console.log("Rotated Normal Coord", rotatedCoord);

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
            triangle.push(projectedScreenCoord);
        }

        if (LOG || LOG_All) {
            console.log("-- Resultant Triangle Coordinates -->");
            console.log(triangle);
        }

        drawTriangle(
            triangle[0][0], triangle[0][1],
            triangle[1][0], triangle[1][1],
            triangle[2][0], triangle[2][1],
            "white"
        )

    }

    if (LOG || LOG_All) console.log("Frame done.")
    rotationX += 0.02;
    rotationZ += 0.01;
    requestAnimationFrame(render);
}

render();