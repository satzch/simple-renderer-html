/**
 * This file contains the code for mesh manipulation
 */


/**
 * Class for managing vertices
 */
class Vertex {
    /**
     * Creates a vertex at the position `(x, y, z)`
     * @param {Number} x x coordinate of the vertex position
     * @param {Number} y y coordinate of the vertex position
     * @param {Number} z z coordinate of the vertex position
     */
    constructor(x = 0, y = 0, z = 0) {
        this.position = new Vector(x, y, z);
        this.color = new Vector();
        this.normal = new Vector();
    }
}


/**
 * Class for managing meshes
 */
class Mesh {
    /**
     * Creates a mesh with the passed vertices and indices.
     * @param {Array<Vertex>} vertices Array of vertices of the mesh
     * @param {Array<Number>} indices Array of indices forming a triangle in anti-clockwise manner
     */
    constructor(vertices, indices) {
        this.vertices = vertices;
        this.indices = indices;
    }

    /**
     * Renders the mesh
     */
    render() {
        for (let i = 0; i < this.indices.length - 2; i += 3) {
            let v1 = this.vertices[this.indices[i]];
            let v2 = this.vertices[this.indices[i+1]];
            let v3 = this.vertices[this.indices[i+2]];

            v1 = v1.position.projectToScreen();
            v2 = v2.position.projectToScreen();
            v3 = v3.position.projectToScreen();

            drawTriangle(v1[0], v1[1], v2[0], v2[1], v3[0], v3[1], "white");
        }
    }
}