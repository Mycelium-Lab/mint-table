import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AdditionalTable from './AdditionalTable';

// уже не используется, но если интересно - можешь посмотреть
// это грамотный вариант выдвижного списка

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
    <React.Fragment>
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={name+"-controls"}
          id={name+"-header"}
          style={{flex: 1, flexDirection: 'row'}}
        >
          <Typography className={classes.heading} align='center'>
          	<a href={'https://etherscan.io/address/'+name}>
              {name}
            </a>
          </Typography>
          <Typography className={classes.heading} align='center'>
            {'$ '+data.totalAmount.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
          <Typography className={classes.heading} align='center'>
            {data.data.length}
          </Typography>
          <Typography className={classes.heading} align='center'>
            {data.data.length}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdditionalTable rows={data.data} />
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
