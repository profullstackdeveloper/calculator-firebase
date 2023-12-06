import styled from 'styled-components';

interface SidebarContainerProps {
    width: number;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
    width: ${props => props.width}px;
    overflow: hidden;
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #bfbfbf;
    position: relative;
    transition: width ease-in 0.5s;
`