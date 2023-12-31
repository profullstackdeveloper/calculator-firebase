import React, { useState } from 'react';
import { SidebarContainer } from './Sidebar.style';
import { Divider, Fab, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    bottom: '10px',
    right: '10px',
    width: 40,
    height: 40
})

export default function Sidebar() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [fold, setFold] = useState(false);
    const navigate = useNavigate();

    /// @name handleListItemClick
    /// @author Daniel Lee
    /// @desc This is the sidebar button handler.
    /// @param {number} index - Index of the selected TAB.
    /// @param {string} path - Path of the page to be navigated.
    const handleListItemClick = (
        index: number,
        path: string
    ) => {
        setSelectedIndex(index);
        navigate(path);
    }

    /// @name handleFold
    /// @author Daniel Lee
    /// @desc This is to fold state for sidebar.
    const handleFold = () => {
        setFold(!fold);
    }

    return (
        <SidebarContainer width={fold ? 60 : 300}>
            <List component={"nav"}>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={() => handleListItemClick(0, "/history")}
                >
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={"History"} ></ListItemText>
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={() => handleListItemClick(1, "/")}
                >
                    <ListItemIcon>
                        <CalculateIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Calculate"}></ListItemText>
                </ListItemButton>
                <Divider />
            </List>
            <StyledFab onClick={handleFold}>
                {
                    fold ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />
                }
            </StyledFab>
        </SidebarContainer>
    )
}