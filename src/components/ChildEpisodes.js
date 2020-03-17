import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';


function ChildEpisodes({data}) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            color: theme.palette.text.secondary,
            fontSize: '0.8em',
            overflow: 'auto',
            maxHeight: '80vh',
        },
        sectionTitle: {
            maxWidth: 360,
            fontWeight: "bold",
            color: theme.palette.text.secondary,
            borderBottomColor: theme.palette.text.secondary,
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            textAlign: 'left',
        },
        tableContainer: {
            margin: 5,
        }
    }));
    const classes = useStyles();
  return (
      <div className="childEpisodes">
        <div className={classes.sectionTitle}>Episodes</div>
        <div className={classes.tableContainer}>
            { (data[0]) && (
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
                    {data.map(episode => (
                        <tr>
                            <td>?</td>
                            <td>{episode.DECOM}</td>
                            <td>{episode.LS}</td>
                            <td>{episode.CIN}</td>
                            <td>{episode.PLACE}</td>
                            <td>{episode.PLACE_PROVIDER}</td>
                            <td>?</td>
                            <td>?</td>
                            <td>{episode.PL_POST}</td>
                            <td>{episode.URN}</td>
                            <td>{episode.REASON_PLACE_CHANGE}</td>
                            <td>{episode.DEC}</td>
                            <td>{episode.REC}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
      </div>
  );
}

export default ChildEpisodes;
