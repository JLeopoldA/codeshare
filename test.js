// obtain file by passing file name as a second parameter
// pass useremail as a potential parameter for user to receive email
const selection = process.argv[2]; // file to be shared
const fs = require("fs");
let fileName = ""; // fileName is the name of the file being converted
const colors = require("colors");


const allChars = [ // array of all characters
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // lowercase letters
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // uppercase letters
    ...Array.from({ length: 10 }, (_, i) => String(i)), // digits
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', ':', ',', '.', '/', '<', '>', '?', '|', '\\', '~'
];

const keyChars = [
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97+i)),
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    ...Array.from({ length: 10 }, (_, i) => String(i))
];


function createUniqueID() {
    let id = "";
    for (let i = 0; i < 10; i++) {
        id+=keyChars[Math.floor(Math.random() * keyChars.length)];
    }
    return id;
}

function createKey() {
    let key = "";
    for (let k = 0; k < 24; k++) {
        key+=keyChars[Math.floor(Math.random() * keyChars.length)];
    }
    return key;
}

function shareFile(data) { // save data to database, data is object
   console.log("here we share file");
}

function uploadInfo(info) {
    console.log("File Key: " + info.key.random);
    console.log("File id: " + info.id.random);
    console.log("Save 'Key' & 'ID' in order to access file");
}

async function upload(data) {
    console.log(data);
    try {
        const response = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        uploadInfo(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

function processTxtFile(txtFile) {
    fileName = process.argv[3];
    let codePackage = {
        name: fileName,
        file: Buffer.from(txtFile).toString('base64'),
        key: createKey(),
        id: createUniqueID()
    }

    fs.unlink('codesharetemp123456789.txt', (err)=> {
        if (err) throw err;
        console.log(codePackage);
        upload(codePackage);
    });
}

function convertFileToTxt(jsFile) {
    fs.readFile(jsFile, 'utf8', (err, data)=> {
        if (err) throw err;
        fs.writeFile('codesharetemp123456789.txt', data, (err) => {
            if (err) throw err;
            fs.readFile('codesharetemp123456789.txt', 'utf8', (err, data) =>  {
                if (err) throw err;
                processTxtFile(data);
            });
        });
    });
}

function decodeFile(encodedFile) {
    fileName = encodedFile.name; // obtaining filename
    let dict = encodedFile.dict; // obtaining dictionary
    let key = encodedFile.k; // obtaining key, although not needed
    let c = encodedFile.c;
    let decodedFile = "";
    for (let i = 0; i < c.length; i++) {
        if(c[i]== " ") { 
            decodedFile+=c[i]; 
            if(c[i] !== undefined) {
            }
        } else {
            let char = (c[i]+c[i+1]);
            console.log(char);
            decodedFile += allChars[dict.indexOf(char)];
            i++;
        }
    }
    console.log(decodedFile);
    fs.writeFile("test2.js", decodedFile, (err) => {
        if (err) throw err;
        console.log("successfully translated and saved file");
    })
    // console.log(key)
    // let c = encodedFile.c;
    // let decodedFile = "";
    // for(let i = 0; i < c.length; i+2) {
    //     console.log(c[i]);
    //     if (c[i] !== "") {
    //         let tempChar = (c[i]+c[i++]);
    //         decodedFile += allChars[tempChar];
    //     } else { decodedFile += c[i]; }
    // }
    // console.log(decodedFile);
    // for (let i = 0; i < c.length; i++) {
    //     decodedFile+=allChars[dict.indexOf(c[i])];
    // }
    // console.log(decodedFile);
    // fs.writeFile('end.js', JSON.parse(decodedFile), (err) => {
    //     if (err) throw err;
    //     console.log("success");
    // });
    // console.log(key);
}

function downloadFileUsingId(dlFile) {
    fs.readFile(dlFile, 'utf-8', (err, data) => { // for testing purposes line 111-114
        if (err) throw err;
        decodeFile(JSON.parse(data));
    });
}

function run() {
    if(selection == '-s') { // user is choosing to share file
        console.log("share mode selected");
        fileName = process.argv[3]; // obtaining file name
        console.log(process.argv[3]);
        convertFileToTxt(process.argv[3]); // pass in the argument of the file location

    } else if (selection == '-d') { // user is choosing to download a shared file
        console.log("download mode selected");
        console.log(process.argv[3]);
        downloadFileUsingId(process.argv[3]); // pass in the ID file of code to be downloaded
    }
}
run();
// function test() {
//     axios.get("https://localhost:3000")
//     .then(response => {
//         console.log(response.data);
//     })
// }

// async function test() {
//     const response = await fetch("http://localhost:3000");
//     const jsonData = await response.json();
//     console.log(jsonData);
// }

// test();
