import { useEffect } from "react";
import { getUser, userInterface } from "../../redux/userSlice";
import "./editUserName.scss";
import { updateUserNameThunk } from "../../redux/userThunks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Notification } from "../Notification/Notification";
import { fetchStatusSlice, getFetchStatus } from "../../redux/fetchStatusSlice";

interface EditUserNameInterface {
    toggleEditMode: React.Dispatch<void>,
};

export const EditUserName:React.FC<EditUserNameInterface> = ({toggleEditMode}) => {

    const user = useAppSelector(getUser);
    const fetchStatus = useAppSelector(getFetchStatus("editUserName"))

    const dispatch = useAppDispatch();

    useEffect(() => {
        // initialize fetch status state
        dispatch(fetchStatusSlice.actions.initStatus("editUserName"));
        return () => {
            // setNotification(null);
            dispatch(fetchStatusSlice.actions.clearStatus("editUserName"));
        };
    },[]);

    useEffect(() => {
        console.log(fetchStatus);
    },[fetchStatus]);

    const handleCancelButton = (event:React.MouseEvent) => {
        event.preventDefault();
        toggleEditMode();
    };

    const handleFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUserName = (document.getElementById("userName") as HTMLInputElement).value;
        if(user?.userName === newUserName) {
            dispatch(fetchStatusSlice.actions.setError({
                id: "editUserName",
                errorMessage: "You already have this username.",
            }));
        } else if (newUserName === "") {
            dispatch(fetchStatusSlice.actions.setError({
                id: "editUserName",
                errorMessage: "You should type a valid username before submit.",
            }));
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