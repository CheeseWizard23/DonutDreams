import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Theme from '../theme'

var validator = require("email-validator");

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [open, setOpen] = React.useState(false);
    const [openTwo, setOpenTwo] = React.useState(false);
    const [openThree, setOpenThree] = React.useState(false);
    const [openFour, setOpenFour] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      setOpenTwo(false);
      setOpenThree(false);
      setOpenFour(false);
    };

    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const emailValidate = validator.validate(email);

        if (!name || !email || !password || !password2) {
            setOpenFour(true);
        } else if (!emailValidate) {
            setOpen(true);
        } else if (password.length < 4) {
            setOpenThree(true);
        } else if (password !== password2) {
            setOpenTwo(true);
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className="modal">
            <ThemeProvider theme={Theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <Box
                        sx={{
                        marginTop: 8,
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: 5,
                        borderRadius: '5%',
                        boxShadow: '4',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={name}
                                    autoFocus
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    autoComplete="new-password"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Confirm Password"
                                    type="password"
                                    id="password2"
                                    value={password2}
                                    onChange={onChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                            <Link href="./login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round'  }}>
                    Please enter a valid email address
                </Alert>
            </Snackbar>
            <Snackbar open={openTwo} autoHideDuration={1000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round'  }}>
                    Passwords do not match
                </Alert>
            </Snackbar>
            <Snackbar open={openThree} autoHideDuration={1000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round'  }}>
                    Please enter a password longer than 3 characters
                </Alert>
            </Snackbar>
            <Snackbar open={openFour} autoHideDuration={1000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%', fontFamily: 'Varela Round'  }}>
                    Please fill out all of the fields
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Register