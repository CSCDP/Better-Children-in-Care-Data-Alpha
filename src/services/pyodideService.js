import raw from 'raw.macro';
const pythonScript = raw('../python/clean.py');

pyodide.loadPackage(['pandas','xlrd']).then(() => {
    pyodide.runPython(pythonScript);
    const readFile = pyodide.pyimport('read_file');
    setReadFile({readFile});


});


