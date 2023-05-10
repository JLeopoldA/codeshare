// obtain file by passing file name as a second parameter
// pass useremail as a potential parameter for user to receive email
const selection = process.argv[2]; // file to be shared
const fs = require("fs");
let fileName = ""; // fileName is the name of the file being converted




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

function parseDownload(file) {
    // console.log(file);
    const buffer = Buffer.from(file.file, "base64");
    fs.writeFile(file.name, buffer.toString("utf-8"), (err) => {
        if (err) throw err;
        console.log(file.name + " was saved successfully. Thank you for using CODESHARE");
    });
}

async function download(data) {
    console.log(data);
    try {
        const response = await fetch("http://localhost:3000/api/download", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        // console.log(result);
        parseDownload(result);
    } catch (error) {
        console.error("Error: ", error);
    }
}

function uploadInfo(info) {
    console.log("File Key: " + info.key);
    console.log("File id: " + info.id);
    console.log("Save 'Key' & 'ID' in order to access file");
}

async function upload(data) {
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

function downloadFileUsingId() {
    let fileInfo = {
        id: process.argv[4],
        key: process.argv[3]
    };
    download(fileInfo);
}

function run() {
    if(selection == '-s' || selection == "--share" || selection == "share") { // user is choosing to share file
        console.log("share mode selected");
        fileName = process.argv[3]; // obtaining file name
        convertFileToTxt(process.argv[3]); // pass in the argument of the file location

    } else if (selection == '-d' || selection == "--download" || selection == "download") { // user is choosing to download a shared file
        console.log("download mode selected");
        if (process.argv[3] == null || process.argv[4] == null) {
            if (process.argv[3] == null) {
                console.log("Must included ID to download");
            } else {
                console.log("Must include KEY to download");
            }
        } 
        else {
            downloadFileUsingId(process.argv[3]); // pass in the ID file of code to be downloaded
        }
    } else if (selection == '-h' || selection == "--help" || selection =="help") {

    } else { console.log("Must input valid command"); }
}
run();

