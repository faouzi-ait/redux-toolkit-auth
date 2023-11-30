import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, setLogout } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
    mode: "cors",
    credentials: 'include',
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;

        if(token) {
            headers.set('Authorization', `Bearer ${token.token}`)
        }
        return headers
    }
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if(result?.error?.originalStatus === 403 || result?.error?.originalStatus === 401) {
        console.log('Sending refresh token');
        const getRefreshToken = await baseQuery('/refresh-token', api, extraOptions);

        if(getRefreshToken?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...getRefreshToken.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(setLogout());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({}),
});