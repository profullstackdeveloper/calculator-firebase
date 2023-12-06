import React from 'react';
import { MasterBodyContainer, MasterHeaderContainer, MasterLayoutContainer } from './MasterLayout.style';
import Header from '../header/Header.component';
import Sidebar from '../sidebar/Sidebar.component';
import { Stack } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

export default function MasterLayout({ children }: { children: React.ReactNode }) {

    const params = useLocation();
    console.log('params: ', params.pathname);

    return (
        <MasterLayoutContainer>
            <MasterHeaderContainer>
                <Header></Header>
            </MasterHeaderContainer>

            <MasterBodyContainer>
                {
                    params.pathname !== "/login" && <Sidebar></Sidebar>
                }

                <div className='w-full flex-grow flex-shrink overflow-auto'>
                    {children}
                </div>
            </MasterBodyContainer>
        </MasterLayoutContainer>
    )
}