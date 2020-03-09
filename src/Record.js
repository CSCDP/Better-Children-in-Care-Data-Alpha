import React, {useCallback, useState, useEffect} from 'react'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser();

export default function Record({childId, pyodide}) {
    const [table, setTable] = useState(undefined);

    if (childId) {
      pyodide.runPython("print('Outputting table results...')");
      let pythonScript = `
        def read_record(childId):
          return df[df['CHILD']==childId].to_html()`
      pyodide.runPython(pythonScript);
      const readRecord = pyodide.pyimport('read_record');

      const htmlTable = readRecord(childId);
      const reactElement = htmlToReactParser.parse(htmlTable);
      setTable(reactElement);
    }

    return (
        <>
            { table && (table)}
        </>
    )
}
