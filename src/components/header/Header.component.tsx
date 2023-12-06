import React from 'react';
import { HeaderContainer } from './Header.style';
import { Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {

    const [anchorE1, setAnchorE1] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorE1);
    const navigate = useNavigate();
    const params = useLocation();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(params.pathname !== "/login") {
            setAnchorE1(event.currentTarget);
        }
    }

    const handleClose = async () => {
        setAnchorE1(null);
    }

    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate('/login')
            setAnchorE1(null);
        } catch (err: any) {
            console.error(err);
            setAnchorE1(null);
        }
    }

    return (
        <HeaderContainer>
            <Typography fontFamily={'inherit'} fontSize={'2rem'}>Currency Converter</Typography>
            <Button onClick={handleClick}>
                <Avatar></Avatar>
            </Button>
            {
                params.pathname !== "/login" && <Menu
                    anchorEl={anchorE1}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleSignout}>
                        <ListItemIcon>
                            <LogoutIcon></LogoutIcon>
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            }

        </HeaderContainer>
    )
}