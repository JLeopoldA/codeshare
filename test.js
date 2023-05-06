// obtain file by passing file name as a second parameter
// pass useremail as a potential parameter for user to receive email
const selection = process.argv[2]; // file to be shared
const programControls = ["-s", "-d"]; // '-s' is for "share", what follows is filename. '-d' is for "download", what follows '-d' is the download code
const fs = require("fs");



const allChars = [ // array of all characters
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // lowercase letters
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // uppercase letters
    ...Array.from({ length: 10 }, (_, i) => String(i)), // digits
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', ':', ',', '.', '/', '<', '>', '?', '|', '\\', '~'
];

function createEncodedDictionary() {
    let encodedDictionary = [];
    for(let i = 0; i< allChars.length; i++) {
        let randomCharacter = allChars[Math.floor(Math.random() * allChars.length)];
        if(Math.random()) {
            randomCharacter+=allChars[Math.floor(Math.random() * allChars.length)];
        }
        encodedDictionary.push(randomCharacter);
    }
    return encodedDictionary;
}

function encodeTxtFile(unencodedTxtFile) { // encode txt file here
    console.log(createEncodedDictionary);
}

function convertFileToTxt(jsFile) {
    fs.readFile(jsFile, utf8, (err, data)=> {
        if (err) throw err;
        fs.writeFile('codesharetemp123456789.txt', data, (err) => {
            if (err) throw err;
            fs.readFile('codesharetemp123456789.txt', utf8, (err, data) =>  {
                if (err) throw err;
                encodeTxtFile(data);
            });
        });
    });
}

function downloadFileUsingId() {

}

function run() {
    console.log("ran");
    if(selection == '-s') { // user is choosing to share file
        console.log("share mode selected");
        console.log(process.argv[3]);
        convertFileToTxt(process.argv[3]); // pass in the argument of the file location

    } else if (selection == '-d') { // user is choosing to download a shared file
        console.log("download mode selected");
        console.log(process.argv[3]);
        downloadFileUsingId(process.argv[3]); // pass in the ID file of code to be downloaded
    }
}

run();
