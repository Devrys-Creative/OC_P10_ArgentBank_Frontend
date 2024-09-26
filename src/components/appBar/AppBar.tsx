
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser, isLoggedIn, userSlice } from "../../redux/userSlice";
import "./appBar.scss";
import { useEffect } from "react";
import { getUserProfileThunk } from "../../redux/userThunks";


export const AppBar = () => {

    const isLogged:boolean = useAppSelector(isLoggedIn);
    const firstName = useAppSelector(getUser)?.firstName;
    const dispatch = useAppDispatch();

    useEffect(() => {
        // User not connected but token stored => autoconnect
        const token = localStorage.getItem('token');
        if(!isLogged && token !== null) {
            dispatch(userSlice.actions.setUser({token: token}));
            dispatch(getUserProfileThunk(token));
        }
    },[isLogged])

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