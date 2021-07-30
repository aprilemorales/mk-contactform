// Import Formik to help with React form handling with Material UI
import { useFormik } from 'formik';
// Import Yup to help with validation on inputs aka TextField
import * as yup from 'yup';
// Use styles from Material UI
import { makeStyles } from '@material-ui/core/styles';
// Use TextField and Button components from Material UI
import { TextField, Button } from '@material-ui/core';

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
            alert(JSON.stringify(values, null, 2)); 

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
                <Button className={formClass.submit} color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>    
        </div>
    );
}

// Exporting FormValidation to be accessible to App 
export default FormValidation;