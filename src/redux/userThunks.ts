import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ThunkAction } from "redux-thunk";
import { userSlice } from "./userSlice";

interface loginInterface {
    email: string | null,
    password: string | null,
}

export const userLogInThunk = (payload:loginInterface):ThunkAction<void, RootState, unknown, UnknownAction> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (dispatch, getState) => {
        fetch('http://localhost:3001/api/v1/user/login',{
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        .then((response) => {
            return response.status===200 && response.json();
        })
        .then((data) => {
            console.log(data);
            dispatch(userSlice.actions.setUser({token: data.body.token}));
            dispatch(getUserProfileThunk(data.body.token));
        })
    };
};

export const getUserProfileThunk = (token:string):ThunkAction<void, RootState, unknown, UnknownAction> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (dispatch, getState) => {
        console.log("token",token);
        fetch("http://localhost:3001/api/v1/user/profile",{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
        }).then((response) => {
            console.log("status :",response.status);
            console.log("statusText :",response.statusText);
            return response.status === 200 && response.json()
        })
        .then((data) => {
            console.log(data);
            dispatch(userSlice.actions.setUser(data.body));
        })

    };
};