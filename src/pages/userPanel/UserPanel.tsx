import { useEffect } from "react";
import { Account } from "../../components/account/Account";

import "./userPanel.scss";
import { useAppSelector } from "../../redux/hooks";
import { getUser, isLoggedIn } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { isLoggedIn } from "../../redux/selectors";

interface userPanelInterface {
    pTitle:React.Dispatch<React.SetStateAction<string>>
}

export const UserPanel:React.FC<userPanelInterface> = ({pTitle}) => {

    const isLogged:boolean = useAppSelector(isLoggedIn);
    const user = useAppSelector(getUser);

    useEffect(() => {
        pTitle("Your Panel");
    },[]);


    return isLogged ? (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
                    <button className="edit-button">Edit Name</button>
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