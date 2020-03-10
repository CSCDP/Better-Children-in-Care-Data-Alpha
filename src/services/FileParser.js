import {useState} from 'react'
const [readFile, setReadFile] = useState(undefined);


export default class FileParser {

  constructor(pyodide) {
    this.pyodide = pyodide
  }

  parse(buffer) {
    this.pyodide.runPython(`
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

          print("Formatting results...")
          df['CHILD'] = df["CHILD"].apply(
            lambda x: "<a href='#'>{}</a>".format(x)
          )
          print("Outputting results...")
          return df[['CHILD', '_Errors']]
    `)

    const readFile = pyodide.pyimport('read_file');
    setReadFile({readFile});

    console.log("Loaded interpreter file...");
  }
}
