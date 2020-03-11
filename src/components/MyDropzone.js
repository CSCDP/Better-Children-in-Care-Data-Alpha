import React from 'react'
import {useDropzone} from 'react-dropzone'

export default function MyDropzone({onFiles}) {
    const {getRootProps, getInputProps} = useDropzone({onDrop: onFiles})
    return (
        <>
            <div>
              <div className="App-dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop files here, or click to select</p>
              </div>
              <div className="FileUploadProgress">
              </div>
            </div>
        </>
    )
}
