import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";


function ChildEpisodes({data}) {
    const error218 = (element) => element.URN_Errors;
    const error178 = (element) => element.PROVIDER_Errors;

    console.log("EPISODES:");
    console.log(data);

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            color: theme.palette.text.secondary,
            fontSize: '0.8em',
            overflow: 'auto',
            maxHeight: '80vh',
            textAlign: 'left',
        },
        sectionTitle: {
            maxWidth: 360,
            fontWeight: "bold",
            color: "#333333",
            borderBottomColor: theme.palette.text.secondary,
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            textAlign: 'left',
        },
        sectionTitleDisabled: {
            maxWidth: 360,
            fontWeight: "bold",
            color: "#999999",
            borderBottomColor: "#999999",
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            textAlign: 'left',
        },
        tableContainer: {
            margin: 5,
        },
        iserror: {
            backgroundColor: '#ff9999',
        }
    }));
    const classes = useStyles();
  return (
      <div className="childEpisodes">
          <Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-end">
              <Grid item xs>
                <div className={classes.sectionTitle}>Episodes</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>UASC</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>Adoption</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>Adoption Placement</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>Permanence</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>Missing</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>Review</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>OC2</div>
              </Grid>
              <Grid item xs>
                  <div className={classes.sectionTitleDisabled}>OC3</div>
              </Grid>
          </Grid>
        <div className={classes.tableContainer}>
            { (data) && (
                <table className={classes.root} border={1}>
                    <thead>
                        <tr>
                            <th>Row</th>
                            <th>Start Date</th>
                            <th>LS</th>
                            <th>CIN</th>
                            <th>PL</th>
                            <th>PL Prov</th>
                            <th>PL Dist</th>
                            <th>PL LA</th>
                            <th>PL Loc</th>
                            <th>URN</th>
                            <th>PL Change Reason</th>
                            <th>End Date</th>
                            <th>REC</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((episode, index) => (
                        <tr>
                            <td>{index}</td>
                            <td className={episode.DECOM_Errors ? classes.iserror : ''}>{episode.DECOM}</td>
                            <td className={episode.LS_Errors ? classes.iserror : ''}>{episode.LS}</td>
                            <td className={episode.CIN_Errors ? classes.iserror : ''}>{episode.CIN}</td>
                            <td className={episode.PLACE_Errors ? classes.iserror : ''}>{episode.PLACE}</td>
                            <td className={episode.PLACE_PROVIDER_Errors | episode.PROVIDER_Errors ? classes.iserror : ''}>{episode.PLACE_PROVIDER}</td>
                            <td>0</td>
                            <td></td>
                            <td>{episode.PL_POST}</td>
                            <td className={episode.URN_Errors ? classes.iserror : ''}>{episode.URN}</td>
                            <td className={episode.REASON_PLACE_CHANGE_Errors ? '' : ''}>{episode.REASON_PLACE_CHANGE}</td>
                            <td>{episode.DEC}</td>
                            <td className={episode.REC_Errors ? '' : ''}>{episode.REC}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
        {(data) && (
        <div>
          {(data.some(error218)) && (
              <div className={classes.root}>Error 218: Ofsted Unique reference number (URN) is required.</div>
          )}
          {(data.some(error178)) && (
              <div className={classes.root}>Error 178: Placement provider code is not a valid code.</div>
          )}
        </div>
        )}
      </div>
  );
}

export default ChildEpisodes;
