import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser();

export default function MyDropzone({pyodide, setReadFile, readFile, setHeaderData, headerData, setEpisodeData, episodeData}) {

    useEffect(() => {
        pyodide.loadPackage(['pandas','xlrd']).then(() => {
            const pythonScript = `
import pandas as pd
import io

headercols = {
  'CHILD',
  'SEX',
  'DOB',
  'ETHNIC',
  'UPN',
  'MOTHER',
  'MC_DOB'
}
episodecols = {
  'CHILD',
  'DECOM',
  'RNE',
  'LS',
  'CIN',
  'PLACE',
  'PLACE_PROVIDER',
  'DEC',
  'REC',
  'REASON_PLACE_CHANGE',
  'HOME_POST',
  'PL_POST',
  'URN'
}

def checkForNull(df, col):
  df.loc[df[col].isnull(), '_Errors'] = True
  return df

def checkPostCode(df, col):
  postcoderegex = r'([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})'
  slicedf = df[col].str.contains(postcoderegex)
  slicedf = slicedf.fillna(False)
  df.loc[slicedf == False, '_Errors'] = True
  return df

def runHeaderTests(df):
  df = checkForNull(df, "CHILD")
  df = checkForNull(df, "UPN")
  return df

def runEpisodeTests(df):
  df = checkForNull(df, "CHILD")
  df = checkForNull(df, "URN")
  #df = checkPostCode(df, "HOME_POST")
  #df = checkPostCode(df, "PL_POST")
  return df

def detectType(df):
  if set(df.columns) == headercols:
    return "Headers"
  elif set(df.columns) == episodecols:
    return "Episodes"
  else:
    return "Unknown"

def read_file(file, buffer):
    data = io.BytesIO(buffer.tobytes())

    print("Determining File Type...")
    if "xls" in file.name:
        df = pd.read_excel(data)
    else:
        df = pd.read_csv(data)

    print("Detecting Data Type...")
    datatype = detectType(df)

    df['_Errors'] = False

    print("Running Tests...")
    if datatype == "Headers":
      df = runHeaderTests(df)
    elif datatype == "Episodes":
      df = runEpisodeTests(df)

    '''print("Formatting results...")
    df['CHILD'] = df["CHILD"].apply(
      lambda x: "<a href='#'>{}</a>".format(x)
    )'''
    print("Outputting results...")
    return df.to_json(), datatype
        `;
            pyodide.runPython(pythonScript);
            const readFile = pyodide.pyimport('read_file');
            setReadFile({readFile});
        });
    }, [pyodide]);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            console.log(file);
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const buffer = reader.result;
                const filedata = readFile.readFile(file, buffer);
                if (filedata[1] == "Headers") {
                  setHeaderData(JSON.parse(filedata[0]))
                } if (filedata[1] == "Episodes") {
                  setEpisodeData(JSON.parse(filedata[0]))
                }
                //service.parseFile(buffer);
                // const htmlTable = readFile.readFile(file, buffer);
                // const reactElement = htmlToReactParser.parse(htmlTable);
                // setTable(reactElement);
            };
            reader.readAsArrayBuffer(file);
        })

    }, [readFile])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <>
            {!readFile && (
                <div>Loading Pandas....</div>
            )}
            {readFile && (
            <div>
              <div className="App-dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop files here, or click to select</p>
              </div>
              <div className="FileUploadProgress">
                <div>
                  {headerData ? <p>Header Data Loaded</p>: <p>Still need to load Header Data</p>}
                </div>

                <div>
                  {episodeData ? <p>Episode Data Loaded</p>: <p>Still need to load Episode Data</p>}
                </div>
              </div>
            </div>
            )}
        </>
    )
}
