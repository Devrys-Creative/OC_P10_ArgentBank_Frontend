import { useEffect } from "react";

import "./signIn.scss";
// import { userSlice } from "../../redux/userSlice";
import { Navigate } from "react-router-dom";
import { userLogInThunk } from "../../redux/userThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isLoggedIn } from "../../redux/userSlice";
import { Notification } from "../../components/Notification/Notification";
import { fetchStatusSlice, getFetchStatus } from "../../redux/fetchStatusSlice";

interface signInInterface {
    pTitle:React.Dispatch<React.SetStateAction<string>>,
}

export const SignIn:React.FC<signInInterface> = ({pTitle}) => {

    const dispatch = useAppDispatch();
    const loggedIn:boolean = useAppSelector(isLoggedIn);
    const status = useAppSelector(getFetchStatus("logIn"));

    // first render
    useEffect(() => {
        // Setting up window title
        pTitle("Sign In");
        dispatch(fetchStatusSlice.actions.initStatus("logIn"));
        return () => { dispatch(fetchStatusSlice.actions.clearStatus("logIn")); };
    },[]);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // checking form
        if(event.currentTarget.reportValidity()) {
            const payload = {
                idFetchStatus: "logIn",
                email: (document.getElementById('username') as HTMLInputElement)?.value,
                password: (document.getElementById('password') as HTMLInputElement)?.value,
                rememberMe: (document.getElementById('remember-me') as HTMLInputElement)?.checked,
            }
            // console.log(payload);
            dispatch(userLogInThunk(payload));
        }
    };

    return !loggedIn ? (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                
                <form onSubmit={handleFormSubmit}>
                    { status?.error && <Notification message={status.errorMessage} type="error" /> }
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label><input type="email" id="username" name="username" required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label><input type="password" id="password" name="password" minLength={8} maxLength={12} required/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" name="remember-me" /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="button sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    ) : (
        <Navigate to="/user-panel" />
    );
};