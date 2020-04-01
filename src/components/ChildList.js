import React from 'react';
import '../App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  childListTitle: {
    maxWidth: 360,
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    borderBottomColor: theme.palette.text.secondary,
    borderBottomWidth: 1,
    borderBottomStyle:'solid',
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
    childList: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 250,
    },
  childListItem: {
    padding:0,
    margin:0,
    fontSize:'0.8em',
  },
  childListItemSelected: {
    padding:0,
    margin:0,
    fontSize:'0.8em',
    backgroundColor:'#dddddd',
  },
    iserror: {
      color: '#aa2200',
    },
    noerror: {
      color: theme.palette.text.secondary,
    }
}));

function ChildList({data, onSelect, selectedChildId}) {
    const setChild = id => {
        console.log("ID:")
        console.log(id);
        onSelect(id);
    }
    console.log("HEADERS:");
    console.log(data.Headers);

    const classes = useStyles();

    return (
        <List className={classes.childList}>
            <div className={classes.sectionTitle}>Child ID</div>
          {data.Headers.map(child => (
            <>
            {(selectedChildId == child.CHILD) && (
              <ListItem  className={classes.childListItemSelected}>
                <ListItemText primary={child.CHILD} className={classes.noerror} />
                <ListItemSecondaryAction>
                  <Button className={child._Errors > 0 ? "iserror": "noerror"} onClick={() => setChild(child.CHILD)}>{child._Errors > 0 ? "error": "valid"}</Button>
                </ListItemSecondaryAction>
              </ListItem>
            )}
            {(selectedChildId != child.CHILD) && (
              <ListItem className={classes.childListItem}>
                <ListItemText primary={child.CHILD} className={classes.noerror} />
                <ListItemSecondaryAction>
                  <Button className={child._Errors > 0 ? "iserror": "noerror"} onClick={() => setChild(child.CHILD)}>{child._Errors > 0 ? "error": "valid"}</Button>
                </ListItemSecondaryAction>
              </ListItem>
            )}
            </>
          ))}
        </List>
    );
}

export default ChildList;
