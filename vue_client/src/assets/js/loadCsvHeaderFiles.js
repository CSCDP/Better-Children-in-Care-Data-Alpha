async function loadModules() {
    await pyodide.loadPackage('pandas');
    await pyodide.runPython('import pandas as pd');
    await pyodide.runPython('from js import document');
}

function handleHeaderFile(files) {
  // Check for the various File API support.
  if (window.FileReader) {
      // FileReader are supported.
      headerAsText(files[0]);
  } else {
      alert('FileReader are not supported in this browser.');
  }
}

function handleEpisodeFile(files) {
  // Check for the various File API support.
  if (window.FileReader) {
      // FileReader are supported.
      episodesAsText(files[0]);
  } else {
      alert('FileReader are not supported in this browser.');
  }
}

function handleUascFile(files) {
  // Check for the various File API support.
  if (window.FileReader) {
      // FileReader are supported.
      uascAsText(files[0]);
  } else {
      alert('FileReader are not supported in this browser.');
  }
}

function headerAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHeaderHandler;
    reader.onerror = errorHandler;
}

function episodesAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadEpisodesHandler;
    reader.onerror = errorHandler;
}

function uascAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadUascHandler;
    reader.onerror = errorHandler;
}

function loadHeaderHandler(event) {
    var csv = event.target.result;
    processData(csv, "headerContents");
}

function loadEpisodesHandler(event) {
    var csv = event.target.result;
    processData(csv, "episodeContents");
}

function loadUascHandler(event) {
    var csv = event.target.result;
    processData(csv, "uascContents");
}

async function processData(csv, loadFrameId) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
            var tarr = [];
            for (var j=0; j<data.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr+'\n');
    }
    document.getElementById(loadFrameId).innerText = lines;
    pyodide.runPython(`
csvdata = document.getElementById(loadFrameId).innerText
with open("{}.csv".format(loadFrameId) , 'w') as outfile:
outfile.write(csvdata)
df = pd.read_csv("{}.csv".format(loadFrameId), sep=',')
print(df)
  `);
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      alert("Canno't read file !");
    }
}