// pure fun take req for check cookie
export const ProtectRoutes = (req) => {
  // check if user is authenticated
  let isUser;
  console.log(req.cookies);
  if (req.cookies.c_user) {
    isUser = true;
  }
  return isUser;
};
