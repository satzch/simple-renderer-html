const canvas = document.getElementById("canvas");

const LOG = false;
const LOG_All = false;

const Constants = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    backgroundColor: "black",
}

const Settings = {
    wireframeOn: false,
    rotateX: false,
    rotateY: true,
    rotateZ: false,
};

canvas.width = Constants.screenWidth;
canvas.height = Constants.screenHeight;

const ctx = canvas.getContext("2d");


let fov = 90;
let aspectRatio = Constants.screenHeight/Constants.screenWidth;
let fovRadians = 1 / ( Math.tan(fov * 0.5 * Math.PI / 180));
let zFar = 100;
let zNear = 0.1; 

let projectionMatrix = [
    [ aspectRatio * fovRadians, 0, 0, 0],
    [ 0, fovRadians, 0, 0],
    [0, 0, zFar/(zFar - zNear), 1],
    [0, 0, -zFar*zNear/(zFar - zNear), 0]
]
