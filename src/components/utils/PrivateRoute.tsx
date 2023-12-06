import React, { useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

export default function PrivateRoute({children}: {children: React.ReactNode}) {
    const navigate = useNavigate()
    useEffect(() => {
        if(!auth.currentUser) {
            navigate("/login")
        }
    }, [])
    return (
        <React.Fragment>
            {
                children
            }
        </React.Fragment>
    )
}