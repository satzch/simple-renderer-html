/**
 * This files contains Maths related code
 */

/**
 * Class for managing vectors
 */
class Vector {
    /**
     * Creates a vector object
     * @param {Number} x x component of the vector
     * @param {Number} y y component of the vector
     * @param {Number} z z component of the vector
     */
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Retutns the magnitude of the vector
     * @returns The magnitude of the vector
     */
    length() {
        return Math.sqrt(this.dot(this, this));
    }

    /**
     * Normalizes the vector and returns it
     * @returns Normalized vector
     */
    normalize() {
        let result = new Vector();
        let length = this.length();
        result.x /= length;
        result.y /= length;
        result.z /= length;
        return result;
    }

    /**
     * Multiply the components of the vector with the passed scalar
     * @param {Number} scalar The scalar to be multiplied
     */
    multiply(scalar) {
        let result = new Vector();
        result.x = this.x * scalar;
        result.y = this.y * scalar;
        result.z = this.z * scalar;
        return result;
    }

    /**
     * Add the passed vector to the current vector and returns the result
     * @param {Vector} vec The vector to be added to the current vector
     * @returns Resultant vector after the addition of the vectors
     */
    add(vec) {
        let result = new Vector();
        result.x = this.x + vec.x;
        result.y = this.y + vec.y;
        result.z = this.z + vec.z;
        return result;
    }

    /**
     * Subtracts the passed vector from the current vector and returns the result
     * @param {Vector} vec The vector to be subtracted from the current vector
     * @returns Resultant vector after subtracting `vec` from current vector
     */
    sub(vec) {
        let result = new Vector();
        result.x = this.x - vec.x;
        result.y = this.y - vec.y;
        result.z = this.z - vec.z;
        return result;
    }

    /**
     * Returns the dot product
     * @param {Vector} vec The vector with which dot product is calculated
     * @returns Returns the dot product of the vectors
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    /**
     * Returns the cross product
     * @param {Vector} vec The vector with which cross product is calculated
     * @returns Returns the cross product of the vectors
     */ 
    cross(vec) {
        let result = new Vector();
        result.x = this.y * vec.z - this.z * vec.y;
        result.y = this.z * vec.x - this.x * vec.z;
        result.z = this.x * vec.y - this.y * vec.x;
        return result;
    }

    /**
     * Projects the current vector on the passed vector
     * @param {Vector} vec The vector on which the projection will be done
     * @returns The projected vector on `vec`
     */
    projectOn(vec) {
        return vec.multiply(this.dot(vec)/vec.length()*vec.length());
    }

    /**
     * Multiply the vector with the matrix and return the result
     * @param {Array<Array<Number>>} matrix Matrix to be multiplied
     * @returns Resulting vector after multiplying
     */
    multiplyMatrix(matrix) {
        let result = new Vector();
        result.x = this.x * matrix[0][0] + this.y * matrix[0][1] + this.z * matrix[0][2] + matrix[0][3];
        result.y = this.x * matrix[1][0] + this.y * matrix[1][1] + this.z * matrix[1][2] + matrix[1][3];
        result.z = this.x * matrix[2][0] + this.y * matrix[2][1] + this.z * matrix[2][2] + matrix[2][3];
        return result;
    }

    /**
     * Project the vector coordinates to screen coordinates
     */
    projectToScreen() {
        let matrix = projectionMatrix;
        let result = [];
        result.push(this.x * matrix[0][0] + this.y * matrix[0][1] + this.z * matrix[0][2] + matrix[0][3]);
        result.push(this.x * matrix[1][0] + this.y * matrix[1][1] + this.z * matrix[1][2] + matrix[1][3]);
        result.push(this.x * matrix[2][0] + this.y * matrix[2][1] + this.z * matrix[2][2] + matrix[2][3]);
        result.push(this.x * matrix[3][0] + this.y * matrix[3][1] + this.z * matrix[3][2] + matrix[3][3])

        console.log(result);
        result[0] /= result[3];
        result[1] /= result[3];
        result[2] /= result[3];

        let projectedScreenCoord = normalToScreen(result[0], result[1]);
        return projectedScreenCoord;
    }
}