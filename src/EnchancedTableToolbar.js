import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const useToolbarStyles = makeStyles((theme) => ({
  title: {
    flex: '1 1 100%',
    align: 'center'
  },
}));

export default function EnhancedTableToolbar (props){
  const classes = useToolbarStyles();

  return (
    <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          The best liquidity providers
        </Typography>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};