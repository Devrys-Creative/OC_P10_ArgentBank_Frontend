import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ThunkAction } from "redux-thunk";
import { userSlice } from "./userSlice";
import { authSlice } from "./authSlice";

interface loginFormInterface {
    email: string | null,
    password: string | null,
    rememberMe: boolean | null,
}

export const userLogInThunk = (payload:loginFormInterface):ThunkAction<void, RootState, unknown, UnknownAction> => {
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
            if(response.status===200) {
                return response.json();
            } else {
                return response.json().then((errorResponse) => {
                    // console.log("throw :", errorResponse);
                    throw new Error(errorResponse.message);
                });
            }
        })
        .then((data) => {
            dispatch(userSlice.actions.setUser({token: data.body.token}));
            dispatch(getUserProfileThunk(data.body.token));
            localStorage.setItem("token",data.body.token);
        })
        .catch((errorMessage) => {
            // console.log("catch + dispatch error",typeof(errorMessage));
            dispatch(authSlice.actions.setError(errorMessage.message));
        });
    };
};

export const getUserProfileThunk = (token:string):ThunkAction<void, RootState, unknown, UnknownAction> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (dispatch, getState) => {
        // console.log("get profile with token",token);
        fetch("http://localhost:3001/api/v1/user/profile",{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
        }).then((response) => {
            // console.log("status :",response.status);
            // console.log("statusText :",response.statusText);
            return response.status === 200 && response.json()
        })
        .then((data) => {
            // console.log(data);
            dispatch(userSlice.actions.setUser(data.body));
        })

    };
};

export const updateUserNameThunk = (newUserName:string):ThunkAction<void, RootState, unknown, UnknownAction> => {
    return async (dispatch, getState) => {
        console.log("change userName from ", getState().user.userName," to ", newUserName);
        //fetch
    }
}