import React, { useCallback, useState } from 'react';
import MyDropzone from "./MyDropzone";
import ChildList from "./ChildList";
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { palette } from '@material-ui/system';
import ChildHeader from "./ChildHeader";
import ChildEpisodes from "./ChildEpisodes";

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
    color: theme.palette.text.secondary,
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
    verticalAlign: 'middle',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  noteTitle: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontSize: '1.2em',
  },
  note: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontSize: '0.8em',
  },
  noteContainer: {
    paddingBottom: '5px',
    paddingTop: '50px',
  }
}));

function Dashboard({service}) {
  const [data, setData] = useState({});
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
    setChildId(id);
  }

  console.log('DATA', data);
  const classes = useStyles();
  const theme = useTheme();

  return (
      <>
        <div className={classes.toolHeader}>
          <div className={classes.alphaIndicator}>ALPHA</div>
          <div className={classes.toolNote}>This new tool allows you to identify and fix errors in your SSDA903 return.  Your feedback will help us improve it</div>
        </div>
        <div className={classes.root}>
            {!(data.Headers && data.Episodes)  && (
              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={12}>
                  &nbsp;
                </Grid>
                <Grid item xs={12}>
                  <MyDropzone onFiles={onFiles}/>
                </Grid>
              </Grid>
            )}
            {(data.Headers && data.Episodes)  && (
                <Grid container direction="row" justify="left" alignItems="flex-start" spacing={1}>
                  <Grid item xs={1}>&nbsp;</Grid>
                  <Grid item xs={10}>
                    <div className={classes.noteContainer}>
                      <div className={classes.noteTitle}>Record Detail</div>
                      <div className={classes.note}>Click on each child ID to view the errors found</div>
                    </div>
                  </Grid>
                  <Grid item xs={1}>&nbsp;</Grid>

                  <Grid item xs={1}>&nbsp;</Grid>
                  <Grid item xs={2}>
                    <ChildList data={data} onSelect={onSelect} selectedChildId={childId} />
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <ChildHeader data={data.Headers.filter(checkChild)} childId={childId}/>
                      </Grid>
                      <Grid item xs={12}>
                        <ChildEpisodes data={data.Episodes.filter(checkChild)}/>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>&nbsp;</Grid>
                  </Grid>
                </Grid>
            )}
        </div>
      </>
  );
}

export default Dashboard;
