import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.gray,
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    color: theme.palette.text.secondary,
    minWidth: 750,
    margin: 10,
  },
  container: {
    maxHeight: 440,
  },
  visuallyHidden: {
    border: 2,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default useStyles;