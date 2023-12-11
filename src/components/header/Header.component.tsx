import React, { useContext } from 'react';
import { HeaderContainer } from './Header.style';
import { Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';

export default function Header() {

    const [anchorE1, setAnchorE1] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorE1);
    const navigate = useNavigate();
    const params = useLocation();

    const { firstName, lastName, setFirstName, setLastName } = useContext(UserContext);

    /// @name handleClick
    /// @author Daniel Lee
    /// @desc This function will be called when user click Avatar Icon. Then it will shows the menu.
    /// @param {React.MouseEvent<HTMLButtonElement>} event - Button click event.
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (params.pathname !== "/login") {
            setAnchorE1(event.currentTarget);
        }
    }

    /// @name handleClose
    /// @author Daniel Lee
    /// @desc This function is for closing the menu.
    const handleClose = async () => {
        setAnchorE1(null);
    }

    /// @name handleSignout
    /// @author Daniel Lee
    /// @desc This function will be called when user click Log out button in the menu. This will sign out the user and redirect him/she to the login page.
    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate('/login')
            setAnchorE1(null);
            setFirstName('');
            setLastName('');

        } catch (err: any) {
            console.error(err);
            setAnchorE1(null);
        }
    }

    return (
        <HeaderContainer>
            <Typography fontFamily={'inherit'} fontSize={'2rem'}>Currency Converter</Typography>
            <div>
                {
                    firstName + ' ' + lastName
                }
                <Button onClick={handleClick}>
                    <Avatar></Avatar>
                </Button>
            </div>
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