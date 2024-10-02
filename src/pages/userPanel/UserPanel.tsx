import { useEffect, useState } from "react";
import { Account } from "../../components/account/Account";

import "./userPanel.scss";
import { getUser, isLoggedIn } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";
import { EditUserName } from "../../components/editUserName/EditUserName";
import { useAppSelector } from "../../redux/hooks";

interface userPanelInterface {
    pTitle:React.Dispatch<React.SetStateAction<string>>
}

export const UserPanel:React.FC<userPanelInterface> = ({pTitle}) => {

    // Retrieve user info from the Redux store
    const isLogged:boolean = useAppSelector(isLoggedIn);
    const user = useAppSelector(getUser);

    // editMode is a local state used to display or hide the form that allow the user to edit their username
    const [ editMode, setEditMode ] = useState(false);
    const toggleEditMode = ()=>setEditMode(!editMode);

    // set up prop allowing app component to manage the page title
    useEffect(() => {
        pTitle("Your Panel");
    },[]);

    return isLogged ? (
            <main className="main bg-dark">
                <div className="header">
                    { editMode ? (
                        <EditUserName toggleEditMode={toggleEditMode} />
                    ) : (
                        <>
                        <h2>Welcome back<br />{user?.firstName} {user?.lastName}!</h2>
                        <button className="button edit-button" onClick={toggleEditMode}>Edit Name</button>
                        </>
                    )}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <Account
                    title="Argent Bank Checking (x8349)"
                    amount="$2,082.79"
                    amountDescription="Available Balance"
                />
                <Account
                    title="Argent Bank Savings (x6712)"
                    amount="$10,928.42"
                    amountDescription="Available Balance"
                />
                <Account
                    title="Argent Bank Credit Card (x8349)"
                    amount="$184.30"
                    amountDescription="Current Balance"
                />
            </main>
    ) : (
        <Navigate to="/sign-in" />
    );
};