// obtain file by passing file name as a second parameter
// pass useremail as a potential parameter for user to receive email
const selection = process.argv[2]; // file to be shared
const programControls = ["-s", "-d"]; // '-s' is for "share", what follows is filename. '-d' is for "download", what follows '-d' is the download code
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

function createEncodedDictionary() {
    let encodedDictionary = [];
    for(let i = 0; i< allChars.length; i++) {
        let randomCharacter = allChars[Math.floor(Math.random() * allChars.length)];
        if(Math.random()) {
            randomCharacter+=allChars[Math.floor(Math.random() * allChars.length)];
        }
        encodedDictionary.push(randomCharacter);
    }
    console.log(encodedDictionary.length);
    console.log(allChars.length);
    return encodedDictionary;
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

function encodeTxtFile(unencodedTxtFile) { // encode txt file here
    let encodedDictionary = createEncodedDictionary();
    let encodedTxtFile = "";
    for(let j = 0; j < unencodedTxtFile.length; j++) {
        if(allChars.indexOf(unencodedTxtFile[j]) > -1) {
            encodedTxtFile += encodedDictionary[allChars.indexOf(unencodedTxtFile[j])];
        } else {
            encodedTxtFile += unencodedTxtFile[j];
        }
    }

    let completeShareable = {
        name: fileName,
        dict: encodedDictionary,
        c: encodedTxtFile,
        k: createKey()
    };
    console.log(completeShareable.k);

    // console.log(completeShareable.c)
    fs.unlink('codesharetemp123456789.txt', (err)=> {
        if (err) throw err;
        shareFile(completeShareable); // share completed file object
        fs.writeFile('example.txt', JSON.stringify(completeShareable), (err) => { // for testing purposes line 69 - 72
            if (err) throw err;
            console.log("file written");
            console.log(completeShareable.name);
        });
    });
}

function convertFileToTxt(jsFile) {
    fs.readFile(jsFile, 'utf8', (err, data)=> {
        if (err) throw err;
        fs.writeFile('codesharetemp123456789.txt', data, (err) => {
            if (err) throw err;
            fs.readFile('codesharetemp123456789.txt', 'utf8', (err, data) =>  {
                if (err) throw err;
                encodeTxtFile(data);
            });
        });
    });
}

function decodeFile(encodedFile) {
    fileName = encodedFile.name; // obtaining filename
    let dict = encodedFile.dict; // obtaining dictionary
    let key = encodedFile.k; // obtaining key, although not needed
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
