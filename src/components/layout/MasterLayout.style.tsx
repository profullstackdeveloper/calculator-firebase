import styled from 'styled-components';

export const MasterLayoutContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

export const MasterHeaderContainer = styled.div`
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
`

export const MasterBodyContainer = styled.div`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`