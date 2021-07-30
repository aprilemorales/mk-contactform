// Accessing styles from Material UI
import { makeStyles } from '@material-ui/core/styles';
// Accessing send icon (in avatar) from Material UI icons
import SendIcon from '@material-ui/icons/Send';
// Accessing Container, Typography and Avatar componets from Material UI
import { Container, Typography, Avatar } from '@material-ui/core';
// Accessing FormValidation component to add in form / validation to App 
import FormValidation from '../FormValidation/FormValidation';

// Form styles accessing Material UI theme presets
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
    transform: 'rotate(-32deg)'
  },
  sendIcon: {
    padding: theme.spacing(0, 0, 0, .5),
  },
  text: {
    textAlign: 'center',
  }
}));

// Basic structure of app
function App() {
  // To use styles for form above
  const appClass = useStyles();

  // Returning container, avatar, typography and form structure components
  return (
    <Container component="main" maxWidth="xs" className={appClass.container}>
      <Avatar 
        className={appClass.avatar}
      >
        <SendIcon />
      </Avatar>
      <Typography 
        variant="h5" 
        gutterBottom
      >
        Message Us
      </Typography>
      <Typography 
        className={appClass.text} 
        variant="body2" 
        gutterBottom
      >
      Want to say hello, have an idea or a request? Fill out the form below and let us know!
      </Typography>
      <FormValidation />
    </Container>
  );
}

// Exporting App to be accessible to Index
export default App;