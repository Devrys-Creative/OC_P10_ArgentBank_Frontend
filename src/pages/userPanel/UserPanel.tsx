import { useEffect, useState } from "react";
import { Account } from "../../components/account/Account";

import "./userPanel.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser, isLoggedIn } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";
import { updateUserNameThunk } from "../../redux/userThunks";

interface userPanelInterface {
    pTitle:React.Dispatch<React.SetStateAction<string>>
}

export const UserPanel:React.FC<userPanelInterface> = ({pTitle}) => {

    const isLogged:boolean = useAppSelector(isLoggedIn);
    const user = useAppSelector(getUser);

    const [ editMode, setEditMode ] = useState(false);
    const toggleEditMode = ()=>setEditMode(!editMode);

    const dispatch = useAppDispatch();

    useEffect(() => {
        pTitle("Your Panel");
    },[]);

    const handleCancelButton = (event:React.MouseEvent) => {
        event.preventDefault();
        toggleEditMode();
    };

    const handleFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(updateUserNameThunk((document.getElementById("userName") as HTMLInputElement).value));
    }


    return isLogged ? (
            <main className="main bg-dark">
                <div className="header">
                    { editMode ? (
                        <>
                        <h1>Edit user info</h1>
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="userName">User name:</label> <input type="text" id="userName" defaultValue={user?.userName as string} />
                            <label htmlFor="firsName">First name:</label> <input type="text" id="firstName" defaultValue={user?.firstName as string} readOnly />
                            <label htmlFor="lastName">Last name:</label> <input type="text" id="lastName" defaultValue={user?.firstName as string} readOnly />
                            <button className="edit-button">Save</button> <button className="edit-button" onClick={handleCancelButton}>Cancel</button>
                        </form>
                        </>
                    ) : (
                        <>
                        <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
                        <button className="edit-button" onClick={toggleEditMode}>Edit Name</button>
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