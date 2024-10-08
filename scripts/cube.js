
function Vertice(x, y, z) {
    return {
        x: x,
        y: y,
        z: z
    }
}

function Cube() {
    return {
        vertices: [
            [ 0.5,  0.5,  0.5], // 0
            [ 0.5, -0.5,  0.5], // 1
            [-0.5, -0.5,  0.5], // 2
            [-0.5,  0.5,  0.5], // 3
            [ 0.5,  0.5, -0.5], // 4
            [ 0.5, -0.5, -0.5], // 5
            [-0.5, -0.5, -0.5], // 6
            [-0.5,  0.5, -0.5], // 7
        ],
        tries: [
            [0, 1, 2], // back
            [2, 3, 0], // back
            [0, 4, 5], // right
            [5, 1, 0], // right
            [0, 7, 4], // up
            [7, 0, 3], // up
            [4, 6, 5], // front
            [4, 7, 6], // front
            [6, 7, 2], // left
            [2, 7, 3], // left
            [2, 5, 6], // down
            [2, 1, 5], // down
        ],
    }
}