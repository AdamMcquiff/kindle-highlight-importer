var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                let clippings = allText.split("==========").map(clipping => clipping.trim());
                clippings = clippings.map(clipping => {
                    const textSplit = clipping.split(/\r?\n/).filter(n => n);
                    const book = textSplit[0];
                    const category = textSplit[1].slice(2).split(' ')[1];

                    let date = textSplit[1].split("|")[1].trim().split(" ").slice(2).join(' ');
                    if (!date) {
                        date = textSplit[1].split("|")[2].trim().split(" ").slice(2).join(' ')
                    }
                    const content = textSplit[2];
                    console.log({
                        book,
                        category,
                        date,
                        content
                    })
                    return {
                        book,
                        category,
                        date,
                        content
                    }
                })
                console.log('hi', clippings)
            }
        }
    }
    rawFile.send(null);
}

readTextFile("file:///Users/adammckenna/Projects/kindle-converter/highlights/highlights.txt");