import { baseurl, userurl } from "./backendurls";

// Signup Payload Handling
async function handleSignupPayload(signupPayload) {
    const res = await fetch(`${baseurl}/${userurl}/signup`, {
        method: "POST",
        body: JSON.stringify(signupPayload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
};

// UserActivation api request
async function handleUserActivation(activateToken) {
    const res = await fetch(`${baseurl}/${userurl}/useractivationlink?activate=${activateToken}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = res.json();
    return data;
}

// Login Payload handling
async function handleLoginPayload(loginPayload) {
    const res = await fetch(`${baseurl}/${userurl}/login`, {
        method: "POST",
        body: JSON.stringify(loginPayload),
        headers: {
            "Content-Type" : "application/json",
        }
    });
    const data = await res.json();
    return data
};

// Forgot Password Reset email handling
async function handleResetPassPayload(resetPasswordPayload) {
    const res = await fetch(`${baseurl}/${userurl}/forgotpassword`, {
        method: "PUT",
        body: JSON.stringify(resetPasswordPayload),
        headers: {
            "Content-Type" : "application/json",
        }
    });
    const data = await res.json();
    return data
};

// If User clicks reset link from their mail.
async function handleResetVerifyLink(passwordResetToken) {
    const res = await fetch(`${baseurl}/${userurl}/resetpassword/resetlinkverify?reset=${passwordResetToken}`, {
        method: "GET"
    })
    const data = res.json();
    return data;
};

// New Password Payload handling
async function handleNewPasswordPayload(newPasswordPayload, passwordResetToken) {
    const res = await fetch(`${baseurl}/${userurl}/resetpassword/newpassword?reset=${passwordResetToken}`, {
        method: "PUT",
        body: JSON.stringify(newPasswordPayload),
        headers: {
            "Content-Type" : "application/json",
        }
    });
    const data = await res.json();
    return data
};

// Checking is Admin Logged In
function isAdminLoggedIn() {
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.isAdmin) {
            return true;
        } else {
            return false;
        }
    }
};

// Checking is User Logged In
function isUserLoggedIn() {
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user.isAdmin) {
            return true;
        } else {
            return false;
        }
    }
};

// Getting Logged in Token to handle api requests
function getToken() {
    if (localStorage.getItem("token")) {
        const useToken = localStorage.getItem("token");
        return useToken;
    }
};

// Logout handling
function userLogout() {
    if (localStorage.getItem("token") ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.reload();
    };
};

export {
    handleSignupPayload,
    handleUserActivation,
    handleLoginPayload,
    handleResetPassPayload,
    handleResetVerifyLink,
    handleNewPasswordPayload,
    isAdminLoggedIn,
    isUserLoggedIn,
    getToken,
    userLogout
} 