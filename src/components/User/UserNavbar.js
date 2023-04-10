import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// MODULE COMPONENTS
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAuth, userFirstRenderAuth } from '../../store';
import axios from 'axios';

// INITIAL SETUPS
axios.defaults.withCredentials = true;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto',
        width: '25%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const UserNavbar = (props) => {
    // REDUX
    const dispatch = useDispatch();
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const sendLogoutReq = async () => {
        const response = await axios.post("http://localhost:5000/user/logout", null, {
            withCredentials: true
        });
        if (response.status === 200) {
            return response;
        }
        return new Error("Unable to logout. Please try again")
    }

    const handleMenuClose = (e) => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMenuLogoutClose = (e) => {
        setAnchorEl(null);
        sendLogoutReq().then(() => dispatch(userLoginAuth.logout())).then(() => dispatch(userFirstRenderAuth.setTrue())).then(history("/"));
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const showLikedPizzas = () => {
        props.setLikesPage(!props.likesPage);
        props.setCartPage(false);
    }

    const showCart = () => {
        console.log("clicked");
        props.setLikesPage(false);
        props.setCartPage(!props.cartPage);
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={showLikedPizzas}>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    
                >
                    <Badge badgeContent={props.noOfLikes} color="error">
                        <FavoriteIcon />
                    </Badge>
                </IconButton>
                <p>Likes</p>
            </MenuItem>
            <MenuItem onClick={showCart}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    
                >
                    <Badge badgeContent={props.noOfCart} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={handleMenuLogoutClose}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    
                >
                    <LogoutIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    const closeCustomPizza = () => {
        if (props.pizza.id !== "") {
            props.setPizza(prev => ({
                ...prev,
                ["id"]: ""
            }))
        }
    }

    const [searchValue, setSearchValue] = React.useState(0);

    const search = ()=>{
        console.log(searchValue);
        props.setSer(searchValue);
    }

    return (
        <div style={props.pizza.id !== "" ? { flexGrow: 1, opacity: 0.3 } : { flexGrow: 1 }} onClick={closeCustomPizza} >
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <Typography><span className="pizza">Pizza</span><span className="hub">Hub</span></Typography>
                        </Typography>
                        <Search >
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Autocomplete
                                    sx={{width: '90%'}}
                                    freeSolo
                                    defaultValue={props.defaultValue}
                                    onSelect={(e)=>setSearchValue(e.target.value)}
                                    options={props.pizzas.map((pizza) => pizza.name)}
                                    renderInput={(params) => <TextField {...params} label="Search..." />}
                                />
                                <IconButton sx={{margin: '1%'}} onClick={search}>
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </Search>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, 'marginLeft': 'auto' }}>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                                onClick={showLikedPizzas}
                            >
                                <Badge badgeContent={props.likes.length} color="error">
                                    <FavoriteIcon sx={props.likesPage && { borderBottom: '3px solid white' }} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 23 new notifications"
                                color="inherit"
                                onClick={showCart}
                            >
                                <Badge badgeContent={props.cart.length} color="error">
                                    <ShoppingCartIcon sx={props.cartPage && { borderBottom: '3px solid white' }} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                color="inherit"
                                onClick={handleMenuLogoutClose}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box>
        </div>
    );
}

export default UserNavbar;