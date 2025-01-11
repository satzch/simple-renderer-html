
const body = document.getElementById("body");
const ui_btn = document.getElementById("ui-btn");

// create the ui for modifying the variables
const ui = document.createElement("div");
ui.classList.add("ui-menu");
ui.classList.add("hide");


const fileInput = addNewInput("Import OBJ", "file");
fileInput.parentElement.id = "file-input";


const fovSlider = addNewInput("FOV", "range");
fovSlider.value = fov;
fovSlider.min = "5";
fovSlider.max = "180";
fovSlider.step = "1";
fovSlider.addEventListener("input", () => {
    let fov = fovSlider.value;
    fovRadians = 1 / ( Math.tan(fov * 0.5 * Math.PI / 180));
    projectionMatrix[0][0] = aspectRatio * fovRadians;
    projectionMatrix[1][1] = fovRadians;
});


const zNearInput = addNewInput("Z Near", "number");
zNearInput.min = "0.01";
zNearInput.max = "10";
zNearInput.step = "0.01";
zNearInput.value = zNear;
zNearInput.disabled = true;
zNearInput.addEventListener("input", () => {
    zNear = zNearInput.value;
    projectionMatrix[2][2] = zFar / (zNear - zFar);
    projectionMatrix[2][3] = (zFar * zNear) / (zNear - zFar);
});

const zFarInput = addNewInput("Z Far", "number");
zFarInput.min = "10";
zFarInput.max = "1000";
zFarInput.value = zFar;
zFarInput.disabled = true;
zFarInput.addEventListener("input", () => {
    zFar = zFarInput.value;
    projectionMatrix[2][2] = zFar / (zNear - zFar);
    projectionMatrix[2][3] = (zFar * zNear) / (zNear - zFar);
});


const resInput= addNewInput("Resolution", "number");
resInput.min = "0.25";
resInput.max = "2";
resInput.step = "0.25";
resInput.value = "1";
resInput.addEventListener("change", () => {
    if (resInput.value < resInput.min) resInput.value = resInput.min;
    else if (resInput.value > resInput.max) resInput.value = resInput.max;

    for (let i = 0.25; i <= 2; i += 0.25) {
        if (Math.abs(resInput.value - i) < 0.13) {
            resInput.value = i;
            break;
        }
    }

    updateScreenSize(window.innerWidth * resInput.value, window.innerHeight * resInput.value);
});

const rotateXOn = addNewInput("RotateX (local)", "checkbox");
rotateXOn.checked = Settings.rotateX;
rotateXOn.addEventListener("change", () => {
    Settings.rotateX = rotateXOn.checked;
});

const rotateYOn = addNewInput("RotateY (local)", "checkbox");
rotateYOn.checked = Settings.rotateY;
rotateYOn.addEventListener("change", () => {
    Settings.rotateY = rotateYOn.checked;
});

const rotateZOn = addNewInput("RotateZ (local)", "checkbox");
rotateZOn.checked = Settings.rotateZ;
rotateZOn.addEventListener("change", () => {
    Settings.rotateZ = rotateZOn.checked;
});


const wireframeOn = addNewInput("Wireframe", "checkbox");
wireframeOn.checked = Settings.wireframeOn;
wireframeOn.addEventListener("change", () => {
    Settings.wireframeOn = wireframeOn.checked;
})


body.appendChild(ui);

/**
 * Creates and appends input elements to ui menu
 * @param {string} name name for label of input
 * @param {string} type type of input
 * @returns the created input element
 */
function addNewInput(name, type) {
    const elm = document.createElement("div");
    elm.classList += "input-group";
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    const label = document.createElement("label");
    label.setAttribute("for", name);
    label.innerText = name;
    elm.appendChild(label);
    elm.appendChild(input);
    ui.appendChild(elm);
    return input;
}


ui_btn.addEventListener("click", () => {
    if (ui_btn.innerText == "Show Options") {
        ui_btn.innerText = "Hide Options";
        ui.classList.remove("hide");
    } else {
        ui_btn.innerText = "Show Options";
        ui.classList.add("hide");
    }
});

canvas.addEventListener("click", () => {
    if (ui_btn.innerText == "Hide Options") {
        ui_btn.innerText = "Show Options";
        ui.classList.add("hide");
    }
});

// change the canvas size and aspect ratio if user resizes the browser window
window.addEventListener("resize", (e) => {
    updateScreenSize(window.innerWidth * resInput.value, window.innerHeight * resInput.value);
});

/**
 * Update the screen size with new width and height
 * @param {Number} width 
 * @param {Number} height 
 */
function updateScreenSize(width, height) {
    Constants.screenWidth = Math.round(width);
    Constants.screenHeight = Math.round(height);

    updateCanvasParameters();
}

/**
 * updates the canvas and rendering related parameters
 */
function updateCanvasParameters() {
    // update canvas size
    canvas.width = Constants.screenWidth;
    canvas.height = Constants.screenHeight;
    
    // resize the Depth Buffer
    DepthBuffer = new Array(Constants.screenHeight).fill().map(() => new Array(Constants.screenWidth).fill(Infinity));

    // update projection
    aspectRatio = Constants.screenHeight/Constants.screenWidth;
    projectionMatrix[0][0] = aspectRatio * fovRadians;
}