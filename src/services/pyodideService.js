import pyodideloader from "../pyodide";

import raw from 'raw.macro';
const pythonScript = raw('../../server/lac/clean.py');

export default class PyodideService {
    constructor() {
        this.loadPyodide();
    }

    loadPyodide = async () => {
        if (this.pyodide) {
            return
        }
        const pyodide = await pyodideloader();
        console.log("Loading packages");
        await pyodide.loadPackage(['pandas','xlrd']);
        console.log("Initialising script");
        pyodide.runPython(pythonScript);
        this.pyodide = pyodide;
    };

    onReady = async () => {
        await this.loadPyodide();
    };

    readFile = async (file, buffer) => {
        const readFileFromBuffer = this.pyodide.pyimport('read_file_from_buffer');
        return readFileFromBuffer(buffer);
    };
}


//
// pyodide.loadPackage(['pandas','xlrd']).then(() => {
//     pyodide.runPython(pythonScript);
//     const readFile = pyodide.pyimport('read_file');
//     setReadFile({readFile});
//
//
// });
//

