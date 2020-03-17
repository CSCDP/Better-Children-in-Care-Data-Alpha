import React from 'react';
import '../App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  childList: {
    width: '100%',
    maxWidth: 360,
    overflow: 'auto',
    maxHeight: '80vh',
    color: theme.palette.text.secondary,
  },
  childList: {
    overflow: 'auto',
    maxHeight: '80vh',
  },
  childListTitle: {
    maxWidth: 360,
    fontWeight: "bold",
    color: theme.palette.text.secondary,
    borderBottomColor: theme.palette.text.secondary,
    borderBottomWidth: 1,
    borderBottomStyle:'solid',
    textAlign: 'left',
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
    const onClick = e => {
        onSelect(e.target.id);
    }

    const classes = useStyles();

    return (
      <>
          <div className={classes.childListTitle}>Child ID</div>
          {data.Headers.map(child => (
          <div className={classes.childListContainer}>
              <List className={classes.childList}>
              {(selectedChildId == child.CHILD) && (
                  <ListItem key={child.CHILD} onClick={onClick} id={child.CHILD} className={`${classes.childListItemSelected} ${child._Errors ? classes.iserror : classes.noerror}`}>
                    <ListItemIcon>
                        <CheckBoxIcon />
                    </ListItemIcon>
                    {child.CHILD}
                  </ListItem>
              )}
              {(selectedChildId != child.CHILD) && (
                  <ListItem key={child.CHILD} onClick={onClick} id={child.CHILD} className={`${classes.childListItem} ${child._Errors ? classes.iserror : classes.noerror}`}>
                    <ListItemIcon>
                        <CheckBoxOutlineBlankIcon />
                    </ListItemIcon>
                    {child.CHILD}
                  </ListItem>
              )}
              </List>
          </div>
          ))}
      </>
    );
}

export default ChildList;
