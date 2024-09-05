const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

// helper function to generate text from a string
function generateText(text) {
    const mm = new MarkovMachine(text);
    console.log(mm.makeText()); // generate random text via markov
}

// handle reading from a file
function readFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${path}`)
            process.exit(1);
        }
        generateText(data); // if not err, generate random text with file data
    })
}

// handle fetching from a URL
async function readFromURL(url) {
    try {
        let response = await axios.get(url);
        generateText(response.data) // once URL is fetched, generate random text with response data
    } catch (err) {
        console.error(`Error fetching URL: ${url}`);
        process.exit(1);
    }

}

//check if the input is a file or URL
const [type, path] = process.argv.slice(2);
if (type === 'file') {
    readFromFile(path);
} else if (type === 'url') {
    readFromURL(path);
} else {
    console.error(`Unknown input type: ${type}. Use 'file; or 'url'.`)
    process.exit(1);
}

