
/**
 * Updates the ColorBuffer with a filled triangle with the given coordinates and color.
 * @param {Vertex} vt0 Projected vertex
 * @param {Vertex} vt1 Projected vertex
 * @param {Vertex} vt2 Projected vertex
 * @param {Vector} mesh_pos Position of the mesh the triangle is a part of
 * @param {string} color 
 */
function fillTriangleInColorBuffer(vt0, vt1, vt2, mesh_pos = new Vector(), color) {
    let v0 = vt0.position;
    let v1 = vt1.position;
    let v2 = vt2.position;

    // let viewDir = v0.add(v1).add(v2).multiply(1/3);
    let cameraPos = new Vector();
    let viewDir = mesh_pos.sub(cameraPos);
    // viewDir = new Vector(0, 0, 1);

    let v0to1 = v1.sub(v0).normalize();
    let v0to2 = v2.sub(v0).normalize();
    let normal = v0to1.cross(v0to2).normalize();

    if (viewDir.dot(normal) < 0) {
        // console.log("don't draw")
        return;
    }

    let colorData = ColorBuffer.data;
    
    let [x0, y0, z0] = [v0.x, v0.y, v0.z];
    let [x1, y1, z1] = [v1.x, v1.y, v1.z];
    let [x2, y2, z2] = [v2.x, v2.y, v2.z];

    // find bounding box around the given triangle coordinates
    let xMin = Math.min(x0, x1, x2);
    let yMin = Math.min(y0, y1, y2);
    let xMax = Math.max(x0, x1, x2);
    let yMax = Math.max(y0, y1, y2);

    let bias0 = isTopOrLeftSide([x0, y0], [x1, y1]) ? 0 : 1;
    let bias1 = isTopOrLeftSide([x1, y1], [x2, y2]) ? 0 : 1;
    let bias2 = isTopOrLeftSide([x2, y2], [x0, y0]) ? 0 : 1;
    let biases = [bias0, bias1, bias2];

    let color1 = vt0.color;
    let color2 = vt1.color;
    let color3 = vt2.color;

    areaOfTriangle = edgeFunction([x0, y0], [x1, y1], [x2, y2]);

    for (let i = Math.round(yMin); i < yMax; i++) {
        for (let j = Math.round(xMin); j < xMax; j++) {

            // moved the checks here to make it easier to calculate Barycentric coordinates in one go
            let ABP = edgeFunction([x0, y0], [x1, y1], [j, i]) + biases[0];
            let BCP = edgeFunction([x1, y1], [x2, y2], [j, i]) + biases[1];
            let CAP = edgeFunction([x2, y2], [x0, y0], [j, i]) + biases[2];

            
            // check if point is inside triangle 
            if (ABP < 0 && BCP < 0 && CAP < 0) {
                
                // Barycentric coordinates
                let weightA = BCP/areaOfTriangle;
                let weightB = CAP/areaOfTriangle;
                let weightC = ABP/areaOfTriangle;

                weightA = weightA.toFixed(2);
                weightB = weightB.toFixed(2);
                weightC = weightC.toFixed(2);

                // Calculate Pixel Color
                let rColor = (weightA * color1.x) + (weightB * color2.x) + (weightC * color3.x);
                let gColor = (weightA * color1.y) + (weightB * color2.y) + (weightC * color3.y);
                let bColor = (weightA * color1.z) + (weightB * color2.z) + (weightC * color3.z);
                
                // Calculate Pixel Depth
                let interpolatedZ = weightA * z0 + weightB * z1 + weightC * z2;

                if (i >= 0 && j >= 0 && i < DepthBuffer.length && j < DepthBuffer[0].length && DepthBuffer[i][j] > interpolatedZ) {
                    // Update the Depth Buffer
                    DepthBuffer[i][j] = interpolatedZ;
                    
                    // Update the Color Buffer
                    let index = (i * Constants.screenWidth + j) * 4;
                    colorData[index] = rColor;
                    colorData[index + 1] = gColor;
                    colorData[index + 2] = bColor;
                    colorData[index + 3] = 255;
                }
            }
        }
    }
}


/**
 * Clear the color buffer with background color
 * @param {Color} bgcolor The color of the background
 */
function clearColorBuffer(bgcolor = Color(15, 15, 15, 255)) {
    const data = ColorBuffer.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = bgcolor.r;
        data[i + 1] = bgcolor.g;
        data[i + 2] = bgcolor.b;
        data[i + 3] = bgcolor.a;
    }
}

/**
 * Transferring the drawn contents from the color buffer to the visible screen.
 */
function flushColorBuffer() {
    ctx.putImageData(ColorBuffer, 0, 0);
}