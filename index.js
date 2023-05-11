const selection = process.argv[2]; 
const fs = require("fs");
let fileName = ""; 

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
    const buffer = Buffer.from(file.file, "base64");
    fs.writeFile(file.name, buffer.toString("utf-8"), (err) => {
        if (err) throw err;
        console.log(file.name + " was saved successfully. Thank you for using CODESHARE");
    });
}

async function download(data) {
    try {
        const response = await fetch("https://codeshareserver.herokuapp.com/api/download", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
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
        const response = await fetch("https://codeshareserver.herokuapp.com/api/upload", {
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

function help() { // help function displays commands
    const titleDecor = "============";
    const npmTitle = titleDecor + ("CoDeSwAp") + titleDecor;
    const npmDescription = ["\nCodeswap allows you to quickly upload and share code.",
        "Accounts are not needed, and you are provided with an ID and Key to provide access to uploaded file.",
        "This file is immediately deleted from our database upon download.",
        "Use for all purposes. EnJoY.\n"
    ];
    const npmControls = ["Syntax: node codeswap [parameterHere] [fileName || KEY ID]\n",
        "Uploading a file: node codeswap -s [fileNameHere]",
        "Other parameters to specify sharing other than '-s' are '--s' and 'share'",
        "Examples: node codeswap share test.js\n",
        "Downloading a file: node codeswap -d [KEY] [ID]",
        "Additional parameters to specify downloading other than '-d' are '--d' and 'download'",
        "Example: node codeswap download Key12345 ID123456\n"
    ];
    console.log(npmTitle);
    for (let i = 0; i < npmDescription.length; i++) {
        console.log(npmDescription[i]);
    }
    for (let j = 0; j < npmControls.length; j++) {
        console.log(npmControls[j]);
    }
}

function run() {
    if(selection == '-s' || selection == "--share" || selection == "share") { // user is choosing to share file
        console.log("SHARE MODE SELECTED");
        fileName = process.argv[3]; // obtaining file name
        convertFileToTxt(process.argv[3]); // pass in the argument of the file location
    } else if (selection == '-d' || selection == "--download" || selection == "download") { // user is choosing to download a shared file
        console.log("DOWNLOAD MODE SELECTED");
        if (process.argv[3] == null || process.argv[4] == null) {
            if (process.argv[3] == null) {
                console.log("Must included KEY to download");
            } else {
                console.log("Must include ID to download");
            }
        } 
        else {
            downloadFileUsingId(process.argv[3]); // pass in the ID file of code to be downloaded
        }
    } else if (selection == '-h' || selection == "--help" || selection =="help") {
        help();
    } else { console.log("Must input valid command. Type 'node codeshare help'"); }
}
run();



