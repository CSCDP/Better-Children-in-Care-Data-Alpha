import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';


function ChildHeader({data, childId, usacData}) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            color: theme.palette.text.secondary,
            fontSize: '0.8em',
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
        tableContainer: {
            margin: 5,
        },
        iserror: {
            backgroundColor: '#ff9999',
        }
    }));

    //console.log("DATA:");
    //console.log(data);
    //console.log("Child Id:");
    //console.log(childId);
    //console.log("---------------");
    const classes = useStyles();

  return (
      <div className="childHeader">
        <div className={classes.sectionTitle}>Header</div>
        <div className={classes.tableContainer}>
            {(data)  && (
            <table className={classes.root} border={1}>
                <thead>
                    <tr>
                        <th>DOB</th>
                        <th>LA Code</th>
                        <th>Sex</th>
                        <th>UPN</th>
                        <th>Ethnicity</th>
                        <th>Mother</th>
                        <th>MC DOB</th>
                        <th>USAC</th>
                        <th>USAC Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.DOB}</td>
                        <td></td>
                        <td>{data.SEX} ({data.SEX == 1?"M":"F"})</td>
                        <td>{data.UPN}</td>
                        <td>{data.ETHNIC}</td>
                        <td>{data.MOTHER}</td>
                        <td>{data.MC_DOB}</td>
                        {(usacData) && (
                        <>
                        <td>{usacData.length > 0 ? "1": "0"}</td>
                        <td>{usacData ? usacData[0].DUC : ''}</td>
                        </>
                        )}
                        {!(usacData) && (
                        <>
                        <td> </td>
                        <td> </td>
                        </>
                        )}
                    </tr>
                </tbody>
            </table>
            )}
        </div>
      </div>
  );
}

export default ChildHeader;
