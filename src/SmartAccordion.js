import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AdditionalTable from './AdditionalTable';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
  },
}));

export default function SmartAccordion(props) {
	const {name, data, onChange, expanded} = props;
  const classes = useStyles();

  const handleChange = (panel) => (event, isExpanded) => {
  	onChange(isExpanded ? panel : false);
  };

  return (
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={name+"-controls"}
          id={name+"-header"}
        >
          <Typography className={classes.heading}>Wallet address </Typography>
          <Typography className={classes.secondaryHeading}>
          	<a href={'https://etherscan.io/address/'+name}>{name}</a>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdditionalTable rows={data} />
        </AccordionDetails>
      </Accordion>
  );
}
