const fs = require('fs').promises
const fileSys = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')

async function writeDataToFile(filename, data, encoding = 'utf8') {
    try {
        const filepath = path.join(process.cwd(), 'testdata', filename);
        await fs.writeFile(filepath, data, encoding);
        console.log(`File with name ${filename} written successfully`);
    }
    catch (error) {
        console.log(`Error writing the file ${filename}`, error);
        throw error;
    }
}

async function readDataFromFile(filename, encoding = 'utf8') {
    try {
        const filepath = path.join(process.cwd(), 'testdata', filename);
        const data = await fs.readFile(filepath, encoding);
        console.log(`Successfully read data from file ${filename}`);
        return data;
    }
    catch (error) {
        console.log(`Error reading the file ${filename}`, error);
        throw error;
    }
}

function readCSV(filename, encoding = 'utf8') {
    try {
        const filepath = path.join(process.cwd(), 'testdata', filename);
        console.log(filepath);
        const csvFileContent = fileSys.readFileSync(filepath, encoding);
        return parse(csvFileContent, {
            columns: true,
            skip_empty_lines: true
        });
    }
    catch (error) {
        console.log(`Error reading CSV file ${filename}`, error);
        return [];
    }
}

module.exports = {
    writeDataToFile,
    readDataFromFile,
    readCSV
};
