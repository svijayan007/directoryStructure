const prompt = require('prompt');
let path = require('path');
let fs = require('fs');

prompt.start();

prompt.get(['maxDepth'], (err, result) => {
    if (err) { return onErr(err); }
    if (isNaN(result.maxDepth)) {
        getAllFiles('./main')
    } else {
        getFiles('./main', 0, result.maxDepth);
    }
});

onErr = (err) => {
    console.log(err);
    return 1;
}

getFiles = (dirPath, currentLevel, maxLevel) => {
    let count = 0;
    if (currentLevel > maxLevel) {
        return;
    }
    else {
        fs.readdirSync(dirPath).forEach(function (file) {
            let filepath = path.join(dirPath, file);
            if (currentLevel == 0) {
                if(count==0){
                    console.log('> ' + "main ");
                }
                console.log(' > ' + file);
                count++;
            } else {
                let space = ' '.repeat(currentLevel)
                console.log(` ${space}> ${file}`);
            }
            let stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                getFiles(filepath, currentLevel + 1, maxLevel);
            }
        });
    }
}

function getAllFiles(dirPath) {
    fs.readdirSync(dirPath).forEach(function (file) {
        let filepath = path.join(dirPath, file);
        console.log(`> ${file}`);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            getAllFiles(filepath);
        } else {
            console.info(filepath + '\n');
        }
    });
}

