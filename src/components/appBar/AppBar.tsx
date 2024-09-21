
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser, isLoggedIn, userSlice } from "../../redux/userSlice";
import "./appBar.scss";


export const AppBar = () => {

    // const dispatch = useDispatch();
    // const token = useSelector(getToken);

    // useEffect(() => {
    //     dispatch(userSlice.actions)
    // },[token]);

    // useEffect(() => {
    //     if(sessionStorage)
    //     const profile = await fetch("http://localhost:3001/api/v1/user/profile",{
    //             headers: {
    //                 Authorization: `bearer ${token}`,
    //             }
    //         })
    //         .then(response => response.status === 200 && response?.json())
    //         .then(data => data?.body);
    // },[]);

    const isLogged:boolean = useAppSelector(isLoggedIn);
    const firstName = useAppSelector(getUser)?.firstName;
    const dispatch = useAppDispatch();

    console.log(isLogged);

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
              <Link className="main-nav-item" to="/" onClick={() => dispatch(userSlice.actions.clearUser())}>
                <i className="fa fa-sign-out"></i> Sign Out
              </Link>
            </div>
        )}
        </nav>
    );

};