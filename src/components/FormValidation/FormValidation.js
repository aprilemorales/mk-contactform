// Import Formik to help with React form handling with Material UI
import { useFormik } from 'formik';
// Import Yup to help with validation on inputs aka TextField
import * as yup from 'yup';
// Use styles from Material UI
import { makeStyles } from '@material-ui/core/styles';
// Use TextField and Button components from Material UI
import { TextField, Button, Typography, Box } from '@material-ui/core';
// Import Index CSS file to handle hiding showing styles for cancel message and cancel button (in regards to submit)
import '../../index.css';

// Form styles accessing Material UI theme presets
const formStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2, 0),
        padding: theme.spacing(1.15),
    },
    text: {
        textAlign: 'center',
    }
}));

// Form and Validation function
// Handles structure, validation, displaying and submission
function FormValidation() {
    // To use styles for form above
    const formClass = formStyles();
 
    // Adds Yup validation schema for name, email and message inputs
    const validationSchema = yup.object({
        name: yup
            .string('Enter you name')
            .min(2, 'Name is too short, must be at least ${min} characters long')
            .required('Name is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        message: yup
            .string('Enter your message')
            .max(200, 'Message is too long, must not go over ${max} characters')
            .required('A Message is required'),
      });

    // Using Formik to handle state, add the validation schema and submit function
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Used to display the values on form submisson as an alert
            //alert(JSON.stringify(values, null, 2)); 

            // Defining querySelectors to easily access elements
            let cancelButtonMessage = document.getElementById('cancelButtonBox');
            let cancelButton = document.querySelector('.cancelSubmit');

            // Show cancel message and button function
            function showCancel(){
                cancelButtonMessage.classList.remove('cancelCount');
                cancelButton.classList.remove('cancelSubmit');
            };

            // Hide cancel message after 3 seconds function
            function hideCancel(){
                setTimeout(function(){
                    cancelButtonMessage.classList.add('cancelCount');
                }, 3000);
            };

            // Hide cancel button function
            function hideCancelButton(){
                cancelButton.classList.add('cancelSubmit');
            };

            // Setting initial click value to false
            let cancelClick = false;
            // Click event listener for when cancel button is clicked
            document.querySelector('.cancelSubmit').addEventListener("click", function(){
                cancelClick = true;
            });

            // Creating countdown function to handle countdown logic
            function startCountdown(seconds) {
                // Setting a counter variable to be able to pass in number of seconds
                let counter = seconds;
                // Creating an interval so that the counter (number of seconds) is updated
                const interval = setInterval(() => {
                    // Passing in and changing counter timer to be visible to user
                    document.querySelector('.counter').innerHTML = `You have ${counter} seconds remaining to cancel your submission`;
                    console.log(counter);
                    // Counting down
                    counter--;
                    
                    // Checking if counter (number of seconds) is less than 0 (or ran out of time) 
                    if (counter < 0) {
                        // Clearing the interval so it doesn't keep going
                        clearInterval(interval);
                        // Hiding the cancel message and button box if counter is done
                        hideCancel();
                        // Using async fetch to POST form values to API Gateway created in AWS
                        // Moved this function here so that it will only submit after the countdown and if cancel isn't clicked
                        const submitMkForm = async () =>{
                            const data = values;
                            const url = 'https://eot0pwjxpk.execute-api.us-west-1.amazonaws.com/default/mk-contactformFunction';
                            try {
                            const response = await fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                'Content-type': 'application/json'
                                }
                            });
                            if(response.ok){
                                const jsonResponse = await response.json();
                                return console.log(jsonResponse);
                            }
                            } catch(error){
                            console.log(error);
                            }
                        };
                        submitMkForm();
                        console.log('Submitted!');
                    }
                    // Checking to see if cancel button was clicked
                    else if(cancelClick === true){
                        // Clearing the interval so it doesn't keep going
                        clearInterval(interval);
                        // If the cancel button is clicked it gets hidden function
                        hideCancelButton();
                        // Hiding the cancel message
                        hideCancel();
                        // Showing a brief cancel success message to give user indication that the submit was canceled
                        document.querySelector('.counter').innerHTML = `You have successfully canceled your submission!`;
                        console.log('Clicked!');
                    }
                }, 1000);
            }

            // Running and showing countdown, showing cancel message and showing cancel button
            function clickSub(){
                startCountdown(19);
                showCancel();
            }
            clickSub();
            
            /* Previous submit functionality without cancel message and button
                // Using async fetch to POST form values to API Gateway created in AWS 
                const submitMkForm = async () =>{
                    const data = values;
                    const url = 'https://eot0pwjxpk.execute-api.us-west-1.amazonaws.com/default/mk-contactformFunction';
                    try {
                    const response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                        'Content-type': 'application/json'
                        }
                    });
                    if(response.ok){
                        const jsonResponse = await response.json();
                        return console.log(jsonResponse);
                    }
                    } catch(error){
                    console.log(error);
                    }
                };
                submitMkForm();
            */
        }
    });

    // Returning form structure components
    return(
        <div>
            <form className={formClass.form} onSubmit={formik.handleSubmit} noValidate>
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="name"
                    name="name"
                    label="Name"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="email"
                    name="email"
                    label="Email"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={5}
                    id="message"
                    name="message"
                    label="Message"
                    type="message"
                    required
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                />
                <Box id="cancelButtonBox" className='cancelCount' mb={1} mt={1}>
                    <Typography 
                        className={formClass.text}
                        variant="body2" 
                        gutterBottom
                    >
                        <span className="counter">You have 20 seconds remaining to cancel your submission</span>
                        
                        <span className="cancelSuccess">
                            Your submission has been successfully canceled!
                        </span>
                    </Typography>
                    <Button className="cancelSubmit" fullWidth type="button">
                        Cancel
                    </Button> 
                </Box>
                <Button className={formClass.submit} color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>    
        </div>
    );
}

// Exporting FormValidation to be accessible to App 
export default FormValidation;