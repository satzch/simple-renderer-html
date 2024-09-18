// const fileInput = document.getElementById("file-input");

let objectData;


fileInput.addEventListener("change", async () => {
    
    let selectedObj = {
        vertices: [],
        tries: []
    }
    
    const [file] = fileInput.files;

    if (file) {
        objectData = await file.text();
    }
    // console.log(objectData.split("\n"))
    if (objectData) {
        objectData = objectData.split("\n");
        for (let line of objectData) {
            if (line[0] == 'v') {
                line = line.split(" ");
                let vertex = [];
                for (let i = 1; i < 4; i++) {
                    vertex.push(Number(line[i]));
                }
                // console.log("Vertex: ", vertex)
                selectedObj.vertices.push(vertex);
            }

            if (line[0] == 'f') {
                line = line.split(" ");
                let triangle = [];
                for (let i = 1; i < 4; i++) {
                    triangle.push(Number(line[i]) - 1);
                }
                // console.log("Faces: ", triangle)
                selectedObj.tries.push(triangle);
            }
        }
    }


    obj = selectedObj;
})

