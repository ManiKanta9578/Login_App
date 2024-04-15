import { authenticate } from "./helper";
import Toast from "react-native-toast-message";

/** Username validate */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    if (values.username) {
        //check if user exits or not
        const { status } = await authenticate(values.username);

        if (status !== 200) {
            errors.exist = Toast.show({ type: 'error', text1: 'Error', text2: 'User does not exist...!' })
        }
    }
    return errors;
}

/** Password validate */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

/** Recovery validate */
export async function recoveryValidate(values) {
    const errors = recoveryVerify({}, values);
    return errors;
}

/** Reset password validate */
export async function resetPasswordValidate(values) {
    const errors = passwordVerify({}, values);

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = Toast.show({ type: 'error', text1: 'Error', text2: 'Passwords do not match.' });
    }

    return errors;
}

export async function registerValidate(values) {
    let errors = {};

    // Validate username
    usernameVerify(errors, values);

    // Validate password
    const passwordErrors = await passwordValidate(values);
    errors = { ...errors, ...passwordErrors };

    // Validate email
    emailVerify(errors, values);

    return errors;
}

/** Validate profile form */
export async function profileValidate(values) {
    let errors = {};
    emailVerify(errors, values);

    return errors;
}


/**---------------------------------------------------------------------------------------------- */

/** Username verify */
const usernameVerify = (error = {}, values) => {
    if (!values.username) {
        error.username = Toast.show({ type: 'error', text1: 'Error', text2: 'Username Required..!' });
    } else if (values.username.includes(" ")) {
        error.username = Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid Username...!' });
    }

    return error;
}

/** Password verify */
const passwordVerify = (error = {}, values) => {
    let passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?])(?=.*[0-9])(?=.*[A-Z]).{6,}$/;

    if (!values.password) {
        error.password = Toast.show({ type: 'error', text1: 'Error', text2: 'Password is required.' })
    } else if (values.password.includes(" ")) {
        error.password = Toast.show({ type: 'error', text1: 'Error', text2: 'Password should not contain spaces.' })
    } else if (values.password.length < 6) {
        error.password = Toast.show({ type: 'error', text1: 'Error', text2: 'Password must be at least 6 characters long.' })
    } else if (!passwordRegex.test(values.password)) {
        error.password = Toast.show({ type: 'error', text1: 'Error', text2: 'Password must contain at least one special character, one number, and one uppercase letter.' })
    }

    return error;
}

/** Email Verify */
const emailVerify = (error = {}, values) => {
    let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.email) {
        error.email = Toast.show({ type: 'error', text1: 'Error', text2: 'Email Required..!' });
    } else if (values.email.includes(" ")) {
        error.email = Toast.show({ type: 'error', text1: 'Error', text2: 'Wrong Email..!' });
    } else if (!emailRegEx.test(values.email)) {
        error.email = Toast.show({ type: 'error', text1: 'Error', text2: 'Invalid Email..!' });
    }
}

/** Recovery verify */
const recoveryVerify = (error = {}, values) => {
    if (!values.recover) {
        error.recover = Toast.show({ type: 'error', text1: 'Error', text2: 'OTP is required.' });
    } else if (values.recover.length !== 6) {
        error.recover = Toast.show({ type: 'error', text1: 'Error', text2: 'OTP must be 6 digits long.' });
    }

    // Return null if no errors
    return Object.keys(error).length === 0 ? null : error;
}

