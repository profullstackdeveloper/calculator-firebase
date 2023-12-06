import React, { useState } from 'react';
import { SidebarContainer } from './Sidebar.style';
import { Divider, Fab, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import CalculateIcon from '@mui/icons-material/Calculate';
import AddIcon from '@mui/icons-material/Add';
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
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        path: string
    ) => {
        setSelectedIndex(index);
        navigate(path);
    }

    const handleFold = () => {
        setFold(!fold);
    }

    return (
        <SidebarContainer width={fold ? 60 : 300}>
            <List component={"nav"}>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(e) => handleListItemClick(e, 0, "/history")}
                >
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={"History"} ></ListItemText>
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(e) => handleListItemClick(e, 1, "/")}
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