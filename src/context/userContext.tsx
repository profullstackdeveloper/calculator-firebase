import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

type UserContextProps = {
    firstName: string,
    lastName: string,
    setFirstName: Dispatch<SetStateAction<string>>,
    setLastName: Dispatch<SetStateAction<string>>
}

export const UserContext = createContext({} as UserContextProps);

export default function UserContextProvider({ children }: { children: ReactNode }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user?.displayName) {
                console.log('displayName is dtected: ')
                setFirstName(user.displayName?.split(' ')[0]);
                setLastName(user.displayName.split(' ')[1]);
            } else {
                console.info("No user detected");
            }
        });
    }, []);

    return (
        <UserContext.Provider
            value={{
                firstName,
                lastName,
                setFirstName,
                setLastName
            }}
        >
            {
                children
            }
        </UserContext.Provider>
    )
}