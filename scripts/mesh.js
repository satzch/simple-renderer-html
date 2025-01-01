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
        this.modified_vertices = vertices;
        console.log(this.vertices);
        console.log(this.indices)
    }

    /**
     * Renders the mesh
     */
    render() {
        for (let i = 0; i < this.indices.length - 2; i += 3) {
            let v1 = this.modified_vertices[this.indices[i]];
            let v2 = this.modified_vertices[this.indices[i+1]];
            let v3 = this.modified_vertices[this.indices[i+2]];

            v1 = v1.position.projectToScreen();
            v2 = v2.position.projectToScreen();
            v3 = v3.position.projectToScreen();

           drawTriangle(v1[0], v1[1], v2[0], v2[1], v3[0], v3[1], "white");
        }
    }


    /**
     * Rotate the mesh by the specified angle about the respective axis
     * @param {Vector} angles Angles in degrees one for each axis
     * @example
     * ```
     * Mesh mesh;
     * mesh.setRotation(new Vector(45, 0, 0)) // rotates the mesh +45degrees about the x-axis
     * ```
     */
    setRotation(angles) {
        angles.x *= Math.PI/180;
        angles.y *= Math.PI/180;
        angles.z *= Math.PI/180;

        const xRotationMatrix = [
            [1, 0, 0, 0],
            [0, Math.cos(angles.x), -Math.sin(angles.x), 0],
            [0, Math.sin(angles.x), Math.cos(angles.x), 0],
            [0, 0, 0, 1]
        ];

        const yRotationMatrix = [
            [Math.cos(angles.y), 0, Math.sin(angles.y), 0],
            [0, 1, 0, 0],
            [-Math.sin(angles.y), 0, Math.cos(angles.y), 0],
            [0, 0, 0, 1]
        ];

        const zRotationMatrix = [
            [Math.cos(angles.z), -Math.sin(angles.z), 0, 0],
            [Math.sin(angles.z), Math.cos(angles.z), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];

        const rotationMatrix = matrixMultiply(matrixMultiply(xRotationMatrix, yRotationMatrix), zRotationMatrix);
        
        for (let i = 0; i < this.vertices.length; i++) {
            this.modified_vertices[i].position = this.vertices[i].position.multiplyMatrix(rotationMatrix);
        }
    }

    /**
     * Translate the mesh by the specified amounts
     * @param {Vector} vec Translation in each axis
     */
    translate(vec) {
        for (let vertex of this.modified_vertices) {
            vertex += vec.x;
            vertex += vec.y;
            vertex += vec.z;
        }
    }
}