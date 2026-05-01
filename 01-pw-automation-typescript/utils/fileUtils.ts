import { promises as fs } from 'fs';
import * as fileSys from 'fs';
import * as path from 'path';
import {parse} from 'csv-parse/sync';

export async function writeDataToFile(filename: string, data: string, encoding: BufferEncoding = 'utf8'): Promise<void> {
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

export async function readDataFromFile(filename: string, encoding: BufferEncoding = 'utf8'): Promise<string> {
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

export function readCSV<T>(filename: string, encoding: BufferEncoding = 'utf8'): T[]{
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
