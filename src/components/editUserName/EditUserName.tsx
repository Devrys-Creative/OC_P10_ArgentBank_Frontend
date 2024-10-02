// editUserName component is used to :
// - display or hide the username editing form
// - manage the API call to update the username

import "./editUserName.scss";
import { Notification } from "../Notification/Notification";
import { useEffect } from "react";
import { getUser, userInterface } from "../../redux/userSlice";
import { updateUserNameThunk } from "../../redux/userThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStatusSlice, getFetchStatus } from "../../redux/fetchStatusSlice";

interface EditUserNameInterface {
    toggleEditMode: React.Dispatch<void>,
};

export const EditUserName:React.FC<EditUserNameInterface> = ({toggleEditMode}) => {

    // Redux hooks
    const dispatch = useAppDispatch();
    // Retrieve user info from the Redux store
    const user = useAppSelector(getUser);
    // Retrieve the fetch status from the Redux store
    const fetchStatus = useAppSelector(getFetchStatus("editUserName"))

    // first render
    // Use a Redux state to retrieve the status of an asynchronous fetch response
    useEffect(() => {
        dispatch(fetchStatusSlice.actions.initStatus("editUserName"));
        return () => {
            dispatch(fetchStatusSlice.actions.clearStatus("editUserName"));
        };
    },[]);

    // handle the cancel button event
    const handleCancelButton = (event:React.MouseEvent) => {
        event.preventDefault();
        toggleEditMode();
    };

    // handle the form submission
    const handleFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUserName = (document.getElementById("userName") as HTMLInputElement).value;
        // the username must be different from the current one
        if(user?.userName === newUserName) {
            dispatch(fetchStatusSlice.actions.setError({
                id: "editUserName",
                errorMessage: "You already have this username.",
            }));
        // the username must be a non-null string
        } else if (newUserName === "") {
            dispatch(fetchStatusSlice.actions.setError({
                id: "editUserName",
                errorMessage: "You should type a valid username before submit.",
            }));
        // if the username is acceptable : dispatch a thunk to update the user
        } else {
            dispatch(updateUserNameThunk({
                    idFetchStatus: "editUserName",
                    userName: newUserName,
                    token: (user as userInterface).token as string,
                }
            ));
        }
    }

    return (
        <>
        <h2>Edit user info</h2>
        { fetchStatus !== undefined && fetchStatus.error && <Notification type="error" message={fetchStatus.errorMessage} />}
        { fetchStatus !== undefined && fetchStatus.success && <Notification type="success" message="Username successfully updated." />}
        <form className='edit-profile' onSubmit={handleFormSubmit}>
            <label htmlFor="userName">User name:</label> <input type="text" id="userName" defaultValue={user?.userName as string} minLength={4} maxLength={12}/>
            <label htmlFor="firsName">First name:</label> <input type="text" id="firstName" defaultValue={user?.firstName as string} disabled />
            <label htmlFor="lastName">Last name:</label> <input type="text" id="lastName" defaultValue={user?.lastName as string} disabled />
            <div className="edit-profile__buttons"><button className="button edit-button">Save</button> <button className="button edit-button" onClick={handleCancelButton}>Cancel</button></div>
        </form>
        </>
    );
};