import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ThunkAction } from "redux-thunk";
import { userSlice } from "./userSlice";
import { fetchStatusSlice } from "./fetchStatusSlice";

interface loginFormInterface {
    idFetchStatus: string,
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
            dispatch(getUserProfileThunk({idFetchStatus: payload.idFetchStatus,token:data.body.token,}));
            if(payload.rememberMe) { localStorage.setItem("token",data.body.token); }
        })
        .catch((errorMessage) => {
            // console.log("catch + dispatch error",typeof(errorMessage));
            dispatch(fetchStatusSlice.actions.setError({id:payload.idFetchStatus,errorMessage:errorMessage.message,}));
        });
    };
};

interface getProfileInterface {
    idFetchStatus: string,
    token: string,
}
export const getUserProfileThunk = ({idFetchStatus,token}:getProfileInterface):ThunkAction<void, RootState, unknown, UnknownAction> => {
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
            if(response.status === 200) {return response.json() }
            else {
                return response.json().then((errorResponse) => {
                throw new Error(errorResponse.message);
                });
            }
        })
        .then((data) => {
            // console.log(data);
            dispatch(userSlice.actions.setUser(data.body));
            dispatch(fetchStatusSlice.actions.setSuccess({id:idFetchStatus}));
        })
        .catch((errorMessage) => {
            dispatch(fetchStatusSlice.actions.setError({id:idFetchStatus, errorMessage:errorMessage.message}));
        });
    };
};

interface editProfileInterface {
    idFetchStatus: string,
    userName: string,
    token: string,
}

export const updateUserNameThunk = (payload:editProfileInterface):ThunkAction<void, RootState, unknown, UnknownAction> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (dispatch, getState) => {
        // loading start
        dispatch(fetchStatusSlice.actions.setLoading({id:payload.idFetchStatus}));
        // console.log("change userName from ", getState().user.userName," to ", newUserName);
        fetch('http://localhost:3001/api/v1/user/profile',{
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${payload.token}`,
            },
            body: JSON.stringify({userName:payload.userName}),
        })
        .then((response) => {
            if(response.status===200) {
                dispatch(userSlice.actions.setUser({userName: payload.userName}));
                // success
                dispatch(fetchStatusSlice.actions.setSuccess({id:payload.idFetchStatus}));
            } else {
                return response.json().then((errorResponse) => {
                    throw new Error(errorResponse.message);
                });
            }
        })
        .catch((errorMessage) => {
            // console.log("catch + dispatch error",errorMessage);
            // loading start
            dispatch(fetchStatusSlice.actions.setError({id:payload.idFetchStatus, errorMessage:errorMessage.message}));
        });
    }
}