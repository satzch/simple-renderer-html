let cube = Cube();

let rotationX = 0;
let rotationZ = 0.5;
function render() {
    clearScreen();
    // bresenhamLine(300, 400, 200, 200, "white");
    // drawLine(300, 300, 50, 50, "white");
    for (let index of cube.tries) {
        let triangle = []
        for (let coord of index) {
            let rotatedCoordX = rotateAroundXAxis(cube.vertices[coord], rotationX)[0];
            let rotatedCoord = rotateAroundZAxis(rotatedCoordX, rotationZ)[0];
            console.log("Rotated Normal Coord", rotatedCoord);
            rotatedCoord[2] += 2.0;
            let projectedNormalVertexCoord = projectToScreen(rotatedCoord)[0];
            console.log("Projected Normal Coord", projectedNormalVertexCoord);
            // projectedNormalVertexCoord[2] += projectedNormalVertexCoord[2]
            projectedNormalVertexCoord[0] /= projectedNormalVertexCoord[3]
            projectedNormalVertexCoord[1] /= projectedNormalVertexCoord[3]
            projectedScreenCoord = normalToScreen(projectedNormalVertexCoord[0], projectedNormalVertexCoord[1])
            triangle.push(projectedScreenCoord);
        }

        drawTriangle(
            triangle[0][0], triangle[0][1],
            triangle[1][0], triangle[1][1],
            triangle[2][0], triangle[2][1],
            "white"
        )

    }
    rotationX += 0.02;
    rotationZ += 0.01;
    // requestAnimationFrame(render);
}

render();