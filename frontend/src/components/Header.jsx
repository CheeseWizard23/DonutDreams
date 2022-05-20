import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuItem from '@mui/material/MenuItem';  
import Menu from '@mui/material/Menu';


const header = {
    boxShadow: 4,
    backgroundColor: "#FFBE61",
    padding: 0,
}

const title = {
    fontFamily: "PWYummyDonuts, Pacifico, sans-serif",
    flexGrow: 1,
    textShadow: 4,
    fontSize: 45,
    fontWeight: 20,
    color: "#000000",
    textAlign: 'center',
}

const menuFont = {
    fontFamily: "Pacifico, sans-serif",
}

const icon = {
    color: "#000000",
    size: 'large'
}

const skrrt = {
    marginBottom: 12
}

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goBack = () => {
        navigate(-1)    
    }

    return (
        <Box sx={ skrrt }>
            <AppBar position="fixed" sx={ header }>
                <Toolbar>
                 <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={goBack}
                        color="inherit"
                        sx={ icon }
                    >
                        <ArrowBackIosNewIcon sx={ icon } />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={ title }>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>Donut Dreams</Link>
                    </Typography>
                        <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={ icon }
                        >
                            <MenuIcon sx={ icon } />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose} 
                        >
                            {user ? (
                                <div>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'black'}}><MenuItem onClick={ handleClose } sx={ menuFont }>Shop</MenuItem></Link>
                                    <Link to="/Cart" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={ handleClose } sx={ menuFont } >Cart</MenuItem></Link>
                                    <Link to="/Orders" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={ handleClose } sx={ menuFont } >My Orders</MenuItem></Link>
                                    <Link to="/User-Reviews" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={ handleClose } sx={ menuFont } >My Reviews</MenuItem></Link>
                                    <Link to="/Reviews" style={{ textDecoration: 'none', color: 'black'}}><MenuItem onClick={ handleClose } sx={ menuFont }>Reviews</MenuItem></Link>
                                    <MenuItem onClick={ onLogout } sx={ menuFont } >Logout</MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/Login" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={ handleClose } sx={ menuFont } >Login</MenuItem></Link>
                                    <Link to="/Register" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={ handleClose } sx={ menuFont } >Register</MenuItem></Link>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'black'}}><MenuItem onClick={ handleClose } sx={ menuFont }>Shop</MenuItem></Link>
                                    <Link to="/Reviews" style={{ textDecoration: 'none', color: 'black'}}><MenuItem onClick={ handleClose } sx={ menuFont }>Reviews</MenuItem></Link>
                                </div>
                            )}
                        </Menu>
                        </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header