import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../env';

axios.defaults.baseURL = API_URL;

/**Make API Request */

/** To get username from this token */
export const getUsername = async () => {
    try {
        let token = await AsyncStorage.getItem('token');
        if (!token) return Promise.reject('Cannot find token.');
        let decode = jwtDecode(token);
        return decode;
    } catch (error) {
        return Promise.reject(error);
    }
}

/** Authentication */
export const authenticate = async (username) => {
    try {
        return await axios.post('/api/authenticate', { username });
    } catch (error) {
        return { error: "Username doesn't exist...!" };
    }
};

/** Get user details */
export const getUser = async ({ username }) => {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't match..!" };
    }
}

/** Register user */
export const registerUser = async (credentials) => {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
        }

        return Promise.resolve(msg);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            const errorMessage = error.response.data.error;
            return Promise.reject(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject("No response received from server");
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject("An error occurred while sending the request");
        }
    }
}

/** Login */
export const verifyPassword = async ({ username, password }) => {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password });
            await AsyncStorage.setItem('token', data.token);
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't match..!" });
    }
}

/** Update user */
export const updateUser = async (response) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const { data } = await axios.put('/api/updateUser', response, { headers: { "Authorization": `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Couldn't update profile..!" });
    }
}

/** Generate OTP */
export const generateOTP = async (username) => {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });

        // Send mail with the OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" });
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** Verify OTP */
export const verifyOTP = async ({ username, code }) => {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } });
        return { data, status };
    } catch (error) {
        return Promise.reject(error);
    }
}

/** Reset Password */
export const resetPassword = async ({ username, password }) => {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error });
    }
}
