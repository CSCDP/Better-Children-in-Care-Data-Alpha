import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';


function ChildHeader({data, childId}) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            color: theme.palette.text.secondary,
            fontSize: '0.8em',
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
        },
        iserror: {
            backgroundColor: '#ff9999',
        }
    }));

    console.log("DATA:");
    console.log(data);
    console.log("Child Id:");
    console.log(childId);
    console.log("---------------");
    const classes = useStyles();

  return (
      <div className="childHeader">
        <div className={classes.sectionTitle}>Header</div>
        <div className={classes.tableContainer}>
            {(data[0])  && (
            <table className={classes.root} border={1}>
                <thead>
                    <tr>
                        <th>DOB</th>
                        <th>LA Code</th>
                        <th>Sex</th>
                        <th>UPN</th>
                        <th>Ethnicity</th>
                        <th>USAC</th>
                        <th>USAC Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data[0].DOB}</td>
                        <td>?</td>
                        <td>{data[0].SEX == 1?"M":"F"}</td>
                        <td className={data[0].UPN_Errors ? classes.iserror : ''}>{data[0].UPN}</td>
                        <td className={data[0].ETHNIC_Errors ? classes.iserror : ''}>{data[0].ETHNIC}</td>
                        <td>?</td>
                        <td>?</td>
                    </tr>
                </tbody>
            </table>
            )}
        </div>
      </div>
  );
}

export default ChildHeader;
