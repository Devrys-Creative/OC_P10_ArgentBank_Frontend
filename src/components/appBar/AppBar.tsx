
// AppBar component is used to :
// - display the main logo
// - manage the main menu links
// - handle login if localStorage is configured for that

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser, isLoggedIn, userSlice } from "../../redux/userSlice";
import { getUserProfileThunk } from "../../redux/userThunks";
import { fetchStatusSlice, getFetchStatus } from "../../redux/fetchStatusSlice";
import "./appBar.scss";

export const AppBar = () => {

    // Redux hooks
    const dispatch = useAppDispatch();
    // Retrieve user info from the Redux store
    const isLogged = useAppSelector(isLoggedIn);
    const firstName = useAppSelector(getUser)?.firstName;
    // Retrieve the fetch status from the Redux store
    const fetchStatus = useAppSelector(getFetchStatus("relogIn"));

    // Check the value of isLogged
    useEffect(() => {
        // The user is not connected, but a token is stored, so automatically connect
        const token = localStorage.getItem('token');
        if(!isLogged && token !== null) {
            // Use a Redux state to retrieve the status of an asynchronous fetch response
            dispatch(fetchStatusSlice.actions.initStatus("relogIn"));
            // Use a Redux state to store the token in the user data
            dispatch(userSlice.actions.setUser({token: token}));
            // dispatch thunk to log in the user
            dispatch(getUserProfileThunk({
                idFetchStatus: "relogIn",
                token: token, 
            }));
        }
    },[isLogged])

    // Check the value of fetchStatus
    useEffect(() => {
        // Automatic connection ends with success or an error
        if(fetchStatus !== undefined && (fetchStatus?.error || fetchStatus?.success)) {
            if(fetchStatus?.error) {
                // If there is an error : clean localStorage and the Redux store
                localStorage.removeItem('token');
                dispatch(userSlice.actions.clearUser());
            }
            dispatch(fetchStatusSlice.actions.clearStatus("relogIn"));
        }
    }, [fetchStatus]);

    // handle the logout button event
    const handleDisconnect = () => {
        dispatch(userSlice.actions.clearUser());
        localStorage.removeItem("token");
    }

    return (
        <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
            <img
                className="main-nav-logo-image"
                src="/argentBankLogo.png"
                alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
        </Link>
        
        { !isLogged ? (
            <div>
                <Link className="main-nav-item" to="/sign-in">
                <i className="fa fa-user-circle"></i> Sign In
                </Link>
            </div>
        ) : (
            <div>
              <Link className="main-nav-item" to="/user-panel">
                <i className="fa fa-user-circle"></i> {firstName}
              </Link>
              <Link className="main-nav-item" to="/" onClick={handleDisconnect}>
                <i className="fa fa-sign-out"></i> Sign Out
              </Link>
            </div>
        )}
        </nav>
    );

};