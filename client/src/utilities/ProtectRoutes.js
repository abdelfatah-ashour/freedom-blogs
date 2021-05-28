// pure fun take req for check cookie
export const ProtectRoutes = req => {
    // check if user is authenticated
    let isUser;
    if (req.cookies.auth_user) {
        isUser = true;
    }
    return isUser;
};
