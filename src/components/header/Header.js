import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import LOGO from '../../assets/images/logo-no-background.png';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    marginRight: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginRight: 0,
        width: 'auto',
    },
    [theme.breakpoints.up('md')]: {
        width: '60%',
        marginLeft: theme.spacing(20)
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
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 1),
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    margin: '0px 10px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Header() {
    const [searchText, setSearchText] = useState("")
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    function searchQueryHandler(event) {
        if (event.key === 'Enter') {
            if (searchText.trim() !== "") {
                setSearchText("")
                navigate(`/search/${searchText.trim()}`)
            }
        }
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img
                        src={LOGO}
                        alt="Movie-Lover"
                        className="logo"
                        onClick={() => navigate('/')}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                        <Search >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                onKeyUp={(e) => searchQueryHandler(e)}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Button sx={{ color: 'inherit' }}
                            onClick={() => { navigate(`/explore/movie`) }}
                            className='menuButton'>
                            MOVIES
                        </Button>
                        <Button sx={{ color: 'inherit' }}
                            onClick={() => { navigate(`/explore/tv`) }}
                            className='menuButton'>
                            TV SHOWS
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <Stack direction="column" spacing={2}>
                        <Button sx={{ color: 'inherit' }}
                            onClick={() => { navigate(`/explore/movie`) }}
                            className='menuButton'>
                            MOVIES
                        </Button>
                        <Button sx={{ color: 'inherit' }}
                            onClick={() => { navigate(`/explore/tv`) }}
                            className='menuButton'>
                            TV SHOWS
                        </Button>
                    </Stack>
                </MenuItem>
            </Menu>
        </AppBar>
    );
}
