import React, { useCallback, useState } from 'react';
import MyDropzone from "./MyDropzone";
import ChildList from "./ChildList";
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { palette } from '@material-ui/system';
import ChildHeader from "./ChildHeader";
import ChildEpisodes from "./ChildEpisodes";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles(theme => ({
  alphaIndicator: {
    color: 'white',
    backgroundColor: 'red',
    width: '75px',
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '0.8em',
    marginLeft: '10px',
  },
  toolNote: {
    color: '#ffffff',
    fontSize: '0.8em',
    textAlign: 'left',
    paddingLeft: '10px',
    display: 'inline-block',
  },
  toolHeader: {
    textAlign: 'left',
    display: 'inline-block',
    backgroundColor: 'white',
    width: '90%',
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    width: '90%',
    maxHeight: '800px',
    verticalAlign: 'middle',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  noteTitle: {
    textAlign: 'left',
    color: "#333333",
    fontWeight: "bold",
    textAlign: 'left',
    fontSize: '1.2em',
  },
  note: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontSize: '0.8em',
  },
  toolNoteContainer: {
    paddingBottom: '25px',
    paddingTop: '5px',
  },
  noteContainer: {
    paddingBottom: '15px',
    paddingTop: '5px',
    paddingLeft: '10px',
  },
  childListContainer: {
    paddingLeft: '10px'
  },
  fileList: {
    color: theme.palette.text.secondary,
  }
}));

function Dashboard({service}) {
  const [data, setData] = useState({});
  const [filesReady, setFilesReady] = useState(false);
  const [childId, setChildId] = useState();

  const checkChild = child => {
    return child.CHILD == childId;
  }

  const onFiles = useCallback(async files => {
    const result = await service.loadFiles(files);
    const newData = {...data, ...result}
    setData(newData);
  }, [service, data]);

  const onSelect = id => {
    console.log("ID:");
    console.log(id);
    setChildId(id);
  }

  const readyContinue = () => {
    setFilesReady(true);
  }

  const classes = useStyles();
  const theme = useTheme();

  return (
      <>
        <Grid container className={classes.toolNoteContainer}>
          <Grid item xs={1}>
            <div className={classes.alphaIndicator}>ALPHA</div>
          </Grid>
          <Grid>
            <div className={classes.toolNote}>This new tool allows you to identify and fix errors in your SSDA903 return.  Your feedback will help us improve it</div>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
            {!(data.Headers)  && (
              <>
                <Grid item xs={12}>
                  <MyDropzone onFiles={onFiles} fileType="Header CSV file"/>
                </Grid>
              </>
            )}
            {((!filesReady) && data.Headers) && (
              <>
                <Grid item xs={12}>
                  <MyDropzone onFiles={onFiles} fileType="Supporting CSV files"/>
                </Grid>
                <Grid item xs={4}>&nbsp;</Grid>
                <Grid item xs={4}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Episodes CSV Loaded" className={classes.fileList} />
                      <ListItemSecondaryAction className={classes.fileList}>
                        {!(data.Episodes) && (
                            <ErrorOutline/>
                        )}
                        {(data.Episodes) && (
                            <CheckCircleOutlineIcon/>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="UASC CSV Loaded" className={classes.fileList} />
                      <ListItemSecondaryAction className={classes.fileList}>
                        {(!data.UASC) && (
                            <ErrorOutline/>
                        )}
                        {(data.UASC) && (
                            <CheckCircleOutlineIcon/>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <Button onClick={() => readyContinue()}  color="primary">Ready to Continue</Button>
                </Grid>
                <Grid item xs></Grid>
              </>
            )}
            {(filesReady)  && (
                <>
                    <Grid container spacing={3} direction="column" alignItems="flex-start" className={classes.noteContainer}>
                      <Grid item xs>
                        <div className={classes.noteTitle}>Record Detail</div>
                        <div className={classes.note}>Click on each child ID to view the errors found</div>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} className={classes.childListContainer}>
                      <Grid item xs={12} alignItems="flex-end">
                        <div className={classes.note}>Year:
                            <select disabled>
                                <option>2020</option>
                            </select>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <ChildList data={data.Headers} onSelect={onSelect} selectedChildId={childId} />
                      </Grid>
                      <Grid container={'true'} item spacing={2} direction="column" xs>
                        <Grid item xs>
                          <ChildHeader data={data.Headers[childId]} childId={childId} usacData={data.UASC ? data.UASC.filter(checkChild): false}/>
                        </Grid>
                        <Grid item xs>
                          <ChildEpisodes data={data.Episodes.filter(checkChild)}/>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
            )}
          </Grid>
        </div>
      </>
  );
}

export default Dashboard;
