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
}