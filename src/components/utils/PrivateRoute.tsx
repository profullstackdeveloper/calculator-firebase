import { useEffect, ReactNode, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

export default function PrivateRoute({children}: {children: ReactNode}) {
    const navigate = useNavigate()
    useEffect(() => {
        if(!auth.currentUser) {
            navigate("/login")
        }
    }, [])
    return (
        <Fragment>
            {
                children
            }
        </Fragment>
    )
}