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
    
    if (objectData) {
        objectData = objectData.split("\n");
        for (let line of objectData) {
            if (line[0] == 'v') {
                line = line.split(" ");
                let vertex = new Vertex(Number(line[1]), Number(line[2]), Number(line[3]));
                if (line[6]) {
                    vertex.color = new Vector(Number(line[4]), Number(line[5]), Number(line[6]));
                }
                selectedObj.vertices.push(vertex);
            }

            if (line[0] == 'f') {
                line = line.split(" ");
                selectedObj.tries.push(line[1] - 1);
                selectedObj.tries.push(line[2] - 1);
                selectedObj.tries.push(line[3] - 1);
            }
        }
    }


    obj = new Mesh(selectedObj.vertices, selectedObj.tries);
    obj.setPosition(new Vector(0, 0, -5));
})

