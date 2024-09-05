const canvas = document.getElementById("canvas");

const Constants = {
    screenWidth: 640,
    screenHeight: 480,
    backgroundColor: "black",
}

canvas.width = Constants.screenWidth;
canvas.height = Constants.screenHeight;

const ctx = canvas.getContext("2d");

const fov = 90;
const aspectRatio = Constants.screenHeight/Constants.screenWidth;
const fFovRadians = 1 / ( Math.tan(fov * 0.5 * Math.PI / 180));
const zFar = 10;
const zNear = 0.1; 

const projectionMatrix = [
    [ aspectRatio * fFovRadians, 0, 0, 0],
    [ 0, fFovRadians, 0, 0],
    [0, 0, zFar/(zFar - zNear), 1],
    [0, 0, -zFar*zNear/(zFar - zNear), 0]
]