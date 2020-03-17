import React from 'react'
import {useDropzone} from 'react-dropzone'
import GetAppIcon from "@material-ui/icons/GetApp";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'

export default function MyDropzone({onFiles}) {
    const {getRootProps, getInputProps} = useDropzone({onDrop: onFiles})

    const useStyles = makeStyles(theme => ({
        root: {
            width: '90%',
            color: theme.palette.text.secondary,
            textAlign: 'center',
        },
        dropzoneNote: {
            color: theme.palette.text.secondary,
        },
        downloadIcon: {
            width: '160px',
        }
    }));

    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                    <Grid item xs={8}>
                        <GetAppIcon className={classes.downloadIcon}/>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="App-dropzone" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className={classes.dropzoneNote}>Drag 'n' drop files here, or click to select</p>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="FileUploadProgress">
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
