

function Cube() {
    vertices = [
        new Vertex( 0.5,  0.5,  0.5), // 0
        new Vertex( 0.5, -0.5,  0.5), // 1
        new Vertex(-0.5, -0.5,  0.5), // 2
        new Vertex(-0.5,  0.5,  0.5), // 3
        new Vertex( 0.5,  0.5, -0.5), // 4
        new Vertex( 0.5, -0.5, -0.5), // 5
        new Vertex(-0.5, -0.5, -0.5), // 6
        new Vertex(-0.5,  0.5, -0.5), // 7
    ];

    vert_colors = [
        new Vector(255,   0,   0),
        new Vector(255, 255,   0),
        new Vector(  0, 255,   0),
        new Vector(  0, 255, 255),
        new Vector(  0,   0, 255),
        new Vector(255,   0, 255),
        new Vector(245, 245, 245),
        new Vector( 50,  50,  50)
    ];

    for (let i = 0; i < vertices.length; i++) {
        vertices[i].color = vert_colors[i]; 
    }
    
    tries = [
        0, 1, 2, // back
        2, 3, 0, // back
        0, 4, 5, // right
        5, 1, 0, // right
        0, 7, 4, // up
        7, 0, 3, // up
        4, 6, 5, // front
        4, 7, 6, // front
        6, 7, 2, // left
        2, 7, 3, // left
        2, 5, 6, // down
        2, 1, 5, // down
    ];

    return new Mesh(vertices, tries);
}